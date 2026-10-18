const DB_NAME = 'CognitiveEcologyPWA_DB';
const DB_VERSION = 1;
const STORE_NAME = 'ecology_state';
const LS_KEY = 'cognitive_ecology_pwa_v1';

export const openEcologyDB = () =>
  new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB unavailable'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });

export const saveStateOffline = async (state) => {
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch (e) {}
  try {
    const db = await openEcologyDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(state, 'root');
      tx.oncomplete = () => resolve({ engine: 'IndexedDB + LocalStorage', ok: true });
      tx.onerror = () => resolve({ engine: 'LocalStorage', ok: true });
    });
  } catch (e) {
    return { engine: 'LocalStorage', ok: true };
  }
};

export const loadStateOffline = async () => {
  try {
    const db = await openEcologyDB();
    const data = await new Promise((resolve, reject) => {
      const req = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get('root');
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    if (data) return { data, engine: 'IndexedDB' };
  } catch (e) {}
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (raw) return { data: JSON.parse(raw), engine: 'LocalStorage' };
  } catch (e) {}
  return { data: null, engine: 'Memory-Init' };
};
