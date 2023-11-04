import styles from "./Toast.module.css";
import { useState, useEffect } from "react";

interface ToastProps {
  message: string;
  type: string;
  showUseState: boolean;
}

function Toast({ message, type, showUseState }: ToastProps) {
  const [showToast, setShowToast] = useState(showUseState);

  useEffect(() => {
    setShowToast(showUseState);
    if (showUseState) {
      const timeoutId = setTimeout(() => {
        setShowToast(false);
      }, 1700);

      return () => clearTimeout(timeoutId);
    }
  }, [showUseState]);

  return (
    <div className={showToast ? styles.toast_show : styles.toast}>
      <img className={styles.toast_img} src={`/src/assets/${type}.png`} alt={type} />
      <div className={type === "cross" ? styles.cross : styles.check}>{message}</div>
    </div>
  );
}

export default Toast;
