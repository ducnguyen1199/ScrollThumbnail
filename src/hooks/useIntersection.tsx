import { RefObject, useCallback, useState } from "react";

const configCenter = {
  rootMargin: "-50% 0% -50% 0%",
  threshold: 0,
};

type TUseIntersectionProps = [
  IntersectionObserverEntry,
  (target: RefObject<HTMLElement>, isCenterView?: boolean) => void
];

const useIntersection = (): TUseIntersectionProps => {
  const [entryData, setEntryData] = useState({} as IntersectionObserverEntry);

  const subscribe = useCallback(
    (target: RefObject<HTMLElement>, isCenterView = false) => {
      if (!target?.current) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          setEntryData(entry);
        },
        isCenterView ? configCenter : undefined
      );

      observer.observe(target.current);
    },
    []
  );

  return [entryData || {}, subscribe];
};

export default useIntersection;
