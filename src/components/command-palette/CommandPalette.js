import React, { useState, useEffect, useMemo, useContext } from 'react';
import './CommandPalette.css';
import { ThemeContext } from '../../context/ThemeContext';

export function CommandPalette({ show, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { toggleTheme } = useContext(ThemeContext);

  const commands = useMemo(() => [
    { id: 'toggle-theme', title: 'Toggle Light/Dark Theme', action: () => {
      toggleTheme();
      onClose();
    }},
    { id: 'export-mp4', title: 'Export as MP4', action: () => alert('Exporting as MP4!') },
    { id: 'export-gif', title: 'Export as GIF', action: () => alert('Exporting as GIF!') },
    { id: 'save-project', title: 'Save Project', action: () => alert('Project Saved!') },
  ], [toggleTheme, onClose]);

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (show) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, onClose]);

  if (!show) {
    return null;
  }

  return (
    <div className="command-palette-overlay" onClick={onClose}>
      <div className="command-palette" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder="Type a command..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
        <ul>
          {filteredCommands.map((command) => (
            <li key={command.id} onClick={command.action}>
              {command.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
