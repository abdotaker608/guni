import React from 'react';
import Paginate from 'react-paginate';

function Paginator({total, onChange, current}) {
    return (
        <Paginate
            pageCount={total}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            forcePage={current - 1}
            containerClassName='pagination'
            pageClassName='page-item'
            nextClassName='page-item'
            breakClassName='page-item'
            activeClassName='page-item active'
            disabledClassName='page-item disabled'
            previousLinkClassName='page-link'
            nextLinkClassName='page-link'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            breakLinkClassName='page-link'
            activeLinkClassName='page-link active'
            onPageChange={(e) => onChange(e.selected + 1)}
        />
    )
}

export default Paginator
