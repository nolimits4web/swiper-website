export default function PageHeader({ title }) {
  if (!title) return null;

  return <h1 className="font-bold tracking-tight text-on-surface">{title}</h1>;
}
