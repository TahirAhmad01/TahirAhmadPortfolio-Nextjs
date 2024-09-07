import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const categories = [
  "html",
  "ruby",
  "rails",
  "bootstrap",
  "jquery",
  "javascript",
  "react",
  "next",
  "tailwind",
];

export function FilterProject({ selectedCategories, setSelectedCategories }) {
  const handleCategoryChange = (category) => {
    const lowerCaseCategory = category.toLowerCase();
    setSelectedCategories((prev) =>
      prev.includes(lowerCaseCategory)
        ? prev.filter((item) => item !== lowerCaseCategory)
        : [...prev, lowerCaseCategory]
    );
  };
  

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Filter</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Projects</SheetTitle>
          <SheetDescription>
            Select categories to filter projects.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {categories.map((category) => {
            const lowerCaseCategory = category.toLowerCase();
            return (
              <div className="flex items-center" key={category}>
                <input
                  type="checkbox"
                  id={category}
                  checked={selectedCategories.includes(lowerCaseCategory)}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2"
                />
                <Label htmlFor={category}>{category}</Label>
              </div>
            );
          })}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Apply Filters</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
