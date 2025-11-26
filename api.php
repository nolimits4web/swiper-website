<?php
/**
 * LLM Visibility Checker - Full PHP API (Clean Rewrite)
 * - Accepts POST (JSON or x-www-form-urlencoded payload=JSON)
 * - Saves leads to leads.json
 * - Pushes to Google Sheets via Apps Script (/exec)
 * - Queries LLMs (OpenAI, Anthropic/Claude, Perplexity, Gemini) when keys are present
 * - Uses strict, low-hallucination prompts
 * - Returns structured results for frontend; never blocks UX
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// CORS + JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  echo json_encode(['ok' => true]);
  exit;
}

/**
 * Load .env from this folder
 */
function lw_env($filePath = __DIR__ . '/.env')
{
  if (!file_exists($filePath)) return;
  foreach (file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
    if (strpos($line, '=') === false || strpos($line, '#') === 0) continue;
    list($k, $v) = explode('=', $line, 2);
    $k = trim($k);
    $v = trim($v);
    if (
      (strlen($v) >= 2 && $v[0] === '"' && substr($v, -1) === '"') ||
      (strlen($v) >= 2 && $v[0] === "'" && substr($v, -1) === "'")
    ) {
      $v = substr($v, 1, -1);
    }
    putenv("$k=$v");
    $_ENV[$k] = $v;
  }
}
lw_env();

// Sheets config
$GS_ENDPOINT = getenv('GS_ENDPOINT') ?: '';
$GS_SECRET   = getenv('GS_SECRET')   ?: '';

// API keys (optional)
$API_KEYS = [
  'openai'     => getenv('OPENAI_API_KEY')     ?: '',
  'anthropic'  => getenv('ANTHROPIC_API_KEY')  ?: '',
  'google'     => getenv('GOOGLE_API_KEY')     ?: '',
  'perplexity' => getenv('PERPLEXITY_API_KEY') ?: '',
];

// ---- Endpoint resolve ----
$endpoint = $_GET['endpoint'] ?? null;
if (!$endpoint) {
  $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
  $path = str_replace('/llm-visibility-checker', '', $path);
  if (preg_match('#/api/([a-z-]+)$#i', $path, $m)) {
    $endpoint = strtolower($m[1]);
  }
}

if (!in_array($endpoint, ['analyze', 'analyze-historical'], true)) {
  http_response_code(404);
  echo json_encode(['success' => false, 'error' => 'Endpoint not found']);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'error' => 'Method not allowed (POST only)']);
  exit;
}

// --- Input (JSON or x-www-form-urlencoded payload) ---
$raw = isset($_POST['payload']) ? $_POST['payload'] : file_get_contents('php://input');
$in  = json_decode($raw, true);
if (!is_array($in)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'Invalid JSON payload']);
  exit;
}

foreach (['fullName', 'email', 'website', 'keywords'] as $f) {
  if (empty($in[$f])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => "Missing required field: $f"]);
    exit;
  }
}

// Normalize fields
$keywords = is_array($in['keywords'])
  ? array_values(array_filter(array_map('trim', $in['keywords'])))
  : array_values(array_filter(array_map('trim', explode(',', (string)$in['keywords']))));

$competitors = [];
if (isset($in['competitors'])) {
  $competitors = is_array($in['competitors'])
    ? array_values(array_filter(array_map('trim', $in['competitors'])))
    : array_values(array_filter(array_map('trim', explode(',', (string)$in['competitors']))));
}

// Lead record
$mode = ($endpoint === 'analyze-historical') ? 'historical' : 'instant';

// Default lookback: 5 days for instant; user-controlled (1–30) for historical
$lookbackDays = 5;
if ($mode === 'historical') {
  $lookbackDays = max(1, min(30, (int)($in['days'] ?? 7)));
}

$lead = [
  'fullName'     => $in['fullName'],
  'email'        => $in['email'],
  'company'      => $in['company'] ?? '',
  'phone'        => $in['phone'] ?? '',
  'website'      => $in['website'],
  'competitors'  => $competitors,
  'keywords'     => $keywords,
  'timestamp'    => date('c'),
  'id'           => time(),
  'mode'         => $mode,
  'lookbackDays' => $lookbackDays
];

// Persist + Sheets
lw_save_lead($lead);
$gsMeta = lw_push_to_sheets($GS_ENDPOINT, $GS_SECRET, $lead);

// ----- REAL ANALYSIS (best-effort) -----
$analyzer = new LLMAnalyzer($API_KEYS);

try {
  if ($mode === 'historical') {
    $results = $analyzer->analyzeVisibilityHistorical(
      [
        'website'     => $lead['website'],
        'company'     => $lead['company'],
        'competitors' => $competitors,
        'keywords'    => $keywords
      ],
      $lookbackDays
    );
  } else {
    $results = $analyzer->analyzeVisibility(
      [
        'website'     => $lead['website'],
        'company'     => $lead['company'],
        'competitors' => $competitors,
        'keywords'    => $keywords
      ],
      $lookbackDays
    );
  }
} catch (Throwable $e) {
  error_log('[LLMAnalyzer] fatal: ' . $e->getMessage());
  $results = [
    'timestamp'       => date('c'),
    'website'         => $lead['website'],
    'competitors'     => $competitors,
    'keywords'        => $keywords,
    'platformResults' => [],
    'summary'         => [
      'overallScore'      => 0,
      'totalMentions'     => 0,
      'platformsAnalyzed' => 0,
      'visibility'        => 'Weak',
      'error'             => 'Analysis failed'
    ]
  ];
}

// Attach user for convenience
$results['user'] = [
  'name'    => $lead['fullName'],
  'email'   => $lead['email'],
  'company' => $lead['company'],
  'website' => $lead['website']
];

echo json_encode(['success' => true, 'results' => $results, 'gsMeta' => $gsMeta]);
exit;

/* ===========================
   Helpers
   =========================== */

function lw_save_lead(array $lead): void
{
  $file = __DIR__ . '/leads.json';
  $arr  = file_exists($file)
    ? (json_decode(@file_get_contents($file), true) ?: [])
    : [];
  $arr[] = $lead;
  file_put_contents($file, json_encode($arr, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), LOCK_EX);
}

function lw_push_to_sheets(string $endpoint, string $secret, array $lead): array
{
  if (!$endpoint || stripos($endpoint, '/exec') === false) {
    return ['ok' => false, 'reason' => 'GS_ENDPOINT must be the Web App /exec URL'];
  }
  $payload = json_encode(['secret' => $secret, 'payload' => $lead]);

  $ch = curl_init($endpoint);
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json', 'Accept: application/json'],
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_TIMEOUT        => 25,
  ]);
  $body  = curl_exec($ch);
  $code  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $ctype = (string)curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
  $err   = curl_error($ch);
  curl_close($ch);

  if ($err) {
    error_log('[GS] cURL error: ' . $err);
    return ['ok' => false, 'status' => $code, 'error' => $err];
  }

  $isJson = stripos($ctype, 'application/json') !== false;
  $parsed = $isJson ? (json_decode($body, true) ?: null) : null;
  $ok     = ($code >= 200 && $code < 300) && $parsed && !empty($parsed['ok']);
  if (!$ok) {
    error_log('[GS] non-ok: code=' . $code . ' ctype=' . $ctype . ' body=' . substr($body, 0, 200));
  }

  return [
    'ok'          => $ok,
    'status'      => $code,
    'contentType' => $ctype,
    'bodySample'  => substr($body, 0, 200),
    'parsed'      => $parsed
  ];
}

/* ===========================
   LLM Analyzer
   =========================== */

class LLMAnalyzer
{
    private array $keys;

    public function __construct(array $keys)
    {
        $this->keys = $keys;
    }

    /**
     * Main analysis: calls each enabled platform with the same
     * website / competitors / keywords and a daysLookback hint.
     */
    public function analyzeVisibility(array $data, int $daysLookback = 5): array
    {
        $platforms = [];
        if (!empty($this->keys['openai']))     $platforms[] = 'chatgpt';
        if (!empty($this->keys['google']))     $platforms[] = 'gemini';
        if (!empty($this->keys['perplexity'])) $platforms[] = 'perplexity';
        if (!empty($this->keys['anthropic']))  $platforms[] = 'claude';

        $out = [
            'timestamp'       => date('c'),
            'website'         => $data['website'],
            'competitors'     => $data['competitors'],
            'keywords'        => $data['keywords'],
            'platformResults' => [],
            'summary'         => []
        ];

        foreach ($platforms as $p) {
            try {
                $method = 'q_' . $p;
                $out['platformResults'][$p] = $this->$method(
                    $data['website'],
                    $data['company'] ?? '',
                    $data['competitors'],
                    $data['keywords'],
                    $daysLookback
                );
            } catch (Throwable $e) {
                error_log("[$p] " . $e->getMessage());
                $out['platformResults'][$p] = [
                    'platform'       => ucfirst($p),
                    'error'          => $e->getMessage(),
                    'mentions'       => 0,
                    'ranking'        => null,
                    'score'          => 0,
                    'keywordResults' => []
                ];
            }
            // light pacing between platforms
            usleep(600000);
        }

        $out['summary'] = $this->summarize($out['platformResults'], $data['website'], $data['competitors']);
        return $out;
    }

    /**
     * Historical wrapper: same logic, but we tag the mode/days in summary
     */
    public function analyzeVisibilityHistorical(array $data, int $days = 7): array
    {
        $res = $this->analyzeVisibility($data, $days);
        $res['summary']['mode'] = 'historical';
        $res['summary']['days'] = $days;
        return $res;
    }

    /* -------- shared OpenAI / Perplexity helper -------- */
    private function query_llm_list_style(
        string $platformName,
        string $url,
        string $authHeader,
        array $basePayload,
        string $website,
        string $company,
        array $competitors,
        array $keywords,
        callable $promptBuilder,
        int $daysLookback
    ): array {
        $results = [
            'platform'       => $platformName,
            'mentions'       => 0,
            'ranking'        => null,
            'score'          => 0,
            'keywordResults' => []
        ];

        foreach ($keywords as $kw) {
            $prompt = $promptBuilder($kw, $daysLookback);

            $payload = $basePayload;
            $payload['messages'] = [
                [
                    'role'    => 'user',
                    'content' => $prompt
                ]
            ];

            $resp = $this->curl_json($url, [
                'Content-Type: application/json',
                $authHeader
            ], $payload);

            $text = '';
            if ($platformName === 'OpenAI' || $platformName === 'Perplexity') {
                $text = $resp['json']['choices'][0]['message']['content'] ?? '';
            }

            $analysis = $this->analyzeListText($text, $website, $company, $competitors);
            $results['keywordResults'][$kw] = $analysis;

            if (!empty($analysis['mentioned'])) {
                $results['mentions']++;
                $pos = (int)($analysis['position'] ?? 0);
                if ($pos > 0 && (!$results['ranking'] || $pos < $results['ranking'])) {
                    $results['ranking'] = $pos;
                }
            }

            usleep(300000);
        }

        $results['score'] = $this->platformScore($results, count($keywords));
        return $results;
    }

    /* -------- platform callers (balanced, non-hallucinatory prompts) -------- */

    private function q_chatgpt(string $website, string $company, array $competitors, array $keywords, int $daysLookback): array
    {
        $url   = 'https://api.openai.com/v1/chat/completions';
        $model = 'gpt-4o-mini';

        $targetDomain = $this->domain($website);
        $compDomains  = array_filter(array_map([$this,'domain'], $competitors));
        $compList     = $compDomains ? implode(', ', $compDomains) : '(none provided)';

        $basePayload = [
            'model'      => $model,
            'max_tokens' => 600,
            'temperature'=> 0.0
        ];

        $promptBuilder = function(string $kw, int $days) use ($targetDomain, $compList) {
            return "
You must act as a factual lookup system.

Return companies that are *widely recognized* as associated with the keyword below.
Use reliable knowledge and recent information from roughly the last {$days} days where possible.

Accuracy Rules:
- DO NOT invent companies or domains.
- Only include companies strongly or clearly tied to this keyword.
- Well-known brands and major organizations ARE allowed.
- If unsure about obscure companies → exclude them.
- It is acceptable to return 0–10 entries.
- NO commentary. NO explanations.

Keyword: '{$kw}'
User domain: {$targetDomain}
Competitors: {$compList}

Return ONLY this exact format:
1. Company Name — domain.com
2. Company Name — domain.com
";
        };

        return $this->query_llm_list_style(
            'OpenAI',
            $url,
            "Authorization: Bearer " . $this->keys['openai'],
            $basePayload,
            $website,
            $company,
            $competitors,
            $keywords,
            $promptBuilder,
            $daysLookback
        );
    }

    private function q_perplexity(string $website, string $company, array $competitors, array $keywords, int $daysLookback): array
    {
        $url   = 'https://api.perplexity.ai/chat/completions';
        $model = 'sonar';

        $targetDomain = $this->domain($website);
        $compDomains  = array_filter(array_map([$this,'domain'], $competitors));
        $compList     = $compDomains ? implode(', ', $compDomains) : '(none provided)';

        $basePayload = [
            'model'      => $model,
            'max_tokens' => 600,
            'temperature'=> 0.0
        ];

        $promptBuilder = function(string $kw, int $days) use ($targetDomain, $compList) {
            return "
Act as a factual reference system.

Return companies that reputable sources consistently associate with this keyword.
Prefer information from approximately the last {$days} days when available.

Rules:
- Do NOT invent or guess companies/domains.
- Use well-known, widely-recognized entities only.
- If uncertain → exclude the item.
- Acceptable to return fewer than 10 results.
- Include the user domain or competitors ONLY if clearly associated.
- Output MUST be only the list. No commentary.

Keyword: '{$kw}'
User domain: {$targetDomain}
Competitors: {$compList}

Return format ONLY:
1. Company — domain.com
2. Company — domain.com
";
        };

        return $this->query_llm_list_style(
            'Perplexity',
            $url,
            "Authorization: Bearer " . $this->keys['perplexity'],
            $basePayload,
            $website,
            $company,
            $competitors,
            $keywords,
            $promptBuilder,
            $daysLookback
        );
    }

    private function q_gemini(string $website, string $company, array $competitors, array $keywords, int $daysLookback): array
    {
        $base = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=';
        $url  = $base . $this->keys['google'];

        $results = [
            'platform'       => 'Gemini',
            'mentions'       => 0,
            'ranking'        => null,
            'score'          => 0,
            'keywordResults' => []
        ];

        $targetDomain = $this->domain($website);
        $compDomains  = array_filter(array_map([$this,'domain'], $competitors));
        $compList     = $compDomains ? implode(', ', $compDomains) : '(none provided)';

        foreach ($keywords as $kw) {
            $prompt = "
You must act as an accurate, factual lookup system.

Return well-known companies that are broadly recognized as associated with the keyword below.
Use reliable sources and, when possible, recent information from roughly the last {$daysLookback} days.

Strict rules:
- NEVER invent new companies or domains.
- Only include widely-recognized or strongly relevant organizations.
- Exclude uncertain or obscure entries.
- OK to return 0–10 results.
- NO explanations or extra text.

Keyword: '{$kw}'
User domain: {$targetDomain}
Competitors: {$compList}

Return ONLY:
1. Company — domain.com
2. Company — domain.com
";

            $payload = [
                'contents' => [[ 'parts' => [['text' => $prompt]] ]]
            ];

            $resp = $this->curl_json($url, ['Content-Type: application/json'], $payload);
            $text = $resp['json']['candidates'][0]['content']['parts'][0]['text'] ?? '';

            $analysis = $this->analyzeListText($text, $website, $company, $competitors);
            $results['keywordResults'][$kw] = $analysis;

            if (!empty($analysis['mentioned'])) {
                $results['mentions']++;
                $pos = (int)($analysis['position'] ?? 0);
                if ($pos > 0 && (!$results['ranking'] || $pos < $results['ranking'])) {
                    $results['ranking'] = $pos;
                }
            }

            usleep(300000);
        }

        $results['score'] = $this->platformScore($results, count($keywords));
        return $results;
    }

    private function q_claude(string $website, string $company, array $competitors, array $keywords, int $daysLookback): array
    {
        $url   = 'https://api.anthropic.com/v1/messages';
        $model = 'claude-3-5-sonnet-20241022';

        $headers = [
            'Content-Type: application/json',
            'x-api-key: ' . $this->keys['anthropic'],
            'anthropic-version: 2023-06-01'
        ];

        $results = [
            'platform'       => 'Claude',
            'mentions'       => 0,
            'ranking'        => null,
            'score'          => 0,
            'keywordResults' => []
        ];

        $targetDomain = $this->domain($website);
        $compDomains  = array_filter(array_map([$this,'domain'], $competitors));
        $compList     = $compDomains ? implode(', ', $compDomains) : '(none provided)';

        foreach ($keywords as $kw) {
            $prompt = "
Act as a highly reliable factual lookup system.

Return companies that major, trusted sources consistently associate with this keyword.
Prefer recent information from roughly the last {$daysLookback} days where relevant.

Rules:
- No hallucination.
- No invented domains.
- Only include companies with strong or well-known relevance.
- Exclude uncertain, obscure, or weakly-connected entities.
- Return 0–10 entries ONLY in this exact format:

1. Company — domain.com
2. Company — domain.com

NO commentary or explanations.

Keyword: '{$kw}'
User domain: {$targetDomain}
Competitors: {$compList}
";

            $payload = [
                'model'      => $model,
                'max_tokens' => 600,
                'messages'   => [
                    ['role' => 'user', 'content' => $prompt]
                ]
            ];

            $resp = $this->curl_json($url, $headers, $payload);
            $text = $resp['json']['content'][0]['text'] ?? '';

            $analysis = $this->analyzeListText($text, $website, $company, $competitors);
            $results['keywordResults'][$kw] = $analysis;

            if (!empty($analysis['mentioned'])) {
                $results['mentions']++;
                $pos = (int)($analysis['position'] ?? 0);
                if ($pos > 0 && (!$results['ranking'] || $pos < $results['ranking'])) {
                    $results['ranking'] = $pos;
                }
            }

            usleep(300000);
        }

        $results['score'] = $this->platformScore($results, count($keywords));
        return $results;
    }

    /* ---- HTTP helper ---- */
    private function curl_json(string $url, array $headers, array $payload): array
    {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER     => $headers,
            CURLOPT_POSTFIELDS     => json_encode($payload),
            CURLOPT_TIMEOUT        => 40
        ]);
        $body = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $err  = curl_error($ch);
        curl_close($ch);

        if ($err) {
            throw new Exception("HTTP error: $err");
        }
        if ($code < 200 || $code >= 300) {
            throw new Exception("HTTP $code: " . substr((string)$body, 0, 180));
        }

        $json = json_decode((string)$body, true) ?: [];
        return ['code' => $code, 'json' => $json];
    }

    /* ---- analysis helpers ---- */
    private function analyzeListText(string $content, string $website, string $company, array $competitors): array
    {
        // We expect lines like: "1. Company — domain.tld"
        $result = [
            'mentioned'          => false,
            'position'           => null,
            'competitorMentions' => [],
            'responseLength'     => strlen($content),
            'confidence'         => 0.2
        ];

        $lines        = preg_split('/\r?\n/', trim($content));
        $domain       = $this->domain($website);
        $lowerCompany = strtolower($company);

        $pos = 0;
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '') continue;
            $pos++;

            // Check for own domain
            if ($domain && stripos($line, $domain) !== false) {
                $result['mentioned']  = true;
                $result['position']   = $pos;
                $result['confidence'] = 0.85;
                break;
            }

            // Check for company name if domain not found
            if ($lowerCompany && stripos(strtolower($line), $lowerCompany) !== false) {
                $result['mentioned']  = true;
                $result['position']   = $pos;
                $result['confidence'] = 0.6;
            }
        }

        foreach ($competitors as $c) {
            $cd = $this->domain($c);
            $result['competitorMentions'][] = [
                'domain'    => $cd,
                'mentioned' => $cd ? (stripos($content, $cd) !== false) : false
            ];
        }

        return $result;
    }

    private function domain(string $url): string
    {
        $url = str_replace(['http://', 'https://'], '', $url);
        $url = preg_replace('/^www\./i', '', $url);
        return explode('/', $url)[0];
    }

    /**
     * Neutral, transparent scoring:
     * score = percentage of keywords where you are mentioned at least once.
     */
    private function platformScore(array $res, int $kwCount): float
    {
        if ($kwCount <= 0) return 0.0;
        $mentionPct = ($res['mentions'] / $kwCount) * 100;
        $score      = max(0, min(100, $mentionPct));
        return (float) round($score, 2);
    }

    private function summarize(array $platformResults, string $website, array $competitors): array
    {
        $totalScore    = 0;
        $platformCount = 0;
        $totalMentions = 0;

        foreach ($platformResults as $platform => $result) {
            if (isset($result['error'])) continue;
            $totalScore    += (float)($result['score'] ?? 0);
            $totalMentions += (int)($result['mentions'] ?? 0);
            $platformCount++;
        }

        $avg = $platformCount > 0 ? $totalScore / $platformCount : 0.0;

        // Aggregate competitor mentions across platforms/keywords
        $competitorMap = []; // domain => ['url'=>..., 'mentions'=>0]

        foreach ($platformResults as $platform => $result) {
            if (empty($result['keywordResults']) || !is_array($result['keywordResults'])) continue;

            foreach ($result['keywordResults'] as $kw => $analysis) {
                if (empty($analysis['competitorMentions'])) continue;

                foreach ($analysis['competitorMentions'] as $cm) {
                    $domain = $cm['domain'] ?? '';
                    if (!$domain) continue;

                    if (!isset($competitorMap[$domain])) {
                        $competitorMap[$domain] = [
                            'url'      => $domain,
                            'mentions' => 0
                        ];
                    }

                    if (!empty($cm['mentioned'])) {
                        $competitorMap[$domain]['mentions']++;
                    }
                }
            }
        }

        $competitorAnalysis = [];
        foreach ($competitorMap as $domain => $data) {
            $mentions = (int)$data['mentions'];
            // simple, transparent competitor score: more mentions => higher,
            // but cap to keep it in 0–100 range
            $score = max(0, min(100, $mentions * 20));

            $competitorAnalysis[] = [
                'url'            => $data['url'],
                'mentions'       => $mentions,
                'estimatedScore' => $score
            ];
        }

        return [
            'overallScore'       => round($avg, 2),
            'totalMentions'      => $totalMentions,
            'platformsAnalyzed'  => $platformCount,
            'visibility'         => $avg >= 70 ? 'Strong' : ($avg >= 40 ? 'Moderate' : 'Weak'),
            'competitorAnalysis' => $competitorAnalysis
        ];
    }
}
