import { Row, Col } from "antd";
import { Cell } from "../Cell";
import { useEffect, useState } from "react";
import tableItems from "../../helpers/table-items";
import useSctoll from "../../hooks/use-scroll";
import useResize from "../../hooks/use-resize";
import styles from "./styles.module.scss";
import TableIds from "../../constants/table-ids";
import CellSizes from "../../constants/cell-sizes";

export const Table = () => {
  const scroll = useSctoll(TableIds.table);
  const windowSize = useResize();
  const [placeholderCountCells, setPlaceholderCountCells] = useState({
    top: 0,
    bot: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    const colsScrolled = Math.floor(scroll.scrollLeft / CellSizes.width);
    const left = colsScrolled > 2 ? colsScrolled - 2 : 0;
    const collsInView = Math.ceil(windowSize.width / CellSizes.width);
    const right = colsScrolled + collsInView + 2;

    const rowsScrolled = Math.floor(scroll.scrollTop / CellSizes.height);
    const top = rowsScrolled > 2 ? rowsScrolled - 2 : 0;
    const rowsInView = Math.ceil(windowSize.height / CellSizes.height);
    const bot = rowsScrolled + rowsInView + 2;
    setPlaceholderCountCells({ left, right, top, bot });
  }, [scroll, windowSize]);

  useEffect(() => {
    console.log(placeholderCountCells);
  }, [placeholderCountCells]);

  return (
    <div id={TableIds.table} className={styles.table}>
      <div
        id={TableIds.leftPlaceholder}
        style={{ minWidth: placeholderCountCells.left * CellSizes.width }}
        className={styles.leftPlaceholder}
      />
      <div className={styles.container}>
        <div
          id={TableIds.topPlaceholder}
          style={{ minHeight: placeholderCountCells.top * CellSizes.height }}
          className={styles.topPlaceholder}
        />
        {tableItems.map((row, rowIndex) => {
          if (
            rowIndex >= placeholderCountCells.top &&
            rowIndex <= placeholderCountCells.bot
          )
            return (
              <Row wrap={false} key={rowIndex}>
                {row.map((cell, cellIndex) => {
                  if (
                    cellIndex >= placeholderCountCells.left &&
                    cellIndex <= placeholderCountCells.right
                  )
                    return (
                      <Col key={cell}>
                        <Cell text={cell} />
                      </Col>
                    );
                })}
              </Row>
            );
        })}
        <div
          id={TableIds.botPlaceholder}
          style={{
            minHeight:
              (tableItems.length > placeholderCountCells.bot
                ? tableItems.length - placeholderCountCells.bot
                : 0) * CellSizes.height,
          }}
          className={styles.botPlaceholder}
        />
      </div>
      <div
        id={TableIds.rightPlaceholder}
        style={{
          minWidth:
            (tableItems[0].length > placeholderCountCells.right
              ? tableItems[0].length - placeholderCountCells.right
              : 0) * CellSizes.width,
        }}
        className={styles.rightPlaceholder}
      />
    </div>
  );
};
