import { useEffect, useRef, useState } from "react";

const useSctoll = (id: string) => {
  const [scroll, setScroll] = useState({
    isScroll: false,
    scrollTop: 0,
    scrollLeft: 0,
  });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollHandler = (target: HTMLElement) => {
    if (timer !== null) {
      clearTimeout(timer.current as ReturnType<typeof setTimeout>);
      setScroll({
        isScroll: true,
        scrollTop: target.scrollTop,
        scrollLeft: target.scrollLeft,
      });
    }
    timer.current = setTimeout(() => {
      setScroll({
        isScroll: false,
        scrollTop: target.scrollTop,
        scrollLeft: target.scrollLeft,
      });
    }, 50);
  };

  useEffect(() => {
    const target = document.getElementById(id) as HTMLElement;
    const handler = () => scrollHandler(target);
    target.addEventListener("scroll", handler, false);
    return () => {
      target.removeEventListener("scroll", handler, false);
    };
  });

  return scroll;
};

export default useSctoll;
