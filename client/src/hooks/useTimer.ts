import { useEffect, useState } from 'react';

const useTimer = (time: number, onTimesOut: () => void) => {
  const [timer, setTimer] = useState(time);
  let t: any = null;

  useEffect(() => {
    time !== -1 && handleTimer();
    return () => {
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const handleTimer = () => {
    t = setTimeout(() => {
      timer > 0 ? setTimer(timer - 1) : onTimesOut();
    }, 1000);
  };

  const getTimer = () => {
    return timer;
  };

  const setNewTimer = (newTimer: number) => {
    setTimer(newTimer);
  };

  return { getTimer, setNewTimer };
};

export default useTimer;
