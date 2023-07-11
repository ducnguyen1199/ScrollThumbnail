import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import { FC, Key, ReactNode, RefObject, useMemo, useRef } from "react";
import styled from "styled-components";

export type TSliderItem = {
  id: Key;
  imgSrc: string;
  content: ReactNode;
};

type TSliderItemProps = {
  index: number;
  imgSrc: string;
  height: string | number;
  isActive: boolean;
  container: RefObject<HTMLDivElement>;
};

export const SliderItem: FC<TSliderItemProps> = ({
  index,
  imgSrc,
  isActive,
  container,
  height,
}) => {
  const willChange = useWillChange();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container,
    offset: ["start end", "end end"],
  });

  const randomNumber = useMemo(() => Math.random(), []);

  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [-20, randomNumber * 20]
  );

  return (
    <ItemWrapper ref={ref} id={`thumbnail-item-${index}`}>
      <ItemBody height={height}>
        <Thumbnail
          style={{
            willChange,
            scale,
            rotate,
            y: "-50%",
            top: `${randomNumber * (52 - 48) + 48}%`,
          }}
        >
          <ThumbnailOverlay style={{ display: isActive ? "none" : "block" }} />
          <img src={imgSrc} alt="img" />
        </Thumbnail>
      </ItemBody>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  position: sticky;
  top: 0;
`;

const ItemBody = styled.div<{ height: string | number }>`
  position: relative;
  height: ${({ height }) => (isNaN(height as number) ? height : height + "px")};
`;

const Thumbnail = styled(motion.div)`
  position: absolute;
  right: 0;
  top: 50%;
  width: 300px;
  img {
    width: 100%;
  }
`;

const ThumbnailOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: #0000007d;
`;
