"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { useProductsContext } from "@/context/ProductProvider";
import { Skeleton } from "../ui/skeleton";

const SortProducts: React.FC = () => {
  const { loading, error, limit, sortOrder, setPage, setLimit, setSortOrder } =
    useProductsContext();

  const handleSortOrder = (value: string) => {
    setSortOrder(value);
    setPage(0);
  };

  const handleLimit = (value: string) => {
    setLimit(parseInt(value));
    setPage(0);
  };

  if (loading) {
    return <Skeleton className="h-9 w-[450px]" />;
  }

  if (error) {
    return;
  }

  return (
    <div className="flex gap-5 sm:gap-15 justify-center sm:justify-start">
      <div className="flex flex-col sm:flex-row gap-4">
        <Label className="text-xl">Sort by</Label>
        <Select
          value={sortOrder}
          onValueChange={(value) => handleSortOrder(value)}
        >
          <SelectTrigger className="w-[126px] border-special text-sm text-icons bg-cards">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="price_asc">Lowest Price First</SelectItem>
              <SelectItem value="price_desc">Highest Price First</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Label className="text-xl">Show</Label>
        <Select
          value={String(limit)}
          onValueChange={(value) => handleLimit(value)}
        >
          <SelectTrigger className="w-[102px] text-sm text-icons bg-cards border-special">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <>
                {Array.from({ length: 10 }, (_, i) => (i + 1) * 3).map(
                  (value) => (
                    <SelectItem key={value} value={value.toString()}>
                      {value}
                    </SelectItem>
                  )
                )}
              </>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SortProducts;
