import { useEffect, useRef } from 'react';

export const useEffectAfterFirstMount = (callbackFn: Function, dependencies: any[]) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      callbackFn();
    } else {
      isMounted.current = true;
    }
  }, [...dependencies]);
};
