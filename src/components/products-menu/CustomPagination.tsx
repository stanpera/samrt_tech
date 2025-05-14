import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
  maxPages: number;
  page: number;
  handlePaginationPage: (page: number) => void;
  handlePreviousPagination: () => void;
  handleNextPagination: () => void;
}

function CustomPagination({
  maxPages,
  page,
  handlePaginationPage,
  handlePreviousPagination,
  handleNextPagination,
}: CustomPaginationProps) {
  const renderPageNumbers = () => {
    const pages = [];

    pages.push(
      <PaginationItem
        key={0}
        className={page === 0 ? "text-highlights" : "text-icons"}
      >
        <PaginationLink href="#" onClick={() => handlePaginationPage(0)}>
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (page > 2) {
      pages.push(<PaginationEllipsis key="start-ellipsis" />);
    }

    const startPage = Math.max(1, page - 1);
    const endPage = Math.min(startPage + 2, maxPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem
          key={i}
          className={page === i ? "text-highlights" : "text-icons"}
        >
          <PaginationLink href="#" onClick={() => handlePaginationPage(i)}>
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (page < maxPages - 2) {
      pages.push(<PaginationEllipsis key="end-ellipsis" />);
    }

    if (maxPages > 0) {
      pages.push(
        <PaginationItem
          key={maxPages}
          className={page === maxPages ? "text-highlights" : "text-icons"}
        >
          <PaginationLink
            href="#"
            onClick={() => handlePaginationPage(maxPages)}
          >
            {maxPages + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent className="flex flex-col sm:flex-row justify-between w-full">
        <div className="flex">{renderPageNumbers()}</div>
        <div className="flex gap-8">
          <PaginationItem
            className={`text-icons border rounded-md border-icons hover:border-highlights ${
              page === 0 ? "pointer-events-none opacity-50" : ""
            }`}
            onClick={handlePreviousPagination}
          >
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem
            className={`border text-icons rounded-md border-icons hover:border-highlights ${
              page === maxPages ? "pointer-events-none opacity-50" : ""
            }`}
            onClick={handleNextPagination}
          >
            <PaginationNext href="#" />
          </PaginationItem>
        </div>
      </PaginationContent>
    </Pagination>
  );
}

export default CustomPagination;
