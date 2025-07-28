import React, { useContext } from 'react';
import { NetworkContext } from '../../context/NetworkContext';

function CloudSync() {
  const { isOnline } = useContext(NetworkContext);

  return (
    <div>
      <h4>Cloud Sync</h4>
      <button disabled={!isOnline} onClick={() => alert('Syncing...')}>
        {isOnline ? 'Sync to Cloud' : 'Sync (Offline)'}
      </button>
      {!isOnline && <p style={{ fontSize: '0.8em', color: 'orange' }}>You are offline. Changes will be synced when you reconnect.</p>}
    </div>
  );
}

export default CloudSync;
