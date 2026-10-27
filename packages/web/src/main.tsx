import React from 'react';
import ReactDOM from 'react-dom/client';
import PixiCanvas from './src/PixiCanvas';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <PixiCanvas />
  </React.StrictMode>,
);
