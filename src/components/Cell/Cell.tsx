import { Progress, Tooltip } from "antd";
import { memo } from "react";
import CellSizes from "../../constants/cell-sizes";
import styles from "./styles.module.scss";

interface CellProps {
  text: string;
  progress: number;
}

export const Cell = memo(({ text, progress }: CellProps) => (
  <div style={CellSizes} className={styles.cell}>
    <Tooltip placement="top" title={text} destroyTooltipOnHide>
      <Progress type="circle" percent={Number(progress.toFixed(2))} />
    </Tooltip>
  </div>
));

export default Cell;
