export default function PageHeader({ title }) {
  if (!title) return null;

  return (
    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-200">
      {title}
    </h1>
  );
}
