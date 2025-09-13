import { Search, SlidersHorizontal, X } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface FilterState {
  search: string;
  category: string;
  priceRange: string;
  rating: string;
  sortBy: string;
  inStock: boolean;
  onSale: boolean;
}

interface ProductFiltersProps {
  filters?: FilterState;
  onFiltersChange?: (filters: FilterState) => void;
  onClearFilters?: () => void;
  categories?: string[];
  isOpen?: boolean;
  onToggle?: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters = { search: "" },
  onClearFilters,
  categories = [],
  isOpen,
  onToggle,
}) => {
  const handleFilterChange = () => {};

  const priceRanges = [
    { label: "All Prices", value: "all-prices" },
    { label: "Under $25", value: "0-25" },
    { label: "$25 - $50", value: "25-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "Over $200", value: "200+" },
  ];

  const ratingOptions = [
    { label: "All Ratings", value: "all-ratings" },
    { label: "4+ Stars", value: "4" },
    { label: "3+ Stars", value: "3" },
    { label: "2+ Stars", value: "2" },
    { label: "1+ Stars", value: "1" },
  ];

  const sortOptions = [
    { label: "Featured", value: "featured" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Customer Rating", value: "rating" },
    { label: "Newest First", value: "newest" },
    { label: "Best Selling", value: "bestselling" },
  ];

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full justify-center"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters & Sort
        </Button>
      </div>

      {/* Filters Panel */}
      <div className={`${isOpen ? "block" : "hidden"} lg:block`}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Filters</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="mr-1 h-3 w-3" />
                Clear
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search">Search Products</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={() => handleFilterChange()}
                  className="pl-10"
                />
              </div>
            </div>

            <Separator />

            {/* Sort By */}
            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Price Range */}
            <div className="space-y-2">
              <Label>Price Range</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Rating */}
            <div className="space-y-2">
              <Label>Customer Rating</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Ratings" />
                </SelectTrigger>
                <SelectContent>
                  {ratingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Additional Filters */}
            <div className="space-y-3">
              <Label>Additional Filters</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="inStock" />
                  <Label htmlFor="inStock" className="text-sm font-normal">
                    In Stock Only
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="onSale" />
                  <Label htmlFor="onSale" className="text-sm font-normal">
                    On Sale
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
