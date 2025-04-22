import React from "react";

type ProductCardProps = {
  name: string;
  description?: string;
  isSelected: boolean;
  onSelect: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-white ${
        isSelected && "border-[#1E293B]"
      }`}
    >
      <h3 className="text-lg font-semibold">{name}</h3>
      {description ? (
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
      ) : (
        <p className="text-sm text-gray-500 mt-1">Click to manage phone numbers</p>
      )}
    </div>
  );
};

export default ProductCard;
