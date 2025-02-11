import { Suspense, useMemo } from "react";
import tableItems from "../../helpers/table-items";
import styles from "./styles.module.scss";
import CellSizes from "../../constants/cell-sizes";
import useVirtualScroll from "../../hooks/use-virtual-scroll";

export const Table = () => {
  const tableId = "table";
  const memoTableItems = useMemo(() => tableItems, []);
  const memoCellSizes = useMemo(() => CellSizes, []);
  const { itemsInView, placeholderStyle } = useVirtualScroll(
    tableId,
    memoTableItems,
    memoCellSizes
  );

  return (
    <div id={tableId} className={styles.table}>
      <div style={placeholderStyle.left} />
      <div>
        <div style={placeholderStyle.top} />
        <Suspense> {itemsInView}</Suspense>
        <div style={placeholderStyle.bot} />
      </div>
      <div style={placeholderStyle.right} />
    </div>
  );
};
