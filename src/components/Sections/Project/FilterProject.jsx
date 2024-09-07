import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
    setSelectedCategories((prev) => {
      if (prev.includes(lowerCaseCategory)) {
        return prev.filter((item) => item !== lowerCaseCategory);
      } else {
        return [...prev, lowerCaseCategory];
      }
    });
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
            const isChecked = selectedCategories.includes(lowerCaseCategory);

            return (
              <div className="flex items-center" key={lowerCaseCategory}>
                <Checkbox
                  id={lowerCaseCategory}
                  checked={isChecked}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label
                  htmlFor={lowerCaseCategory}
                  className="ml-2 text-sm font-medium"
                >
                  {category}
                </Label>
              </div>
            );
          })}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" onClick={() => {}}>
              Apply Filters
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
