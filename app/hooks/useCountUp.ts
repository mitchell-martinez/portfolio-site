import { useEffect, useRef, useState } from 'react';

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

const useCountUp = (value: number, active: boolean, duration = 1400) => {
  const [displayValue, setDisplayValue] = useState(value);
  const displayRef = useRef(value);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (!active || reducedMotion) {
      displayRef.current = value;
      setDisplayValue(value);
      return;
    }

    const startValue = hasAnimatedRef.current ? displayRef.current : 0;
    hasAnimatedRef.current = true;
    displayRef.current = startValue;
    setDisplayValue(startValue);

    let startTime: number | null = null;
    let frameId = 0;

    const update = (time: number) => {
      if (startTime === null) startTime = time;

      const progress = Math.min(1, (time - startTime) / duration);
      const nextValue = Math.round(
        startValue + (value - startValue) * easeOutCubic(progress)
      );

      displayRef.current = nextValue;
      setDisplayValue(nextValue);

      if (progress < 1) frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [active, duration, value]);

  return displayValue;
};

export { useCountUp };