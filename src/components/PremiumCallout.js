export default function PremiumCallout({ products }) {
  return (
    <div className="my-6 rounded-xl border border-primary/20 bg-primary/5 p-4 not-prose">
      <div className="flex items-center gap-2 text-sm font-medium text-primary mb-3">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
        <span>Looking for more advanced effects?</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {products.map((product) => (
          <a
            key={product.url}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-surface-1 px-3 py-2 text-sm hover:bg-surface-2 transition-colors border border-outline-variant !no-underline"
          >
            <span className="font-medium">{product.title}</span>
            <span className="text-on-surface-variant hidden sm:inline">
              - {product.description}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
