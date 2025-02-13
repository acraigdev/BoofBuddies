import React from 'react';
import { SpaceBetween } from './SpaceBetween';
import { Spinner } from './Spinner';

interface PaginationProps {
  openEnded?: boolean;
  numberOfPages: number; // 1-index
  currentPage: number; // 0-index
  onCurrentPageChange: (page: number) => void;
  isFetchingNextPage?: boolean;
}

/**
 * on general page change, data needs to know range to show, 0-25, 25-50 etc
 * so parent needs to know page size and current page and can do math
 * on previous, if current page 1, disable
 * on next, if openEnded || not last page, next
 * show 5 ... last if not open ended
 * pages clickable
 */

export function Pagination({
  openEnded,
  numberOfPages,
  currentPage,
  onCurrentPageChange,
  isFetchingNextPage,
}: PaginationProps) {
  const buildPages = () => {
    const pageButtons = [];
    // if the current page is within the last 3 elements, work backwards
    // otherwise, keep selection as close to mid as possible
    const start =
      numberOfPages - 1 - currentPage <= 2
        ? numberOfPages - 5
        : currentPage - 2;
    for (let i = start; i <= numberOfPages - 1; i++) {
      // No more than 5 pages
      if (pageButtons.length === 5) break;
      if (i < 0) continue;
      pageButtons.push(
        <PageButton
          key={i}
          page={i}
          isActive={i === currentPage && !isFetchingNextPage}
          onPageClick={onCurrentPageChange}
        />,
      );
    }
    return pageButtons;
  };
  return (
    <SpaceBetween direction="horizontal" size="m" alignOverride="items-center">
      <button
        className="link"
        disabled={currentPage === 0}
        onClick={() => onCurrentPageChange(currentPage - 1)}
      >
        ← <span className="hidden sm:inline">Previous</span>
      </button>
      {buildPages()}
      {isFetchingNextPage && <Spinner svgClassName="size-4" />}
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
}: {
  isActive?: boolean;
  page: number;
  onPageClick: (onPageClick: number) => void;
}) {
  return (
    <button
      className={isActive ? 'primary small' : 'link'}
      onClick={() => onPageClick(page)}
    >
      {page + 1}
    </button>
  );
}
