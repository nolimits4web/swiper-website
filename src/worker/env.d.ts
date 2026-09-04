declare namespace Cloudflare {
  interface Env {
    AA_SITE_KEY?: string;
    BEEHIIV_API_KEY?: string;
    BEEHIIV_PUBLICATION_ID?: string;
    SUBSCRIBE_RATELIMIT?: {
      limit: (options: { key: string }) => Promise<{ success: boolean }>;
    };
  }
}
