import { useState } from "react";

export function useProduct() {
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
