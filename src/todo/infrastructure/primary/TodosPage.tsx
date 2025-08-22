import { useState} from "react";
import { CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';
import type {KeyboardEvent} from "react";
import {useTodos} from "@/todo/application/useTodos.ts";
import TodosStats from "@/todo/infrastructure/primary/TodosStats.tsx";

export default function TodosPage() {

  const { todos, addTodo } = useTodos();
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
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
              <Plus className="w-5 h-5" />
              Ajouter une nouvelle tâche
            </button>
          </div>
        )}

        {/* Form */}
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
                  <Plus className="w-4 h-4" />
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

        {/* Todo List */}
        <div className="space-y-3">
          {todos.data?.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-medium text-gray-600 mb-2">Aucune tâche</h3>
              <p className="text-gray-500">Ajoutez votre première tâche pour commencer !</p>
            </div>
          ) : (
            todos.data?.map((todo) => (
              <div
                key={todo.id}
                className={`group bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 ${
                  todo.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    // onClick={() => toggleTodo(todo.id)}
                    className="mt-1 cursor-pointer text-gray-400 hover:text-indigo-500 transition-colors"
                  >
                    {todo.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-gray-800 ${
                      todo.completed ? 'line-through text-gray-500' : ''
                    }`}>
                      {todo.title}
                    </h3>
                    {todo.description && (
                      <p className={`text-gray-600 mt-1 ${
                        todo.completed ? 'line-through text-gray-400' : ''
                      }`}>
                        {todo.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      // onClick={() => deleteTodo(todo.id)}
                      className="text-gray-400 cursor-pointer hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {todos.data && todos.data.length > 0 && (<TodosStats todos={todos.data} />)}
      </div>
    </div>
  )

}
