import { Hono } from 'hono';

export const mcpApp = new Hono<{ Bindings: CloudflareBindings }>();

mcpApp.get('/', (c) => {
  return c.json({ message: 'Hello, World!' });
});
