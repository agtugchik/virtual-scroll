import { Progress, Tooltip } from "antd";
import CellSizes from "../../constants/cell-sizes";
import styles from "./styles.module.scss";
import { memo, useState } from "react";

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
      style={{
        width: CellSizes.width,
        height: CellSizes.height,
      }}
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
