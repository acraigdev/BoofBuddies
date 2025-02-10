import React from 'react';

interface PaginationProps {
  openEnded?: boolean;
  itemsPerPage?: number;
  itemCount: number;
  currentPage: number;
  onCurrentPageChange: () => void;
}

/**
 * on general page change, data needs to know range to show, 0-25, 25-50 etc
 * so parent needs to know page size and current page and can do math
 * on previous, if current page 1, disable
 * on next, if openEnded || not last page, next
 * show 5 ... last if not open ended
 * pages clickable
 */

export function Pagination({openEnded}: PaginationProps) {
  return (
    <div>
      <button>Previous</button>
      <button>Next →</button>
    </div>
  );
}
