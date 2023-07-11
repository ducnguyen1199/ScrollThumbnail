import { FC, PropsWithChildren, useEffect, useState } from "react";
import styled, { css } from "styled-components";

export const SliderContent: FC<PropsWithChildren> = ({ children }) => {
  const [content, setContent] = useState(children);

  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    setIsChanging(true);
    setTimeout(() => {
      setContent(children);
      setIsChanging(false);
    }, 600);
  }, [children]);

  return (
    <SliderContentWrapper>
      <SliderContentBody isChanging={isChanging}>{content}</SliderContentBody>
    </SliderContentWrapper>
  );
};

const Animate = css`
  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-100%);
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SliderContentWrapper = styled.div`
  position: relative;
  width: 30%;
`;

const SliderContentBody = styled.div<{ isChanging: boolean }>`
  position: absolute;
  top: 50%;
  width: 100px;
  z-index: 2;
  transform: translateY(-50%);
  overflow: hidden;
  > * {
    position: relative;
    display: block;
    background-color: gray;
    ${({ isChanging }) =>
      isChanging ? "animation: fadeOut 0.6s " : "animation: fadeIn 0.6s"};
    ${Animate};
  }
`;
