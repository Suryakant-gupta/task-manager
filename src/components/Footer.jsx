import React, { useCallback } from 'react';
import { useTaskContext } from '../context/TaskContext';

const Footer = React.memo(() => {
  const { tasks, exportTasks } = useTaskContext();
  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.filter((t) => !t.completed).length;

  const handleImport = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (Array.isArray(imported)) {
            localStorage.setItem('tasks', JSON.stringify(imported));
            window.location.reload();
          }
        } catch (err) {
          console.error('Import failed', err);
        }
      };
      reader.readAsText(file);
    }
  }, []);

  return (
    <footer className="w-full border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className=" mx-auto px-4 pb sm:py-6">
        {/* Stats - stacked on mobile, row on sm+ */}
        <div className="border-b w-full pbo border-gray-200 dark:border-slate-700 gp flex items-center justify-center sm:flex-row gap-3 sm:gap-6 mb-4 text-sm">
          <div className="flex flex-col items-center gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">{completed}</span>
            <span className="text-gray-600 dark:text-gray-400">Completed</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-bold text-orange-600 dark:text-orange-400 text-lg">{pending}</span>
            <span className="text-gray-600 dark:text-gray-400">Pending</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-bold text-green-600 dark:text-green-400 text-lg">{tasks.length}</span>
            <span className="text-gray-600 dark:text-gray-400">Total</span>
          </div>
        </div>
        

        {/* Actions - full width buttons on mobile */}
        <div className="flex gap-2 mb-4 mt-4 pb">
          <button
            onClick={exportTasks}
            className="flex-1 pb sm:px-4 py-3 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200 active:scale-95"
          >
            📥 Export
          </button>

          <label className="flex-1 px-3 sm:px-4 py-3 sm:py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200 cursor-pointer flex items-center justify-center active:scale-95">
            📤 Import
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          © 2025 Advanced Task Manager • Made with React
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;
