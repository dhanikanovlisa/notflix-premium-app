import { useParams } from "react-router-dom";
import { URLSearchParams } from "url";

interface PaginationButtonProps {
    target: string;
}

function PaginationButton({target}: PaginationButtonProps){
    const { page } = useParams();
    const currentPage: number = Number(page) ? Number(page) : 1;

    const url = window.location.hostname + window.location.pathname;
    const urlSearchParams = new URLSearchParams(window.location.search);
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

    return (
        <a href = {url+'?'+urlSearchParams.toString()}>
            <div className=''>
                {target}
            </div>
        </a>
    );
}

export default PaginationButton