export default function PageHeader({ title }) {
  if (!title) return null;

  return (
    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
      {title}
    </h1>
  );
}
