import { useParams } from "react-router-dom";
import styles from './PaginationButton.module.css';

interface PaginationButtonProps {
    target: string;
}

function PaginationButton({target}: PaginationButtonProps){
    const urlSearchParams = new URLSearchParams(window.location.search);
    const currentPage: number = Number(urlSearchParams.get('page')) ? Number(urlSearchParams.get('page')) : 1;
    const url = window.location.hostname + window.location.pathname;

    let goto: number;

    if(target === '<'){
        goto = currentPage-1;
    }
    else if(target === '>'){
        goto = currentPage+1;
    }
    else{
        goto = Number(target);
    }

    urlSearchParams.set('page', goto.toString());
    const classes: string = `${styles.button_pagination} ${(currentPage===goto) ? styles.button_pagination_active : 'button-white'}`;

    return (
        <a href = {'?'+urlSearchParams.toString()}>
            <div className={classes}>
                {target}
            </div>
        </a>
    );
}

export default PaginationButton