import sponsors from '../shared/sponsors';
// import Image from 'next/image';

export default function SidebarSponsors() {
  return (
    <div className="border-b-2 border-gray-200 mb-4">
      <div className="font-semibold mb-2">Sponsors:</div>
      {sponsors.map(({ href, title, src_h, src, height, height_h, alt }) => (
        <a
          className="block my-3"
          href={href}
          key={href}
          title={title}
          rel="noopener"
          target="_blank"
        >
          <img
            width={200}
            height={height_h || height}
            className="max-h-12"
            alt={alt}
            src={`/images/${src_h || src}`}
          />
        </a>
      ))}
    </div>
  );
}
