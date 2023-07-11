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
      <SliderBody height={height}>
        <SliderIndicator
          currentIndex={currentIndex}
          length={data.length}
          container={ref}
        />
        <SliderContent>{data[currentIndex]?.content || ""}</SliderContent>
        <SliderThumbnails ref={ref}>
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
      </SliderBody>
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div`
  background-color: black;
  padding: 0 100px;
`;

const SliderBody = styled.div<{ height: string | number }>`
  position: relative;
  display: flex;
  justify-content: flex-start;
  gap: 40px;
  height: ${({ height }) => (isNaN(height as number) ? height : height + "px")};
`;
const SliderThumbnails = styled.div`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  &::-webkit-scrollbar {
    display: none;
  }
`;
