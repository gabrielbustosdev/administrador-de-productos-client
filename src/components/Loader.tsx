import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Loader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBackendReady, setIsBackendReady] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Configuración ajustable
  const MAX_RETRIES = 5;
  const RETRY_INTERVAL = 5000; // 5 segundos
  const BACKEND_HEALTH_CHECK_URL = `${import.meta.env.VITE_API_URL}/api/products`;

  const checkBackendStatus = async () => {
    try {
      const response = await axios.get(BACKEND_HEALTH_CHECK_URL, {
        timeout: 10000
      });
      
      if (response.status === 200) {
        setIsBackendReady(true);
        setError(null);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (error: any) => {
    if (retryCount < MAX_RETRIES) {
      setRetryCount(prev => prev + 1);
      setError(`El servidor está iniciando... (Intento ${retryCount + 1}/${MAX_RETRIES})`);
    } else {
      setError('El servidor está tardando más de lo esperado. Por favor intenta recargar la página.');
      setIsBackendReady(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(checkBackendStatus, RETRY_INTERVAL);
    return () => clearTimeout(timer);
  }, [retryCount]);

  useEffect(() => {
    checkBackendStatus();
  }, []);

  if (!isBackendReady) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-white/95 flex justify-center items-center z-[1000]">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-5 mx-auto"></div>
          <p className="text-gray-800 text-lg mb-4">{error || 'Conectando con el servidor...'}</p>
          {retryCount >= MAX_RETRIES && (
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-300"
              onClick={() => {
                setRetryCount(0);
                setIsBackendReady(false);
              }}
            >
              Reintentar conexión
            </button>
          )}
        </div>
      </div>
    );
  }

  return children;
};

export default Loader;