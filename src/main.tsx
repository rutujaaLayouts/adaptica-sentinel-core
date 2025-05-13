
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check initial theme preference to avoid flash of wrong theme
const initialTheme = localStorage.getItem('theme') || 'light';
if (initialTheme === 'dark' || 
    (initialTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.add('light');
}

createRoot(document.getElementById("root")!).render(<App />);
