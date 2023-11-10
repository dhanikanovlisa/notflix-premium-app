import styles from "./Toast.module.css";
import { useEffect, Dispatch, SetStateAction } from "react";

interface ToastProps {
  message: string;
  type: string;
  showUseState:  (any | Dispatch<SetStateAction<any>>)[];
}

function Toast({ message, type, showUseState }: ToastProps) {

  useEffect(() => {
    if (showUseState[0]) {
      const timeoutId = setTimeout(() => {
        showUseState[1](false);
      }, 1700);

      return () => clearTimeout(timeoutId);
    }
  }, [showUseState]);

  return (
    <div className={showUseState[0] ? styles.toast_show : styles.toast}>
      <img className={styles.toast_img} src={`/src/assets/${type}.png`} alt={type} />
      <div className={type === "cross" ? styles.cross : styles.check}>{message}</div>
    </div>
  );
}

export default Toast;
