import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { mcpApp } from './mcp/index';
import { agentAnalytics } from './agent-analytics/index.js';

const AGENT_DISCOVERY_LINKS = [
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  '</llms.txt>; rel="llms-txt"; type="text/plain"',
  '</.well-known/mcp/server-card.json>; rel="mcp-server-card"; type="application/json"',
  '</swiper-api>; rel="service-doc"; type="text/html"',
].join(', ');

const JSDELIVR_PACKAGE_BASE = 'https://cdn.jsdelivr.net/npm/swiper';
const JSDELIVR_PACKAGE_PAGE = 'https://www.jsdelivr.com/package/npm/swiper';

// Files that existed in older Swiper releases but were renamed since.
// Everything else keeps its path and resolves on jsDelivr as-is.
const LEGACY_PACKAGE_FILES: Record<string, string> = {
  'css/swiper.css': 'swiper-bundle.css',
  'css/swiper.min.css': 'swiper-bundle.min.css',
  'js/swiper.js': 'swiper-bundle.js',
  'js/swiper.min.js': 'swiper-bundle.min.js',
  'js/swiper.esm.bundle.js': 'swiper-bundle.mjs',
  'js/swiper.esm.js': 'swiper.mjs',
};

const app = new Hono<{ Bindings: CloudflareBindings }>()
  // Records what every request got (status, content type, agent UA) and
  // ships it to the agent analytics collector after the response is sent.
  .use('*', (c, next) =>
    agentAnalytics({
      siteKey: c.env.AA_SITE_KEY ?? '',
      endpoint: 'https://aa.nolimits4web.com/v1/events',
    })(c, next)
  )
  .use(
    '/mcp/*',
    cors({
      origin: '*',
      allowHeaders: ['*'],
      maxAge: 86400,
      allowMethods: ['GET', 'POST', 'OPTIONS'],
    })
  )
  .route('/mcp', mcpApp)
  // Legacy /package/* paths used to mirror the npm package. Send them to
  // jsDelivr, which serves the same files for the latest release.
  .get('/package', (c) => c.redirect(JSDELIVR_PACKAGE_PAGE, 301))
  .get('/package/*', (c) => {
    const file = c.req.path.replace(/^\/package\/?/, '');
    if (!file) return c.redirect(JSDELIVR_PACKAGE_PAGE, 301);
    const target = LEGACY_PACKAGE_FILES[file] ?? file;
    return c.redirect(`${JSDELIVR_PACKAGE_BASE}/${target}`, 301);
  })
  .get('*', async (c) => {
    const response = await c.env.ASSETS.fetch(c.req.url);
    const country = (c.req.raw.cf as IncomingRequestCfProperties | undefined)
      ?.country;
    const contentType = response.headers.get('content-type') || '';
    const isHtml = contentType.includes('text/html');

    let out = response;
    if (country === 'CN' && isHtml) {
      out = new HTMLRewriter()
        .on('head', {
          element(element) {
            element.prepend('<script>window.__NO_SPONSORS__=true</script>', {
              html: true,
            });
          },
        })
        .on('[data-sponsors]', {
          element(element) {
            element.remove();
          },
        })
        .transform(response);
    }

    if (isHtml) {
      out = new Response(out.body, out);
      out.headers.append('Link', AGENT_DISCOVERY_LINKS);
    }

    return out;
  });

export default app;
