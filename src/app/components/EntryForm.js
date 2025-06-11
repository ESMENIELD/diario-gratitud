'use client';
import { useState, useEffect, useRef } from 'react';
import { FaSmile } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';

const defaultFrequencies = [
  { title: 'Armonía 432Hz', link: 'https://www.youtube.com/watch?v=2JvJ25DL2qI' },
  { title: 'Amor 639Hz', link: 'https://www.youtube.com/watch?v=Iit3OHyNnPk' },
  { title: 'Salud 285Hz', link: 'https://www.youtube.com/watch?v=YoNA5D66zT8' },
  { title: 'Prosperidad 528Hz', link: 'https://www.youtube.com/watch?v=1Z9pqST72is' },
  { title: 'Éxito 963Hz', link: 'https://www.youtube.com/watch?v=t7I1VC3R2jw' }
];

export default function EntryForm({ onSave, initialData = null }) {
  const [form, setForm] = useState({
    title: '',
    content: '',
    frequency_link: '',
    frequency_title: ''
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef();

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        frequency_title: initialData.frequency_title || ''
      });
    }
  }, [initialData]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onEmojiClick = (emojiData) => {
    setForm({ ...form, content: form.content + emojiData.emoji });
    setShowEmojiPicker(false);
  };

  const handleFrequencyClick = (freq) => {
    setForm({ ...form, frequency_link: freq.link, frequency_title: freq.title });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({ title: '', content: '', frequency_link: '', frequency_title: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow mb-6">
      <input
        className="w-full border p-2 rounded"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Título del agradecimiento"
        required
      />
      <div className="relative">
        <textarea
          className="w-full border p-2 rounded"
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Escribí tu gratitud..."
          required
        />
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="absolute top-2 right-2 text-xl text-yellow-500 hover:scale-110"
        >
          <FaSmile />
        </button>
        {showEmojiPicker && (
          <div ref={pickerRef} className="absolute z-50 top-full mt-2">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>
      <input
        className="w-full border p-2 rounded"
        name="frequency_link"
        value={form.frequency_link}
        onChange={handleChange}
        placeholder="Link de frecuencia personalizada (opcional)"
      />
      <input
        className="w-full border p-2 rounded"
        name="frequency_title"
        value={form.frequency_title}
        onChange={handleChange}
        placeholder="Título de la frecuencia personalizada (ej: Paz 432Hz)"
      />

      <div className="flex flex-wrap gap-2">
        {defaultFrequencies.map((freq) => (
          <button
            type="button"
            key={freq.title}
            onClick={() => handleFrequencyClick(freq)}
            className="bg-purple-400 text-white px-3 py-1 rounded hover:bg-purple-500"
          >
            {freq.title}
          </button>
        ))}
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {initialData ? 'Actualizar entrada' : 'Guardar entrada'}
      </button>
    </form>
  );
}
