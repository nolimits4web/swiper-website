export default function PremiumProductCard({ slug, title, description }) {
  const imageUrl = `https://uiinitiative.com/items/${slug}/cover.jpg`;
  const productUrl = `https://uiinitiative.com/catalog/${slug}`;

  return (
    <a
      href={productUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-4 p-3 rounded-lg bg-surface-1 border border-outline hover:bg-white/15 transition-colors !no-underline group active:bg-white/10"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-32 h-16 sm:w-40 sm:h-20 object-cover !rounded-sm shrink-0 border border-outline"
        loading="lazy"
      />
      <div className="flex flex-col">
        <div className="font-semibold text-on-surface  transition-colors !no-underline">
          {title}
        </div>
        <div className="text-on-surface-dark text-sm mt-1 !no-underline">
          {description}
        </div>
      </div>
    </a>
  );
}

export function PremiumProductGrid({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">{children}</div>
  );
}
