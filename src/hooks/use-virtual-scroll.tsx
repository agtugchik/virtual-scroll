import { Row, Col } from "antd";
import { lazy, useCallback, useLayoutEffect, useState } from "react";
import useSctoll from "./use-scroll";
import useResize from "./use-resize";
import CellSizes from "../constants/cell-sizes";

const LazyCell = lazy(() => import("../components/Cell/Cell"));

const useVirtualScroll = (
  containerWithScrollId: string,
  tableItems: string[][],
  cellSizes: typeof CellSizes
) => {
  const scroll = useSctoll(containerWithScrollId);
  const windowSize = useResize();
  const [itemsInView, setItemsInView] = useState<JSX.Element[]>([]);
  const [placeholderStyle, setPlaceholderStyle] = useState({
    top: { minWidth: "100%", minHeight: 0 },
    bot: { minWidth: "100%", minHeight: 0 },
    left: { minHeight: "100%", minWidth: 0 },
    right: { minHeight: "100%", minWidth: 0 },
  });
  const [renderItemsIndexes, setRenderItemsIndexes] = useState({
    top: 0,
    bot: 0,
    left: 0,
    right: 0,
  });

  const getRenderItemsIndexes = useCallback(() => {
    const additionalCountStatic = 2;
    const additionalCountNoneDirection = 1;
    const additionalCountDirection = 6;
    const getAdditionalCount = (direction: typeof scroll.direction) =>
      scroll.direction === direction
        ? additionalCountDirection
        : scroll.direction
        ? additionalCountNoneDirection
        : additionalCountStatic;
    const additionalCountLeft = getAdditionalCount("left");
    const additionalCountRight = getAdditionalCount("right");
    const additionalCountTop = getAdditionalCount("top");
    const additionalCountBot = getAdditionalCount("bot");
    const colsScrolled = Math.floor(scroll.scrollLeft / cellSizes.width);
    const left = Math.max(colsScrolled - additionalCountLeft, 0);
    const collsInView = Math.ceil(windowSize.width / cellSizes.width);
    let right = colsScrolled + collsInView + additionalCountRight;
    right = Math.min(right, tableItems[0].length);

    const rowsScrolled = Math.floor(scroll.scrollTop / cellSizes.height);
    const top = Math.max(rowsScrolled - additionalCountTop, 0);
    const rowsInView = Math.ceil(windowSize.height / cellSizes.height);
    let bot = rowsScrolled + rowsInView + additionalCountBot;
    bot = Math.min(bot, tableItems.length);

    return { left, right, top, bot };
  }, [scroll, windowSize]);

  const getItemsInView = useCallback(() => {
    const items = [];
    for (let r = renderItemsIndexes.top; r < renderItemsIndexes.bot; r++) {
      const row = [];
      for (let c = renderItemsIndexes.left; c < renderItemsIndexes.right; c++) {
        row.push(
          <Col key={c}>
            <LazyCell
              text={tableItems[r][c]}
              progress={
                (r * c) /
                (((tableItems.length - 1) * (tableItems[0].length - 1)) / 100)
              }
            />
          </Col>
        );
      }
      items.push(
        <Row key={r} wrap={false}>
          {row}
        </Row>
      );
    }

    return items;
  }, [renderItemsIndexes]);

  const calculatePlaceholderStyle = useCallback(
    (prevStyle: typeof placeholderStyle) => {
      const { top, bot, left, right } = prevStyle;
      const newStyle = {
        top: {
          ...top,
          minHeight: renderItemsIndexes.top * CellSizes.height,
        },
        bot: {
          ...bot,
          minHeight:
            (tableItems.length - renderItemsIndexes.bot) * CellSizes.height,
        },
        left: {
          ...left,
          minWidth: renderItemsIndexes.left * CellSizes.width,
        },
        right: {
          ...right,
          minWidth:
            (tableItems[0].length - renderItemsIndexes.right) * CellSizes.width,
        },
      };
      return newStyle;
    },
    [renderItemsIndexes]
  );

  useLayoutEffect(() => {
    setItemsInView(() => getItemsInView());
    setPlaceholderStyle((prevStyle) => calculatePlaceholderStyle(prevStyle));
  }, [renderItemsIndexes]);

  useLayoutEffect(() => {
    setRenderItemsIndexes(getRenderItemsIndexes());
  }, [scroll, windowSize]);

  return { itemsInView, renderItemsIndexes, placeholderStyle };
};

export default useVirtualScroll;
