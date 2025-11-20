export default function FileList({ items, onDelete }) {
  return (
    <div className="space-y-2">
      {items.map((file) => (
        <div
          key={file.id}
          className="flex justify-between items-center bg-white p-3 shadow-sm rounded-md border"
        >
          <a
            href={file.url}
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            📄 {file.name}
          </a>

          <button
            onClick={() => onDelete(file.id)}
            className="cursor-pointer text-red-500 hover:text-red-700"
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}
