import { useState, useEffect } from "react";

/**Custom hook to initialize viewport state.
 * @param  {string} key
 * @param  {S} initial
 *
 * when user moves the viewport the localStorage will be updated & persisted for browser refresh
 */
export function useLocalState<S = undefined>(key: string, initial: S) {
  const [value, setValue] = useState<S>(() => {
    //make sure you're running in browser & not next.JS
    if (typeof window !== "undefined" && window.localStorage) {
      const saved = window.localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
    }
    //if we don't have a saved value in local storage use initial values
    return initial;
  });

  //write to local storage on save
  useEffect(() => {
    if (window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
