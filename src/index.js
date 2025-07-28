import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { SelectionProvider } from './context/SelectionContext';
import { NetworkProvider } from './context/NetworkContext';
import { AssetProvider } from './context/AssetContext';
import { TimelineProvider } from './context/TimelineContext';
import './theme.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <SelectionProvider>
        <NetworkProvider>
          <AssetProvider>
            <TimelineProvider>
              <App />
            </TimelineProvider>
          </AssetProvider>
        </NetworkProvider>
      </SelectionProvider>
    </ThemeProvider>
  </React.StrictMode>
);
