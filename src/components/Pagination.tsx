import React from 'react';
import { SpaceBetween } from './SpaceBetween';

interface PaginationProps {
  openEnded?: boolean;
  itemsPerPage: number;
  itemCount: number;
  currentPage: number;
  onCurrentPageChange: (page: number) => void;
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
  itemsPerPage,
  itemCount,
  currentPage,
  onCurrentPageChange,
}: PaginationProps) {
  const numberOfPages = itemCount / itemsPerPage;
  return (
    <SpaceBetween direction="horizontal" size="sm">
      <button className="link" disabled={currentPage === 0}>
        ← Previous
      </button>
      {new Array(numberOfPages).fill('').map((_x, i) => (
        <button
          key={i}
          className={currentPage === i ? 'primary small' : 'link'}
        >
          {i + 1}
        </button>
      ))}
      {openEnded && <span>...</span>}
      <button
        className="link"
        disabled={currentPage === numberOfPages - 1 && !openEnded}
      >
        Next →
      </button>
    </SpaceBetween>
  );
}
