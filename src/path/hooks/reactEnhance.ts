import { useEffect, useState, useRef } from "react";
/**有回调函数的useState */
export function useCallbackState<T>(state: T): [T, (p: T, call?: (p: T) => void) => void] {
  const cbRef = useRef<(p: T) => void>();
  const [data, setData] = useState<T>(state);
  useEffect(() => {
    typeof cbRef.current === "function" && cbRef.current(data)
  }, [data]);
  return [data, (val, callback) => {
    cbRef.current = callback;
    return setData(val);
  }]
}