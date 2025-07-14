// src/components/UI/ThemeSwitcher.tsx
import React from 'react';
import MyButton, { ButtonVariants } from './UI/button/MyButton';

const ThemeSwitcher: React.FC = () => {
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return <MyButton onClick={toggleTheme} children={'Theme'} type={ButtonVariants.simple}/>;
};

export default ThemeSwitcher;
