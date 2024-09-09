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

        {/* Language Filter */}
        <div className="px-6 overflow-y-auto max-h-[calc(100vh-100px)]">
        <div className="py-4">
          <h3 className="text-lg font-semibold">Select Language</h3>
          <div className="grid gap-4 py-2">
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
        </div>

        {/* Project Type Filter */}
        <div className="py-4">
          <h3 className="text-lg font-semibold">Project Type</h3>
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
              Associated with company
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
        </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
