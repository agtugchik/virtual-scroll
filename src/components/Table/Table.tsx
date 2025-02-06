import tableItems from "../../helpers/table-items";
import styles from "./styles.module.scss";
import CellSizes from "../../constants/cell-sizes";
import useVirtualScroll from "../../hooks/use-virtual-scroll";

export const Table = () => {
  const tableId = "table";
  const { itemsInView, placeholderStyle } = useVirtualScroll(
    tableId,
    tableItems,
    CellSizes
  );

  return (
    <div id={tableId} className={styles.table}>
      <div style={placeholderStyle.left} />
      <div className={styles.container}>
        <div style={placeholderStyle.top} />
        {itemsInView}
        <div style={placeholderStyle.bot} />
      </div>
      <div style={placeholderStyle.right} />
    </div>
  );
};
