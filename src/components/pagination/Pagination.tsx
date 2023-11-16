import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Pagination.module.css';
import PaginationButton from '../paginationbutton/PaginationButton';

interface PaginationProps {
    totalRecords: number;
    itemsPerPage: number;
}

function Pagination({totalRecords, itemsPerPage}: PaginationProps){
    const urlSearchParams = new URLSearchParams(window.location.search);
    const currentPage: number = Number(urlSearchParams.get('page')) ? Number(urlSearchParams.get('page')) : 1;
    const [totalPages, setTotalPages] = useState(Math.ceil(totalRecords/itemsPerPage));
    const [limitPage, setLimitPage] = useState(totalPages<5 ? totalPages : 5);
    const [start, setStart] = useState(currentPage===1 ? 1 : currentPage-1);
    
    let bound = start+limitPage-1;
    if(bound > totalPages){
        setStart(totalPages-limitPage+1);
        bound = limitPage;
    }else{
        bound = start+limitPage-1;
    }
    const pages = Array.from({ length: bound - start + 1 }, (_, index) => start + index)

    return (
        <div id='pagination-container' className={styles.pagination}>
            <>
                {currentPage!==1 && <PaginationButton target='<' />}
                {pages.map((item) => (
                    (<PaginationButton target={item.toString()} />)
                ))}
                {currentPage!==totalPages && totalRecords>0 && <PaginationButton target='>' />}
            </>
        </div>
    );

}

export default Pagination