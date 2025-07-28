import React, { useState, useContext, useEffect } from 'react';
import TopToolbar from './components/layout/TopToolbar';
import Sidebar from './components/layout/Sidebar';
import EditorArea from './components/layout/EditorArea';
import TimelineView from './components/layout/TimelineView';
import InspectorPanel from './components/inspector-panel/InspectorPanel';
import { ThemeContext } from './context/ThemeContext';
import { CommandPalette } from './components/command-palette/CommandPalette';

function App() {
  const { theme } = useContext(ThemeContext);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: 'var(--bg-color)',
    color: 'var(--font-color)',
  };

  const mainContentStyle = {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  };

  const editorColumnStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={appStyle}>
      <CommandPalette show={showCommandPalette} onClose={() => setShowCommandPalette(false)} />
      <TopToolbar />
      <div style={mainContentStyle}>
        <Sidebar />
        <main style={editorColumnStyle}>
          <EditorArea />
          <TimelineView />
        </main>
        <InspectorPanel />
      </div>
    </div>
  );
}

export default App;
