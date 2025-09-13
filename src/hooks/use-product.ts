import { Product } from "@/types/product";
import { useState } from "react";

// Mock product data
const mockProduct = {
  id: "1",
  name: "Wireless Bluetooth Headphones",
  price: 99.99,
  originalPrice: 129.99,
  description: "Premium noise-cancelling headphones with 30-hour battery life",
  longDescription:
    "Experience superior sound quality with these premium wireless headphones. Featuring advanced noise-cancelling technology, these headphones deliver crystal-clear audio while blocking out unwanted ambient noise. With an impressive 30-hour battery life, you can enjoy uninterrupted music, calls, and entertainment throughout your day.",
  images: [
    "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1649772/pexels-photo-1649772.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  category: "Electronics",
  brand: "AudioTech",
  rating: 4.5,
  reviewCount: 1247,
  inStock: true,
  stockCount: 15,
  variants: {
    colors: [
      { name: "Midnight Black", value: "black" },
      { name: "Pearl White", value: "white" },
      { name: "Rose Gold", value: "rose-gold" },
    ],
    sizes: [
      { name: "Standard", value: "standard", available: true },
      { name: "Large", value: "large", available: true },
    ],
  },
  features: [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Quick charge: 5 min = 3 hours",
    "Bluetooth 5.0 connectivity",
    "Built-in microphone",
    "Foldable design",
  ],
  specifications: {
    "Driver Size": "40mm",
    "Frequency Response": "20Hz - 20kHz",
    Impedance: "32 Ohm",
    Weight: "250g",
    "Charging Time": "2 hours",
    Connectivity: "Bluetooth 5.0, 3.5mm jack",
  },
  tags: ["wireless", "noise-cancelling", "premium", "long-battery"],
  image: "",
  badge: "",
};

export function useProduct(productId: string) {
  const [product] = useState();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [quantity, setQuantity] = useState(1);

  return {
    product,
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    setQuantity,
  };
}
