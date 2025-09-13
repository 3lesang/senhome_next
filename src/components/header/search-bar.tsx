"use client";

import { Input } from "@/components/ui/input";
import { Search, Star } from "lucide-react";
import React from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Leather Crossbody Bag",
    price: 89.99,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=100",
    category: "Fashion",
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=100",
    category: "Fashion",
  },
  {
    id: "4",
    name: "Classic Sneakers",
    price: 79.99,
    rating: 4.5,
    image:
      "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=100",
    category: "Fashion",
  },
  {
    id: "5",
    name: "Smart Watch Series 5",
    price: 299.99,
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=100",
    category: "Electronics",
  },
  {
    id: "6",
    name: "Minimalist Backpack",
    price: 59.99,
    rating: 4.4,
    image:
      "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=100",
    category: "Fashion",
  },
];

function HeaderSearchBar() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
  const searchRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = sampleProducts
        .filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5); // Limit to 5 suggestions
      setFilteredProducts(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredProducts([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      window.location.href = `/product?search=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  const handleProductClick = (product: Product) => {
    setSearchQuery("");
    setShowSuggestions(false);
    // Navigate to product detail or products page
    window.location.href = `/product?search=${encodeURIComponent(
      product.name
    )}`;
  };

  return (
    <div
      className="hidden md:flex items-center space-x-2 flex-1 max-w-sm mx-4"
      ref={searchRef}
    >
      <div className="relative flex-1">
        <form onSubmit={handleSearchSubmit}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
            className="pl-10 pr-4"
          />
        </form>

        {/* Search Suggestions Dropdown */}
        {showSuggestions && filteredProducts.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
            <div className="p-2">
              <div className="text-xs text-muted-foreground mb-2 px-2">
                Products ({filteredProducts.length})
              </div>
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="w-full flex items-center space-x-3 p-2 hover:bg-accent rounded-md transition-colors text-left"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">
                      {product.name}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {product.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">${product.price}</div>
                </button>
              ))}
            </div>

            {searchQuery.trim() && (
              <div className="border-t border-border p-2">
                <button
                  onClick={handleSearchSubmit}
                  className="w-full flex items-center space-x-2 p-2 hover:bg-accent rounded-md transition-colors text-left text-sm"
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <span>Search for "{searchQuery}"</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* No Results Message */}
        {showSuggestions &&
          searchQuery.length > 0 &&
          filteredProducts.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50">
              <div className="p-4 text-center text-sm text-muted-foreground">
                No products found for "{searchQuery}"
              </div>
              <div className="border-t border-border p-2">
                <button
                  onClick={handleSearchSubmit}
                  className="w-full flex items-center space-x-2 p-2 hover:bg-accent rounded-md transition-colors text-left text-sm"
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <span>Search for "{searchQuery}"</span>
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default HeaderSearchBar;
