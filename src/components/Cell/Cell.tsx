import CellSizes from "../../constants/cell-sizes";
import styles from "./styles.module.scss";

interface CellProps {
  text: string;
}

export const Cell = ({ text }: CellProps) => {
  return (
    <div
      style={{
        width: CellSizes.width,
        height: CellSizes.height,
      }}
      className={styles.cell}
    >
      {text}
    </div>
  );
};
