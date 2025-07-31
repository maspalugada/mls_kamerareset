import React, { useState, useContext, useEffect } from 'react';
import TopToolbar from './components/layout/TopToolbar';
import Sidebar from './components/layout/Sidebar';
import EditorArea from './components/layout/EditorArea';
import TimelineView from './components/layout/TimelineView';
import InspectorPanel from './components/inspector-panel/InspectorPanel';
import SettingsPage from './modules/settings/SettingsPage';
import { useSettings } from './hooks/useSettings';
import { CommandPalette } from './components/command-palette/CommandPalette';

function App() {
  const { settings } = useSettings();
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

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
    flexGrow: 1, // Allow this container to grow
    overflow: 'hidden', // Prevent overflow
  };

  const editorColumnStyle = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0, // Prevent flex items from overflowing
  };

  return (
    <div style={appStyle}>
      <CommandPalette show={showCommandPalette} onClose={() => setShowCommandPalette(false)} />
      {isSettingsOpen && <SettingsPage onClose={() => setIsSettingsOpen(false)} />}
      <TopToolbar />
      <div style={mainContentStyle}>
        <Sidebar onSettingsClick={() => setIsSettingsOpen(true)} />
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
