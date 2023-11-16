import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PaginationButton from '../paginationbutton/PaginationButton';

interface PaginationProps {
    totalRecords: number;
    itemsPerPage: number;
}

function Pagination({totalRecords, itemsPerPage}: PaginationProps){
    const { page } = useParams();
    const currentPage: number = Number(page) ? Number(page) : 1;
    const [totalPages, setTotalPages] = useState(0);
    const [limitPage, setLimitPage] = useState(0);
    const [start, setStart] = useState(0);
    const [bound, setBound] = useState(0);
    const [pages, setPages] = useState([currentPage]);
    
    useEffect(() => {
        setTotalPages(Math.ceil(totalRecords/itemsPerPage));
        setLimitPage(totalPages<5 ? totalPages : 5);
        setStart(currentPage===1 ? 1 : currentPage-1);
        setBound(start+limitPage-1);
        setPages(Array.from({ length: bound - start + 1 }, (_, index) => start + index));
    }, [totalRecords, itemsPerPage]);

    useEffect(() => {
        if(bound > totalPages){
            setStart(totalPages-limitPage+1);
            setBound(totalPages);
        }
    }, [totalPages]);
    
    return (
        <>
            {currentPage!==1 && <PaginationButton target='<' />}
            {pages.map((item) => {
                <PaginationButton target={item.toString()} />
            })}
            {currentPage!==totalPages && totalRecords>0 && <PaginationButton target='>' />}
        </>
    );

}

export default Pagination