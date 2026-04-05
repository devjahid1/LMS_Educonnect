"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const ActiveFilters = ({ filter }) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {filter?.categories?.length > 0 &&
        filter.categories.map((category) => (
          <Button
            key={category}
            variant="ghost"
            className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
          >
            {category}
            <X className="w-3" />
          </Button>
        ))}

      {filter?.price?.length > 0 &&
        filter.price.map((price) => (
          <Button
            key={price}
            variant="ghost"
            className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
          >
            {price}
            <X className="w-3" />
          </Button>
        ))}
    </div>
  );
};

export default ActiveFilters;