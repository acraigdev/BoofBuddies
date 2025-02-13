import React, { useMemo } from 'react';
import { SpaceBetween } from './SpaceBetween';
import { Spinner } from './Spinner';

const MAX_PAGES = 5;

interface PaginationProps {
  openEnded?: boolean;
  numberOfPages: number; // 1-index
  currentPage: number; // 0-index
  onCurrentPageChange: (page: number) => void;
  isFetchingNextPage?: boolean;
}

export function Pagination({
  openEnded,
  numberOfPages,
  currentPage,
  onCurrentPageChange,
  isFetchingNextPage,
}: PaginationProps) {
  const pages = useMemo(() => {
    const pageButtons = [];
    // if the current page is within the last 3 elements, work backwards
    // otherwise, keep selection as close to mid as possible
    const start =
      numberOfPages - 1 - currentPage <= Math.floor(MAX_PAGES / 2)
        ? numberOfPages - MAX_PAGES
        : currentPage - Math.floor(MAX_PAGES / 2);
    for (let i = start; i <= numberOfPages - 1; i++) {
      // No more than 5 pages
      if (pageButtons.length === MAX_PAGES) break;
      if (i < 0) continue;
      pageButtons.push(
        <PageButton
          key={i}
          page={i}
          isActive={i === currentPage && !isFetchingNextPage}
          onPageClick={onCurrentPageChange}
          isFetching={
            isFetchingNextPage && pageButtons.length === MAX_PAGES - 1
          }
        />,
      );
    }
    return pageButtons;
  }, [currentPage, isFetchingNextPage, numberOfPages, onCurrentPageChange]);
  return (
    <SpaceBetween direction="horizontal" size="sm" alignOverride="items-center">
      <button
        className="link"
        disabled={currentPage === 0}
        onClick={() => onCurrentPageChange(currentPage - 1)}
      >
        ← <span className="hidden sm:inline">Previous</span>
      </button>
      {pages[0].key !== '0' && <span>...</span>}
      {pages}
      {openEnded && <span>...</span>}
      <button
        className="link"
        disabled={currentPage === numberOfPages - 1 && !openEnded}
        onClick={() => onCurrentPageChange(currentPage + 1)}
      >
        <span className="hidden sm:inline">Next</span> →
      </button>
    </SpaceBetween>
  );
}

function PageButton({
  isActive,
  page,
  onPageClick,
  isFetching,
}: {
  isActive?: boolean;
  page: number;
  onPageClick: (onPageClick: number) => void;
  isFetching?: boolean;
}) {
  return (
    <button
      className={isActive ? 'primary small' : 'link px-2'}
      onClick={() => onPageClick(page)}
    >
      {isFetching ? <Spinner svgClassName="size-4" /> : page + 1}
    </button>
  );
}
