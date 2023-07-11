import { useMotionValueEvent, useScroll } from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SliderContent, SliderItem, TSliderItem, SliderIndicator } from "./";

type TSliderContainerProps = {
  data: TSliderItem[];
  height?: string | number;
};

export const SliderContainer: FC<TSliderContainerProps> = ({
  data,
  height = 500,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start end", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", () => {
    setCurrentIndex(Math.floor((scrollYProgress.get() - 0.05) * data.length));
  });

  return (
    <SliderWrapper>
      <SliderIndicator
        currentIndex={currentIndex}
        length={data.length}
        container={ref}
      />
      <SliderContent>{data[currentIndex]?.content || ""}</SliderContent>
      <SliderThumbnails ref={ref} height={height}>
        {isMounted &&
          data.map(({ id, imgSrc }, index) => (
            <SliderItem
              key={id}
              index={index}
              imgSrc={imgSrc}
              height={height}
              isActive={currentIndex === index}
              container={ref}
            />
          ))}
      </SliderThumbnails>
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div`
  position: relative;
`;

const SliderThumbnails = styled.div<{ height: string | number }>`
  background-color: black;
  height: ${({ height }) => (isNaN(height as number) ? height : height + "px")};
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  padding: 0 100px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
