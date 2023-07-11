import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import { FC, useMemo, useRef } from "react";
import styled from "styled-components";
import { Frame } from "./";

type TSliceItemProps = {
  isActive: boolean;
};

export const SLICE_ITEM_HEIGHT = window.innerHeight;

export const SliceItem: FC<TSliceItemProps> = ({ isActive }) => {
  const container = useRef<HTMLDivElement>(
    typeof document !== "undefined"
      ? document.querySelector("#container")
      : null
  );
  const willChange = useWillChange();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container,
    offset: ["start end", "end end"],
  });

  const randomNumber = useMemo(() => Math.random(), []);

  const scale = useTransform(scrollYProgress, [0, 1], [2, 1]);

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [-20, randomNumber * 20]
  );

  const randomColor = "#" + Math.floor(randomNumber * 16777215).toString(16);

  return (
    <Item ref={ref}>
      <ItemContent>
        <Frame color={randomColor}>SliceItem</Frame>
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
          <img
            src={`https://source.unsplash.com/random/200x200?sig=${Math.floor(
              randomNumber * 10
            )}`}
            alt="img"
          />
        </Thumbnail>
      </ItemContent>
    </Item>
  );
};

const Item = styled.div`
  position: sticky;
  top: 0;
`;

const ItemContent = styled.div`
  position: relative;
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
