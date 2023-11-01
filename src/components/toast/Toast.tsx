import styles from "./Toast.module.css";

interface ToastProps {
    message: string;
    type: string;
    show: boolean;
}
  
function Toast({message, type, show}: ToastProps) {
  return (
      <div className={show? styles.toast_show: styles.toast}>
          <img className={styles.toast_img} src={`/src/assets/${type}.png`}/>
          <div className={type=="cross"? styles.cross: styles.check}>{message}</div>
      </div>
  );
}

export default Toast;
  