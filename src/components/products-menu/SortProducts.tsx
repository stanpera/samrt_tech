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

const SortProducts: React.FC = () => {
  const { error, limit, sortOrder, setPage, setLimit, setSortOrder } =
    useProductsContext();

  const handleSortOrder = (value: string) => {
    setSortOrder(value);
    setPage(0);
  };

  const handleLimit = (value: string) => {
    setLimit(parseInt(value));
    setPage(0);
  };

  if (error) {
    return;
  }

  return (
    <div className="flex gap-5 lg:gap-15 self-center lg:self-auto lg:justify-start">
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
        <Label className="text-lg sm:text-xl">Sort by</Label>
        <Select
          value={sortOrder}
          onValueChange={(value) => handleSortOrder(value)}
        >
          <SelectTrigger className="w-auto gap-2 px-2 border-special text-sm text-icons bg-cards">
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
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
        <Label className="text-lg lg:text-xl">Show</Label>
        <Select
          value={String(limit)}
          onValueChange={(value) => handleLimit(value)}
        >
          <SelectTrigger className="w-[102px] text-sm text-icons bg-cards border-special">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">30</SelectItem>
                <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SortProducts;
