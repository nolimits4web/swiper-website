export default function PageHeader({ title }) {
  if (!title) return null;

  return (
    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
      {title}
    </h1>
  );
}
