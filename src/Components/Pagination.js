import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Pagination = ({totalMoviesArray, paginate, currentPage_prop}) => {
    
    const pageNumbers = [];
    for (let i = 1; i <= totalMoviesArray; i++) {
        pageNumbers.push(i);
    }

    const stylePagination = {
        display: 'inline-block',
        margin: '20px 10px',
        padding: '8px 15px',
        cursor: 'pointer',
        borderRadius: '5px',
        outline: 'none',
        border: '0',
        fontWeight: 'lighter',
        fontSize: '15px'
    };

    const buttonClass  = {
        margin: '20px 10px',
        padding: '1px 10px',
        cursor: 'pointer',
        borderRadius: '5px',
        outline: 'none',
        border: '0',
        fontWeight: 'lighter',
        fontSize: '15px'
    };

    let firstPage = null, lastPage = null;
    if(currentPage_prop !== 1) {
        firstPage = (
            <React.Fragment>
                <button style = {stylePagination} onClick = {() => paginate(1)}>1</button>
                <button style = {buttonClass} onClick = {() => paginate(currentPage_prop - 1)}>{'<<'}</button>
            </React.Fragment>
        );
    }
    if(currentPage_prop !== pageNumbers.length && currentPage_prop <= pageNumbers.length - 6) {
        lastPage = (
            <React.Fragment>
                <button style = {buttonClass} onClick = {() => paginate(currentPage_prop + 1)}>{'>>'}</button>
                <button style = {stylePagination} onClick = {() => paginate(pageNumbers.length)}>{pageNumbers.length}</button>
            </React.Fragment>
        );
    }

    useEffect(() => {
        document.getElementById('pagination' + currentPage_prop).style.backgroundColor = '#28d09a';
    }, [currentPage_prop]);

    return (
        <div style = {{textAlign: 'center'}}>
            {firstPage}
            <button id = {'pagination' + currentPage_prop}
                    onClick = {() => paginate(currentPage_prop)}
                    style = {stylePagination}>
                {currentPage_prop}
            </button>
            {pageNumbers.slice(currentPage_prop, currentPage_prop + 5).map((number) => 
                    <React.Fragment key = {number}>
                            <button onClick = {() => paginate(number)}
                                    style = {stylePagination}>
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