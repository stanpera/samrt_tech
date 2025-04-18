import { Card, CardTitle } from "./ui/card";
import useCategories from "@/hooks/useCategories";
import LoadingSpinner from "./ui/LoadingSpinner";
import CategoryIcons from "./icons/Mouse";
import SadError from "./icons/sadError";

const CategoryList = () => {
  const { categories, loading, error, errorMessage } = useCategories();

  if (error || loading) {
    return (
      <section className="w-full flex flex-col items-start gap-8 px-10">
        <h2>Categories</h2>
        <div className="w-full flex justify-between">
          {Array.from({ length: 5 }, (_, index) => (
            <Card
              key={index}
              className="justify-center items-center w-[220px] h-[190px] text-icons hover:text-highlights hover:border-highlights hover:scale-105 cursor-pointer border border-special gap-6"
            >
              {(error && <SadError className="size-12 text-special" />) ||
                (loading && <LoadingSpinner />)}
              <CardTitle className="text-center text-xl text-special ">
                {error && errorMessage}
              </CardTitle>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col items-start gap-8 px-10">
      {!loading && (
        <>
          <h2>Categories</h2>
          <div className="w-full flex justify-between">
            {categories?.map((category) => (
              <Card
                key={category.id}
                className="justify-center items-center w-[220px] h-[190px] text-icons hover:text-highlights hover:border-highlights hover:scale-105 cursor-pointer border border-special gap-6"
              >
                <CategoryIcons variant={category.name} />
                <CardTitle className="text-center text-xl ">
                  {category?.name}
                </CardTitle>
              </Card>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default CategoryList;
