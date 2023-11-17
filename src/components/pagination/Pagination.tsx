import{ useState, useEffect } from 'react';
import styles from './Pagination.module.css';
import PaginationButton from '../paginationbutton/PaginationButton';

interface PaginationProps {
  totalRecords: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void; // Add this prop
}

function Pagination({ totalRecords, itemsPerPage, currentPage, setCurrentPage }: PaginationProps) {
    const urlSearchParams = new URLSearchParams(window.location.search);
  
    const [totalPages, setTotalPages] = useState(Math.ceil(totalRecords / itemsPerPage));
    const [limitPage, setLimitPage] = useState(totalPages < 5 ? totalPages : 5);
    const [start, setStart] = useState(currentPage === 1 ? 1 : currentPage - 1);
  
    let bound = start + limitPage - 1;
    if (bound > totalPages) {
      setStart(totalPages - limitPage + 1);
      bound = limitPage;
    } else {
      bound = start + limitPage - 1;
    }
  
    const pages = Array.from({ length: bound - start + 1 }, (_, index) => start + index);
  
    useEffect(() => {
      setTotalPages(Math.ceil(totalRecords / itemsPerPage));
      setLimitPage(totalPages < 5 ? totalPages : 5);
      setStart(currentPage === 1 ? 1 : currentPage - 1);
    }, [totalRecords, itemsPerPage, currentPage]);
  
    useEffect(() => {
      if (bound > totalPages) {
        setStart(totalPages - limitPage + 1);
      }
    }, [totalPages]);
  
    return (
      <div id='pagination-container' className={styles.pagination}>
        <>
          {currentPage !== 1 && <PaginationButton target='<' setCurrentPage={setCurrentPage} />}
          {pages.map((item) => (
            <PaginationButton key={item.toString()} target={item.toString()} setCurrentPage={setCurrentPage} />
          ))}
          {currentPage !== totalPages && totalRecords > 0 && <PaginationButton target='>' setCurrentPage={setCurrentPage} />}
        </>
      </div>
    );
  }
  

export default Pagination;
