import { Progress, Tooltip } from "antd";
import CellSizes from "../../constants/cell-sizes";
import styles from "./styles.module.scss";
import { memo } from "react";

interface CellProps {
  text: string;
  progress: number;
}

export const Cell = memo(({ text, progress }: CellProps) => {
  return (
    <div
      style={{
        width: CellSizes.width,
        height: CellSizes.height,
      }}
      className={styles.cell}
    >
      <Tooltip placement="top" title={text}>
        <Progress type="circle" percent={Number(progress.toFixed(2))} />
      </Tooltip>
    </div>
  );
});
