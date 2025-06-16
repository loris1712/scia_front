"use client";

import { useState, useEffect } from "react";
import { getLogs } from "@/api/profile";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [logType, setLogType] = useState('combined');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
              getLogs(logType).then((data) => {
                setLogs(data || []);
              });
          }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Visualizzatore Log del Server</h1>

      <div>
        <button style={styles.button} onClick={() => setLogType('combined')}>Tutti i Log</button>
        <button style={styles.button} onClick={() => setLogType('error')}>Solo Errori</button>
      </div>

      {isLoading && <p>Caricamento log...</p>}
      {error && <p style={{ color: 'red' }}>Errore nel caricamento: {error}</p>}

      <div>
        {logs.map((log, index) => (
          <div key={index} style={styles.logEntry}>
            <div style={styles.logMeta}>
                <strong style={getLevelStyle(log.level)}>{log.level.toUpperCase()}</strong> - 
                <span>{new Date(log.timestamp).toLocaleString()}</span>
            </div>
            <pre style={styles.pre}>
              {JSON.stringify(log, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
