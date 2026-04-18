import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { mcpApp } from './mcp/index';

const AGENT_DISCOVERY_LINKS = [
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  '</llms.txt>; rel="llms-txt"; type="text/plain"',
  '</.well-known/mcp/server-card.json>; rel="mcp-server-card"; type="application/json"',
  '</swiper-api>; rel="service-doc"; type="text/html"',
].join(', ');

const app = new Hono<{ Bindings: CloudflareBindings }>()
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
            element.prepend(
              '<script>window.__NO_SPONSORS__=true</script>',
              { html: true }
            );
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
