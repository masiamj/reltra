/**
 * Hook abstraction of a logical latch.
 *
 * Can be used for first-time loading states.
 */
import { useCallback, useState } from 'react';

const useLatch = () => {
  const [on, setOn] = useState<boolean>(false);

  const trip = useCallback(() => {
    setOn(true);
  }, []);

  return {
    on,
    trip,
  };
};

export default useLatch;
