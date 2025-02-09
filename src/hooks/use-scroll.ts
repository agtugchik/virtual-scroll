import { useLayoutEffect, useRef, useState } from "react";

const useSctoll = (id: string) => {
  const [scroll, setScroll] = useState<{
    isScroll: boolean;
    direction: "top" | "bot" | "left" | "right" | "";
    scrollTop: number;
    scrollLeft: number;
  }>({
    isScroll: false,
    direction: "",
    scrollTop: 0,
    scrollLeft: 0,
  });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollHandler = (target: HTMLElement) => {
    if (timer.current !== null) {
      clearTimeout(timer.current as ReturnType<typeof setTimeout>);

      setScroll((prevState) => {
        let direction: typeof scroll.direction = "";
        if (prevState.scrollLeft > target.scrollLeft) direction = "left";
        if (prevState.scrollLeft < target.scrollLeft) direction = "right";
        if (prevState.scrollTop > target.scrollTop) direction = "top";
        if (prevState.scrollTop < target.scrollTop) direction = "bot";
        return {
          isScroll: true,
          direction: direction || prevState.direction,
          scrollTop: target.scrollTop,
          scrollLeft: target.scrollLeft,
        };
      });
    }
    timer.current = setTimeout(() => {
      setScroll({
        isScroll: false,
        direction: "",
        scrollTop: target.scrollTop,
        scrollLeft: target.scrollLeft,
      });
    }, 150);
  };

  useLayoutEffect(() => {
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
