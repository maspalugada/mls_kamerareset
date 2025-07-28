import React, { useContext } from 'react';
import { NetworkContext } from '../../context/NetworkContext';

function NetworkStatusIndicator() {
  const { isOnline } = useContext(NetworkContext);

  const style = {
    padding: '0 10px',
    fontSize: '1.2em',
    title: isOnline ? 'Online' : 'Offline',
  };

  return (
    <div style={style} title={isOnline ? 'Online' : 'Offline'}>
      {isOnline ? '✅' : '❌'}
    </div>
  );
}

export default NetworkStatusIndicator;
