import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
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

export function FilterProject({
  selectedCategories,
  setSelectedCategories,
  selectedTypes,
  setSelectedTypes,
}) {
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

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((item) => item !== type);
      } else {
        return [...prev, type];
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
            Select categories and types to filter projects.
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
                  className="ml-2 text-sm font-medium capitalize"
                >
                  {category}
                </Label>
              </div>
            );
          })}
        </div>

        <div className="pt-2">
          <Checkbox
            id="Associated"
            checked={selectedTypes.includes("associated")}
            onCheckedChange={() => handleTypeChange("associated")}
          />
          <Label
            htmlFor="Associated"
            className="ml-2 text-sm font-medium capitalize"
          >
            Worked with company
          </Label>
        </div>

        <div className="pt-2">
          <Checkbox
            id="PersonalProject"
            checked={selectedTypes.includes("personal")}
            onCheckedChange={() => handleTypeChange("personal")}
          />
          <Label
            htmlFor="PersonalProject"
            className="ml-2 text-sm font-medium capitalize"
          >
            Personal Project
          </Label>
        </div>
      </SheetContent>
    </Sheet>
  );
}
