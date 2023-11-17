import { useNavigate } from "react-router-dom";
import styles from "./PaginationButton.module.css";
interface PaginationButtonProps {
    target: string;
    setCurrentPage: (page: number) => void;
  }

  interface PaginationButtonProps {
    target: string;
    setCurrentPage: (page: number) => void;
  }
  
  function PaginationButton({ target, setCurrentPage }: PaginationButtonProps) {
    const navigate = useNavigate();
    const urlSearchParams = new URLSearchParams(window.location.search);
    const currentPage: number = Number(urlSearchParams.get('page')) || 1;
  
    let goto: number;
  
    if (target === '<') {
      goto = currentPage - 1;
    } else if (target === '>') {
      goto = currentPage + 1;
    } else {
      goto = Number(target);
    }
  
    const handleButtonClick = () => {
      setCurrentPage(goto);
      urlSearchParams.set('page', goto.toString());
      navigate(`?${urlSearchParams.toString()}`);
    };
  
    const classes: string = `${styles.button_pagination} ${(currentPage === goto) ? styles.button_pagination_active : 'button-white'}`;
  
    return (
      <div onClick={handleButtonClick}>
        <div className={classes}>
          {target}
        </div>
      </div>
    );
  }
  
  export default PaginationButton;