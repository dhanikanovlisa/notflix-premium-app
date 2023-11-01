import styles from "./Toast.module.css";
import { useState } from "react";

interface ToastProps {
    message: string;
    type: string;
    showUseState: useState<boolean>;
}
  
function Toast({message, type, showUseState}: ToastProps) {
    const [showToast, setShowToast] = showUseState;

    if (showToast){
        setTimeout(() => {
            setShowToast(false);
        }, 1700);
    }

  return (
      <div className={showToast? styles.toast_show: styles.toast}>
          <img className={styles.toast_img} src={`/src/assets/${type}.png`}/>
          <div className={type=="cross"? styles.cross: styles.check}>{message}</div>
      </div>
  );
}

export default Toast;
  