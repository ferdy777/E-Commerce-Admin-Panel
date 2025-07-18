// src/components/common/pagination.tsx
import { useMemo } from "react";
import ChevronIcon from "@/assets/svgs/chevron-arrow-down.svg?react";
import useMedia from "@/hooks/useMedia";

interface Props {
  currentPage: number;
  totalItems: number;
  postsPerPage?: number;
  displayedBtns?: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({
  currentPage,
  totalItems,
  postsPerPage = 10,
  displayedBtns = 5,
  onPageChange,
}: Props) => {
  const { isMobile } = useMedia();

  const highestNumber = useMemo(() => {
    const pages = Math.ceil(totalItems / postsPerPage);
    return pages < 1 ? 1 : pages;
  }, [totalItems, postsPerPage]);

  const mappedBtnsNumbers = useMemo(() => {
    const arr: number[] = [];
    const maxBtns = isMobile ? 3 : displayedBtns;

    let maxLeft = currentPage - Math.floor(maxBtns / 2);
    let maxRight = currentPage + Math.floor(maxBtns / 2);

    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = maxBtns;
    }
    if (maxRight > highestNumber) {
      maxRight = highestNumber;
      maxLeft = highestNumber - (maxBtns - 1);
      if (maxLeft < 1) maxLeft = 1;
    }

    for (let i = maxLeft; i <= maxRight; i++) arr.push(i);
    return arr;
  }, [currentPage, displayedBtns, highestNumber, isMobile]);

  const goTo = (page: number) => {
    if (page < 1 || page > highestNumber) return;
    onPageChange(page);
    // optional scroll
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex items-center justify-center mt-10 bg-neutral-5 p-3 rounded">
      {/* Prev */}
      <button
        className="pagination__prev rounded cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <span className="pagination__nextText">
          <ChevronIcon className="w-[30px] h-[30px] rotate-[90deg]" />
        </span>
      </button>

      {/* First shortcut */}
      {!mappedBtnsNumbers.includes(1) && (
        <>
          <div
            onClick={() => goTo(1)}
            className="pagination__page text-[14px] cursor-pointer py-2 px-4 rounded"
          >
            1
          </div>
          <div className="mx-2 flex items-center space-x-1">
            {[0, 1, 2].map((d) => (
              <span key={d} className="w-[3px] h-[3px] rounded bg-primary/40" />
            ))}
          </div>
        </>
      )}

      {/* Visible page buttons */}
      {mappedBtnsNumbers.map((n) => (
        <div
          key={n}
          onClick={() => goTo(n)}
          className={`pagination__page text-[14px] cursor-pointer py-2 px-4 rounded ${
            n === currentPage ? "bg-primary text-white" : ""
          }`}
          aria-current={n === currentPage ? "page" : undefined}
        >
          {n}
        </div>
      ))}

      {/* Last shortcut */}
      {!mappedBtnsNumbers.includes(highestNumber) && (
        <>
          <div className="mx-2 flex items-center space-x-1">
            {[0, 1, 2].map((d) => (
              <span key={d} className="w-[3px] h-[3px] rounded bg-primary/40" />
            ))}
          </div>
          <div
            onClick={() => goTo(highestNumber)}
            className="pagination__page text-[14px] cursor-pointer py-2 px-4 rounded"
          >
            {highestNumber}
          </div>
        </>
      )}

      {/* Next */}
      <button
        className="pagination__next disabled:opacity-40 disabled:cursor-not-allowed rounded cursor-pointer"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === highestNumber}
      >
        <span className="pagination__nextText">
          <ChevronIcon className="w-[30px] h-[30px] rotate-[-90deg]" />
        </span>
      </button>
    </div>
  );
};

export default Pagination;
