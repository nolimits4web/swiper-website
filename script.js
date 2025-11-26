// =====================
// Matrix Rain Effect
// =====================
class MatrixRain {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.chars = '01';
    this.fontSize = 14;
    this.columns = 0;
    this.drops = [];
    this.init();
  }
  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.drops = Array(this.columns).fill(1);
  }
  animate() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#0f0';
    this.ctx.font = `${this.fontSize}px monospace`;
    for (let i = 0; i < this.drops.length; i++) {
      const text = this.chars[Math.floor(Math.random() * this.chars.length)];
      this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
      if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }
    requestAnimationFrame(() => this.animate());
  }
}

// =====================
// LLM Visibility Tool (real API + Sheets + safe fallback)
// =====================
class LLMVisibilityTool {
  constructor() {
    this.form = document.getElementById('visibility-form');
    this.loadingSection = document.getElementById('loading-section');
    this.resultsSection = document.getElementById('results-section');
    this.matrixRain = null;
    this.progressInterval = null;

    // Runs inside: https://lead-whisper.com/llm-visibility-checker/
    // -> resolves to /llm-visibility-checker/api.php?endpoint=analyze
    this.API_URL = 'api.php?endpoint=analyze';

    // bind methods
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.analyzeVisibility = this.analyzeVisibility.bind(this);
    this.delay = this.delay.bind(this);

    this.init();
  }

  // ---------- lifecycle ----------
  init() {
    if (this.form) this.form.addEventListener('submit', this.handleFormSubmit);
    this.initSmoothScrolling();
    this.initFormValidation();
  }

  // ---------- UX helpers ----------
  initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  initFormValidation() {
    const emailInput = document.getElementById('email');
    if (emailInput) emailInput.addEventListener('blur', this.validateEmail);

    ['website', 'competitor1', 'competitor2', 'competitor3'].forEach(id => {
      const input = document.getElementById(id);
      if (input) input.addEventListener('blur', this.validateURL);
    });
  }

  validateEmail(e) {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      e.target.classList.add('input-error');
      e.target.classList.remove('input-success');
    } else if (email) {
      e.target.classList.add('input-success');
      e.target.classList.remove('input-error');
    }
  }

  validateURL(e) {
    const url = e.target.value;
    if (!url) return;
    try {
      new URL(url);
      e.target.classList.add('input-success');
      e.target.classList.remove('input-error');
    } catch {
      e.target.classList.add('input-error');
      e.target.classList.remove('input-success');
    }
  }

  // ---------- form flow ----------
  async handleFormSubmit(e) {
    e.preventDefault();

    const formData = this.collectFormData();
    if (!this.validateForm(formData)) {
      this.showAlert('Please fill in all required fields correctly.', 'error');
      return;
    }

    this.showLoadingSection();

    try {
      // Call backend for REAL analysis + logging (Sheets + leads.json)
      const apiResults = await this.analyzeVisibility(formData);

      if (apiResults) {
        // REAL results path
        const formatted = this.formatResults(apiResults);
        this.showResults(formatted);
      } else {
        // Complete failure → fallback to mock (still logs to Sheets server-side)
        this.showAlert('Analysis engine unavailable. Showing estimates.', 'error');
        const mock = this.generateMockResults(formData);
        this.showResults(mock);
      }
    } catch (error) {
      console.error('Unexpected error in handleFormSubmit:', error);
      this.showAlert('Something went wrong. Showing estimates.', 'error');
      const mock = this.generateMockResults(formData);
      this.showResults(mock);
    }
  }

  collectFormData() {
    return {
      fullName: (document.getElementById('fullName')?.value || '').trim(),
      email: (document.getElementById('email')?.value || '').trim(),
      company: (document.getElementById('company')?.value || '').trim(),
      phone: (document.getElementById('phone')?.value || '').trim(),
      website: (document.getElementById('website')?.value || '').trim(),
      competitors: [
        (document.getElementById('competitor1')?.value || '').trim(),
        (document.getElementById('competitor2')?.value || '').trim(),
        (document.getElementById('competitor3')?.value || '').trim()
      ].filter(Boolean),
      keywords: (document.getElementById('keywords')?.value || '')
        .split(',')
        .map(k => k.trim())
        .filter(Boolean),
      consent: !!document.getElementById('consent')?.checked
    };
  }

  validateForm(data) {
    if (!data.fullName || !data.email || !data.website || !data.keywords.length || !data.consent) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) return false;
    try { new URL(data.website); } catch { return false; }
    return true;
  }

  // ---------- loading ui ----------
  showLoadingSection() {
    const analyzer = document.getElementById('analyzer');
    if (analyzer) analyzer.style.display = 'none';
    if (this.loadingSection) this.loadingSection.style.display = 'block';

    const canvas = document.getElementById('matrix-canvas');
    if (canvas && !this.matrixRain) this.matrixRain = new MatrixRain(canvas);

    this.loadingSection?.scrollIntoView({ behavior: 'smooth' });
    this.animateMatrixProgress();
  }

  hideLoadingSection() {
    if (this.loadingSection) this.loadingSection.style.display = 'none';
    const analyzer = document.getElementById('analyzer');
    if (analyzer) analyzer.style.display = 'block';
  }

  animateMatrixProgress() {
    const steps = ['step-1', 'step-2', 'step-3', 'step-4'];
    const statusMessages = [
      'VALIDATING INPUT...',
      'QUERYING LLMs...',
      'LOGGING TO SHEET...',
      'COMPILING REPORT...'
    ];

    let i = 0;
    const matrixStatus = document.getElementById('matrix-status');

    if (this.progressInterval) clearInterval(this.progressInterval);
    this.progressInterval = setInterval(() => {
      if (i < statusMessages.length) {
        if (matrixStatus) matrixStatus.textContent = statusMessages[i];
        if (i < steps.length) {
          const el = document.getElementById(steps[i]);
          if (el) {
            el.classList.add('active');
            const sp = el.querySelector('span');
            if (sp) { sp.textContent = '[ WORKING ]'; sp.className = 'text-yellow-400 animate-pulse'; }
          }
          if (i > 0) {
            const prev = document.getElementById(steps[i - 1]);
            if (prev) {
              prev.classList.remove('active'); prev.classList.add('completed');
              const sp2 = prev.querySelector('span');
              if (sp2) { sp2.textContent = '[ COMPLETE ]'; sp2.className = 'text-black font-bold bg-green-400 px-2 py-1 rounded'; }
            }
          }
        }
        i++;
      } else {
        steps.forEach(id => {
          const el = document.getElementById(id);
          if (!el) return;
          const sp = el.querySelector('span');
          el.classList.remove('active'); el.classList.add('completed');
          if (sp) { sp.textContent = '[ COMPLETE ]'; sp.className = 'text-black font-bold bg-green-400 px-2 py-1 rounded'; }
        });
        if (matrixStatus) matrixStatus.textContent = 'DONE.';
        clearInterval(this.progressInterval);
      }
    }, 1100);
  }

  // ---------- API: REAL backend + Sheets, with safe fallback ----------
  async analyzeVisibility(formData) {
    // Send as x-www-form-urlencoded to avoid strict WAFs
    const body = new URLSearchParams();
    body.set('payload', JSON.stringify(formData));

    try {
      const res = await fetch(this.API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body
      });

      const raw = await res.text();
      let data = null;
      try {
        data = JSON.parse(raw);
      } catch {
        console.warn('API returned non-JSON:', res.status, raw.slice(0, 180));
        return null;
      }

      if (!res.ok || !data.success) {
        console.warn('API error:', data.error || `HTTP ${res.status}`);
        return null;
      }

      // data.results is the REAL analysis when LLM calls succeed
      return data.results || null;
    } catch (err) {
      console.warn('analyzeVisibility failed:', err);
      return null;
    }
  }

  // ---------- result shaping (from REAL API) ----------
  formatResults(apiResults) {
    const platforms = Object.keys(apiResults.platformResults || {});

    // ----- REAL competitor mention extraction -----
    const competitorSummary = {};
    const competitors = apiResults.competitors || apiResults.user?.competitors || [];

    // Initialize tracking buckets
    competitors.forEach(url => {
      competitorSummary[url] = {
        url,
        totalMentions: 0,
        perPlatform: {}
      };
    });

    // Traverse platform → keywords → competitorMentions
    for (const [platformKey, platform] of Object.entries(apiResults.platformResults || {})) {
      const keywordResults = platform.keywordResults || {};
      for (const [kw, result] of Object.entries(keywordResults)) {
        (result.competitorMentions || []).forEach(c => {
          if (!competitorSummary[c.domain]) return;
          if (c.mentioned) {
            competitorSummary[c.domain].totalMentions++;
            competitorSummary[c.domain].perPlatform[platformKey] =
              (competitorSummary[c.domain].perPlatform[platformKey] || 0) + 1;
          }
        });
      }
    }

    // Convert into frontend-friendly structure
    const competitorComparison = Object.values(competitorSummary).map(c => ({
      url: c.url,
      name: c.url.replace(/^https?:\/\//, ''),
      mentions: c.totalMentions,
      platforms: Object.keys(c.perPlatform),
      score: Math.min(100, c.totalMentions * 10) // deterministic
    }));

    // ----- RETURN OBJECT -----
    return {
      user: apiResults.user || {
        name: '',
        website: apiResults.website || '',
        company: apiResults.company || ''
      },
      summary: {
        overallScore: apiResults.summary?.overallScore ?? 0,
        totalMentions: apiResults.summary?.totalMentions ?? 0,
        // NEW: competitorAverage based on *real* competitorComparison[]
        competitorAverage:
          competitorComparison.length
            ? Math.round(
                competitorComparison.reduce(
                  (sum, c) => sum + (c.score || 0),
                  0
                ) / competitorComparison.length
              )
            : 0
      },

      platformResults: platforms.map(platformKey => {
        const result = apiResults.platformResults[platformKey] || {};
        const prettyName = platformKey.charAt(0).toUpperCase() + platformKey.slice(1);
        return {
          name: prettyName,
          score: Math.round((result.score || 0) * 100) / 100,
          mentions: result.mentions || 0,
          ranking: result.ranking || null,
          topKeywords: Object.keys(result.keywordResults || {}).slice(0, 3)
        };
      }),

      // REAL COMPETITOR DATA
      competitorComparison,

      recommendations: [
        "Optimize your website content for AI-friendly formats",
        "Create more authoritative content in your industry",
        "Build stronger backlink profiles from reputable sources",
        "Improve your online reviews and testimonials",
        "Develop thought leadership content and case studies"
      ]
    };
  }

  // ---------- pure mock generator (only if API fully fails) ----------
  generateMockResults(formData) {
    const platforms = ['ChatGPT', 'Gemini', 'Perplexity', 'Claude'];
    const keywords = formData.keywords || [];
    const isGB =
      formData.website?.toLowerCase().includes('greenbanana') ||
      formData.company?.toLowerCase().includes('greenbanana');

    const userRange = isGB ? [75, 95] : [60, 85];
    const compRange = [35, 75];
    const r = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    return {
      user: { name: formData.fullName, website: formData.website, company: formData.company },
      summary: {
        overallScore: r(userRange[0], userRange[1]),
        totalMentions: r(15, 40),
        competitorAverage: r(45, 75)
      },
      platformResults: platforms.map(name => ({
        name, score: r(userRange[0], userRange[1]), mentions: r(3, 15), ranking: r(1, 3), topKeywords: keywords.slice(0, 3)
      })),
      competitorComparison: (formData.competitors || []).map((url, i) => ({
        name: `Competitor ${i + 1}`, url, score: r(compRange[0], compRange[1]), mentions: r(5, 20)
      })),
      recommendations: [
        'Optimize your website content for AI-friendly formats',
        'Create more authoritative content in your industry',
        'Build stronger backlink profiles from reputable sources',
        'Improve your online reviews and testimonials',
        'Develop thought leadership content and case studies'
      ]
    };
  }

  // ---------- show + render ----------
  showResults(results) {
    this.lastResults = results;
    if (this.progressInterval) clearInterval(this.progressInterval);
    if (this.loadingSection) this.loadingSection.style.display = 'none';
    if (this.resultsSection) this.resultsSection.style.display = 'block';
    this.populateResults(results);
    this.resultsSection?.scrollIntoView({ behavior: 'smooth' });
  }

  populateResults(results) {
    const el = document.getElementById('results-content');
    if (!el) return;
    el.innerHTML = `
      <!-- Summary Cards -->
      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <div class="stat bg-base-200 rounded-box">
          <div class="stat-figure text-primary"><i class="fas fa-chart-line text-3xl"></i></div>
          <div class="stat-title">Overall AI Visibility</div>
          <div class="stat-value text-primary">${results.summary.overallScore}%</div>
          <div class="stat-desc">Across all platforms</div>
        </div>
        <div class="stat bg-base-200 rounded-box">
          <div class="stat-figure text-secondary"><i class="fas fa-bullhorn text-3xl"></i></div>
          <div class="stat-title">Total Mentions</div>
          <div class="stat-value text-secondary">${results.summary.totalMentions}</div>
          <div class="stat-desc">In AI responses</div>
        </div>
        <div class="stat bg-base-200 rounded-box">
          <div class="stat-figure text-accent"><i class="fas fa-users text-3xl"></i></div>
          <div class="stat-title">vs Competitors</div>
          <div class="stat-value text-accent">${results.summary.competitorAverage}%</div>
          <div class="stat-desc">Their average score</div>
        </div>
      </div>

      <!-- Platform Breakdown -->
      <div class="card bg-base-100 shadow-xl mb-8">
        <div class="card-body">
          <h3 class="card-title text-2xl mb-6">
            <i class="fas fa-robot text-primary"></i> Platform Breakdown
          </h3>
          <div class="grid md:grid-cols-2 gap-6">
            ${results.platformResults.map(p => `
              <div class="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                <div>
                  <h4 class="font-semibold text-lg">${p.name}</h4>
                  <p class="text-sm text-base-content/70">${p.mentions} mentions found</p>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold ${p.score > 50 ? 'text-success' : p.score > 30 ? 'text-warning' : 'text-error'}">${p.score}%</div>
                  ${p.mentions > 0 && p.ranking ? `<div class="text-sm">Rank #${p.ranking}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Competitor Comparison -->
      <div class="card bg-base-100 shadow-xl mb-8">
        <div class="card-body">
          <h3 class="card-title text-2xl mb-6">
            <i class="fas fa-balance-scale text-secondary"></i> Competitor Comparison
          </h3>
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <thead>
                <tr><th>Business</th><th>AI Visibility Score</th><th>Total Mentions</th><th>Performance</th></tr>
              </thead>
              <tbody>
                <!-- Your Business -->
                <tr class="bg-primary/10">
                  <td><strong>Your Business</strong><br>
                    <small class="text-base-content/70">${results.user.website || ''}</small>
                  </td>
                  <td><span class="badge badge-primary badge-lg">${results.summary.overallScore}%</span></td>
                  <td>${results.summary.totalMentions}</td>
                  <td>
                    <div class="badge ${
                      results.summary.overallScore >= 80 ? 'badge-success' :
                      results.summary.overallScore >= 60 ? 'badge-info' :
                      results.summary.overallScore >= 40 ? 'badge-warning' : 'badge-error'
                    }">
                      ${
                        results.summary.overallScore >= 80 ? 'Excellent' :
                        results.summary.overallScore >= 60 ? 'Strong' :
                        results.summary.overallScore >= 40 ? 'Moderate' : 'Weak'
                      }
                    </div>
                  </td>
                </tr>

                <!-- REAL COMPETITORS -->
                ${results.competitorComparison.map(comp => `
                  <tr>
                    <td>
                      ${comp.name}<br>
                      <small class="text-base-content/70">${comp.url}</small>
                    </td>

                    <td>
                      <span class="badge badge-outline badge-lg">${comp.score}%</span>
                    </td>

                    <td>${comp.mentions}</td>

                    <td>
                      ${
                        (comp.platforms || []).length > 0
                          ? (comp.platforms || []).map(p => `
                              <span class="badge badge-sm mr-1 badge-neutral">
                                ${p.charAt(0).toUpperCase() + p.slice(1)}
                              </span>
                            `).join('')
                          : `<span class="badge badge-sm badge-error">No mentions</span>`
                      }
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Recommendations -->
      <div class="card bg-base-100 shadow-xl mb-8">
        <div class="card-body">
          <h3 class="card-title text-2xl mb-6">
            <i class="fas fa-lightbulb text-accent"></i> Recommendations to Improve
          </h3>
          <div class="space-y-4">
            ${results.recommendations.map((rec, i) => `
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-accent font-bold">${i + 1}</span>
                </div>
                <p class="text-base-content/80">${rec}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} fixed top-4 right-4 w-auto max-w-md z-50`;
    alertDiv.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
      <span>${message}</span>
    `;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 5000);
  }

  delay(ms) { return new Promise(r => setTimeout(r, ms)); }
}

// ---------- boot ----------
document.addEventListener('DOMContentLoaded', () => {
  window.llmVisibilityTool = new LLMVisibilityTool();

  // Entrance animations
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.card, .hero, .stats').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
