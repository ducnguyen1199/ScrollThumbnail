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
    const element = container.current.querySelector(`#thumbnail-item-${index}`);
    if (!element) return;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <SliderIndicatorWrapper>
      {[...Array(length)].map((_, index) => (
        <Dot
          key={index}
          active={currentIndex === index}
          onClick={() => handleOnClick(index)}
        />
      ))}
    </SliderIndicatorWrapper>
  );
};

const SliderIndicatorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border: 1px solid #be4019;
  cursor: pointer;
  transform: rotate(-45deg);
  ${({ active }) => active && "background: #BE4019"}
`;
