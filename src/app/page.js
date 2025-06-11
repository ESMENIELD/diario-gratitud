'use client';
import { useEffect, useState } from 'react';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import DownloadPDFButton from './components/DownloadPDFButton';
import { useAuth } from './Login/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [editing, setEditing] = useState(null);
  console.log('useAuth:', useAuth); // debe ser una función
  const { user } = useAuth();  

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const res = await fetch('http://localhost:3001/api/entries');
    const data = await res.json();
    setEntries(data);
  };

  const handleSave = async (form) => {
    if (editing) {
      await fetch(`http://localhost:3001/api/entries/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    } else {
      await fetch('http://localhost:3001/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    }

    setEditing(null);
    fetchEntries();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/api/entries/${id}`, {
      method: 'DELETE'
    });
    fetchEntries();
  };

  return (
    <>
      <main className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">🌼 Diario de Gratitud</h1>
        <EntryForm onSave={handleSave} initialData={editing} />
        <EntryList entries={entries} onEdit={setEditing} onDelete={handleDelete} />
        <DownloadPDFButton entries={entries} />
      </main>

      <div className="p-4">
        {user ? (
          <div className="flex items-center gap-2">
            {user.photoURL && (
              <Image
                src={user.photoURL}
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <span className="font-medium">{user.displayName || user.email}</span>
          </div>
        ) : (
          <Link href="/login" className="text-blue-500">Iniciar sesión</Link>
        )}
      </div>
    </>
  );
}
