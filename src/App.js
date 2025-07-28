import React from 'react';
import TopToolbar from './components/layout/TopToolbar';
import Sidebar from './components/layout/Sidebar';
import EditorArea from './components/layout/EditorArea';
import TimelineView from './components/layout/TimelineView';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopToolbar />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <EditorArea />
          <TimelineView />
        </main>
      </div>
    </div>
  );
}

export default App;
