import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Add error handling for production
if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
  });
  
  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
  });
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
} else {
  console.error('Root element not found');
}
