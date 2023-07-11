import styled from "styled-components";
import { SLICE_ITEM_HEIGHT } from "./SliceItem";

export const Frame = styled.div<{ color: string }>`
  height: ${SLICE_ITEM_HEIGHT}px;
  width: 100%;
`;
