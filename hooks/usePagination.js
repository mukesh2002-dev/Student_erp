"use client";
import { useMemo, useState } from "react";

/** Client-side pagination helper. */
export function usePagination(items = [], pageSize = 10) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  return {
    page,
    setPage,
    totalPages,
    pageItems,
    next: () => setPage((p) => Math.min(totalPages, p + 1)),
    prev: () => setPage((p) => Math.max(1, p - 1)),
  };
}
