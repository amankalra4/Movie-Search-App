import React, { useEffect } from 'react';
import styles from './Pagination.module.css';
import PropTypes from 'prop-types';

const Pagination = ({totalMoviesArray, paginate, currentPage_prop}) => {
    
    const pageNumbers = [];
    for (let i = 1; i <= totalMoviesArray; i++) {
        pageNumbers.push(i);
    }

    let firstPage = null, lastPage = null;
    if(currentPage_prop !== 1) {
        firstPage = (
            <React.Fragment>
                <button className = {styles.stylePagination} onClick = {() => paginate(1)}>1</button>
                <button className = {styles.buttonClass} onClick = {() => paginate(currentPage_prop - 1)}>{'<<'}</button>
            </React.Fragment>
        );
    }
    if(currentPage_prop !== pageNumbers.length && currentPage_prop <= pageNumbers.length - 6) {
        lastPage = (
            <React.Fragment>
                <button className = {styles.buttonClass} onClick = {() => paginate(currentPage_prop + 1)}>{'>>'}</button>
                <button className = {styles.stylePagination} onClick = {() => paginate(pageNumbers.length)}>{pageNumbers.length}</button>
            </React.Fragment>
        );
    }

    useEffect(() => {
        document.getElementById('pagination' + currentPage_prop).style.backgroundColor = '#28d09a';
    }, [currentPage_prop]);

    return (
        <div className = {styles.paginationDiv}>
            {firstPage}
            <button id = {'pagination' + currentPage_prop}
                    onClick = {() => paginate(currentPage_prop)}
                    className = {styles.stylePagination}>
                {currentPage_prop}
            </button>
            {pageNumbers.slice(currentPage_prop, currentPage_prop + 5).map((number) => 
                    <React.Fragment key = {number}>
                            <button onClick = {() => paginate(number)}
                                    className = {styles.stylePagination}>
                            {number}
                            </button>
                    </React.Fragment>
            )}
            {lastPage}
        </div>
    );
}

Pagination.propTypes = {
    totalMoviesArray: PropTypes.number,
    paginate: PropTypes.func,
    currentPage_prop: PropTypes.number   
}

// React.Memo works same as that of shouldComponentUpdate. React will store sanpshot of this component and only if its
// input changes, it will re-render it, otherwise, if nothing changes, React will give back the stored component.
export default React.memo(Pagination);
