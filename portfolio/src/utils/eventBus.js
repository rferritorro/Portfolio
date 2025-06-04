const listeners = new Map();

export function on(event, callback) {
  if (!listeners.has(event)) listeners.set(event, []);
  listeners.get(event).push(callback);
  return () => off(event, callback); // devolvé una función de limpieza
}

export function emit(event, data) {
  if (listeners.has(event)) {
    listeners.get(event).forEach(cb => cb(data));
  }
}

export function off(event, callback) {
  if (!listeners.has(event)) return;
  const updated = listeners.get(event).filter(cb => cb !== callback);
  listeners.set(event, updated);
}
