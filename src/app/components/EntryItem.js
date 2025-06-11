

export default function EntryItem({ entry, onEdit, onDelete }) {
  return (
    <li className="p-4 border rounded-lg bg-white shadow space-y-2">
      <h2 className="font-semibold">{entry.title}</h2>
      <p>{entry.content}</p>

      {entry.frequency_link && entry.frequency_title && (
        <a
          href={entry.frequency_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          {entry.frequency_title}
        </a>
      )}

<p> {new Date(entry.created_at).toLocaleString('es-AR', { dateStyle: 'medium', timeStyle: 'short' })}</p>
{entry.updated_at !== entry.created_at && (
  <p>Editado: {new Date(entry.updated_at).toLocaleString('es-AR', { dateStyle: 'medium', timeStyle: 'short' })}</p>
)}

      <div className="space-x-2 pt-2">
        <button
          onClick={() => onEdit(entry)}
          className="text-sm bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(entry.id)}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}
