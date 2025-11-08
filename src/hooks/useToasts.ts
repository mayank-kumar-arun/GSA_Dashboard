import { useState, useRef } from "react";

export function useToasts() {
  const [toasts, setToasts] = useState<{ id: number; msg: string }[]>([]);
  const idRef = useRef(1);

  function push(msg: string) {
    const id = idRef.current++;
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2500);
  }

  return { toasts, push };
}
