import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header = React.memo(({ theme, toggleTheme }) => {
  return (
    <header className={`w-full sticky top-0 z-50 shadow-sm  flex items-center justify-center ${
          theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white'
        }`}>
      <div
        className={`pb he mx-auto w-[90%]  py-4 flex items-center justify-between transition-colors duration-300 `}
      >
        <div className="">
          
          <h1 className="text-2xl md:text-3xl font-bold ">Task Manager</h1>
        </div>

        <div className="">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;
