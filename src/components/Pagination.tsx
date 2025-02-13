import React from 'react';
import { SpaceBetween } from './SpaceBetween';
import { Spinner } from './Spinner';

interface PaginationProps {
  openEnded?: boolean;
  numberOfPages: number;
  currentPage: number;
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
  // new page, 1 until 5
  // on 6, ...2-6...
  // if I click 3, 12345...
  const pageRange = numberOfPages < 5 ? [0, 5] : [];
  return (
    <SpaceBetween direction="horizontal" size="sm" alignOverride="items-center">
      <button
        className="link"
        disabled={currentPage === 0}
        onClick={() => onCurrentPageChange(currentPage - 1)}
      >
        ← Previous
      </button>
      {Array.from(Array(numberOfPages).keys()).map(i => (
        <button
          key={i}
          className={
            currentPage === i && !isFetchingNextPage ? 'primary small' : 'link'
          }
          onClick={() => onCurrentPageChange(i)}
        >
          {i + 1}
        </button>
      ))}
      {isFetchingNextPage && <Spinner className="size-4" />}
      {openEnded && <span>...</span>}
      <button
        className="link"
        disabled={currentPage === numberOfPages - 1 && !openEnded}
        onClick={() => onCurrentPageChange(currentPage + 1)}
      >
        Next →
      </button>
    </SpaceBetween>
  );
}
