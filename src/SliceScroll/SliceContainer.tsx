import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import styled from "styled-components";
import { SliceItem, SLICE_ITEM_HEIGHT } from "./SliceItem";

export const SliceContainer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollY } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  useMotionValueEvent(scrollY, "change", () => {
    const currentTop = ref.current?.offsetTop || 0;
    if (scrollY.get() < currentTop - SLICE_ITEM_HEIGHT) return;
    const current = Math.floor(
      (scrollY.get() - currentTop) / SLICE_ITEM_HEIGHT + 1
    );
    if (current < 0) setCurrentIndex(0);
    else if (current > 4) setCurrentIndex(4);
    else setCurrentIndex(current);
  });

  return (
    <Container id="container" ref={ref}>
      {[...Array(10)].map((_, index) => (
        <SliceItem key={index} isActive={currentIndex === index} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  background-color: black;
  padding: 100px;
`;
