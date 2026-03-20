import * as Style from './styles';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    pageSize
}) => {
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <Style.PaginationContainer>
            <Style.PaginationInfo>
                Showing {startItem}-{endItem} of {totalItems}
            </Style.PaginationInfo>

            <Style.PaginationButtons>
                <Style.PageButton
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Style.PageButton>

                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} style={{ padding: '0 0.5rem' }}>...</span>
                    ) : (
                        <Style.PageButton
                            key={page}
                            $active={page === currentPage}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </Style.PageButton>
                    )
                ))}

                <Style.PageButton
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Style.PageButton>
            </Style.PaginationButtons>
        </Style.PaginationContainer>
    );
};

export default Pagination;
