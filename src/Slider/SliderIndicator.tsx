import React, { FC, RefObject } from "react";
import styled from "styled-components";

type TSliderIndicatorProps = {
  container: RefObject<HTMLDivElement>;
  currentIndex: number;
  length: number;
};

export const SliderIndicator: FC<TSliderIndicatorProps> = ({
  container,
  currentIndex,
  length,
}) => {
  const handleOnClick = (index: number) => {
    if (!container?.current) return;

    container.current.scrollTo({
      behavior: "smooth",
      top: index * container.current.clientHeight,
    });
  };

  return (
    <SliderIndicatorWrapper>
      <SliderIndicatorBody>
        {[...Array(length)].map((_, index) => (
          <Dot
            key={index}
            active={currentIndex === index}
            onClick={() => handleOnClick(index)}
          />
        ))}
      </SliderIndicatorBody>
    </SliderIndicatorWrapper>
  );
};

const SliderIndicatorWrapper = styled.div`
  position: relative;
  width: 10px;
  z-index: 3;
`;

const SliderIndicatorBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const Dot = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border: 1px solid #be4019;
  cursor: pointer;
  transform: rotate(-45deg);
  ${({ active }) => active && "background: #BE4019"}
`;
