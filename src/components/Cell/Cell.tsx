import { Progress, Tooltip } from "antd";
import { memo, useState } from "react";
import CellSizes from "../../constants/cell-sizes";
import styles from "./styles.module.scss";

interface CellProps {
  text: string;
  progress: number;
}

export const Cell = memo(({ text, progress }: CellProps) => {
  const [mouseIn, setMouseIn] = useState(false);
  const ProgressBar = (
    <Progress type="circle" percent={Number(progress.toFixed(2))} />
  );

  return (
    <div
      style={CellSizes}
      onMouseEnter={() => setMouseIn(true)}
      onMouseLeave={() => setMouseIn(false)}
      className={styles.cell}
    >
      {mouseIn ? (
        <Tooltip placement="top" title={text}>
          {ProgressBar}
        </Tooltip>
      ) : (
        ProgressBar
      )}
    </div>
  );
});

export default Cell;
