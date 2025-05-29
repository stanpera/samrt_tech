import { FC, useState } from "react";
import ArrowDown from "../icons/ArrowDown";
import ArrowUp from "../icons/ArrowUp";
import Minus from "../icons/Minus";
import Plus from "../icons/Plus";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Category } from "@/types";

interface OptionsHandlerProps {
  categories: Category[] | undefined;
  isCheckAll: boolean;
  isCheck: string[];
  setIsCheckAll: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCheck: React.Dispatch<React.SetStateAction<Array<string>>>;
  name: string;
}
const OptionsHandler: FC<OptionsHandlerProps> = ({
  categories,
  isCheckAll,
  isCheck,
  setIsCheckAll,
  setIsCheck,
  name,
}) => {
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [isRestCategoriesVisible, setIsRestCategoriesVisible] = useState(false);

  const handleCategories = () => {
    setIsCategoryVisible((prev) => !prev);
  };
  const handleMoreCategories = () => {
    setIsRestCategoriesVisible((prev) => !prev);
  };

  const handleSelectAll = (value: Array<string>) => {
    if (!isCheckAll) {
      setIsCheck(value);
    } else {
      setIsCheck([]);
    }
    setIsCheckAll((prev) => !prev);
  };

  const handleClick = (id: string) => {
    setIsCheck((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setIsCheckAll(false);
  };

  return (
    <div className="flex flex-col px-2.5 gap-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg sm:text-xl font-semibold">{name}</h2>
        {isCategoryVisible ? (
          <Button onClick={handleCategories} variant="icon">
            <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6 hover:text-highlights cursor-pointer" />
          </Button>
        ) : (
          <Button onClick={handleCategories} variant="icon">
            <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 hover:text-highlights cursor-pointer" />
          </Button>
        )}
      </div>
      {isCategoryVisible && (
        <div className="flex flex-col gap-5 px-2 font-medium text-icons">
          <div className="flex items-center gap-4">
            <Checkbox
              id="all"
              name="all"
              onCheckedChange={() =>
                handleSelectAll(categories?.map((cat) => String(cat.id)) || [])
              }
              isChecked={isCheckAll}
            />
            <label htmlFor="all" className="font-medium">
              All
            </label>
          </div>
          {categories?.slice(0, 4).map(({ id, name }) => (
            <div className="flex items-center gap-4" key={id}>
              <Checkbox
                id={id.toString()}
                name={name}
                onCheckedChange={() => handleClick(id.toString())}
                isChecked={isCheck.includes(id.toString())}
              />
              <label htmlFor={id.toString()} className="font-medium">
                {name}
              </label>
            </div>
          ))}
          {isRestCategoriesVisible &&
            categories?.slice(4).map(({ id, name }) => (
              <div className="flex items-center gap-4" key={id}>
                <Checkbox
                  id={id.toString()}
                  name={name}
                  onCheckedChange={() => handleClick(id.toString())}
                  isChecked={isCheck.includes(id.toString())}
                />
                <label htmlFor={id.toString()} className="font-medium">
                  {name}
                </label>
              </div>
            ))}
          {!isRestCategoriesVisible && (
            <Button
              onClick={handleMoreCategories}
              variant="icon"
              size="icon"
              className="items-center flex gap-3.5"
            >
              Load More
              <Plus className="h-5 w-5 hover:text-highlights cursor-pointer" />
            </Button>
          )}
          {isRestCategoriesVisible && (
            <Button
              onClick={handleMoreCategories}
              variant="icon"
              size="icon"
              className="items-center flex gap-3.5"
            >
              Show Less
              <Minus className="h-5 w-5 hover:text-highlights cursor-pointer" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default OptionsHandler;
