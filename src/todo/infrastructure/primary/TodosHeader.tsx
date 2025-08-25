import { useState} from 'react'
import {Plus} from "lucide-react";
import type {KeyboardEvent} from 'react';
import {useTodos} from "@/todo/application/useTodos.ts";

export default function TodosHeader() {
  const {addTodo} = useTodos();

  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (title.trim() === '') return;

    addTodo({
      id: new Date().getTime().toString(),
      title: title.trim(),
      description: description.trim(),
      completed: false
    });

    setTitle('');
    setDescription('');
    setShowForm(false);
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setShowForm(false);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };


  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          ✨ Ma Todo List
        </h1>
        <p className="text-gray-600">Organisez vos tâches avec style</p>
      </div>

      {!showForm && (
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="w-full cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5"/>
            Ajouter une nouvelle tâche
          </button>
        </div>
      )}

      {showForm && (
        <div className="mb-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la tâche
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ex: Faire les courses"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (optionnelle)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Acheter du pain, lait et fruits"
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4"/>
                Ajouter
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-all duration-200"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>

  )
}
