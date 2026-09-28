import { useEffect } from 'react';

/**
 * Hook to execute a callback when the Escape key is pressed.
 */
export function useEscapeKey(callback: () => void, isActive: boolean = true): void {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback, isActive]);
}
