export default function PageHeader({ title }) {
  if (!title) return null;

  return <h1 className="">{title}</h1>;
}
