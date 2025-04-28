import React, { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";

type ProductCardProps = {
  name: string;
  description?: string;
  isSelected: boolean;
  onSelect: () => void;
  onUpdateProduct: (name:string, description:string) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  isSelected,
  onSelect,
  onUpdateProduct,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={onSelect}
        className={`relative cursor-pointer p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-white ${
          isSelected ? "border-[#1E293B]" : ""
        }`}
      >
        {/* Info Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent selecting the card when clicking the icon
            setIsModalOpen(true);
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <InfoCircleOutlined size={20} />
        </button>

        <h3 className="text-lg font-semibold">{name}</h3>
        {description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <EditProductModal
          name={name}
          description={description}
          onClose={() => setIsModalOpen(false)}
          onSave={(updatedName, updatedDescription) => {
            console.log("Updated:", updatedName, updatedDescription);
            setIsModalOpen(false);
            onUpdateProduct(updatedName, updatedDescription);
          }}
        />
      )}
    </>
  );
};

export default ProductCard;


type EditProductModalProps = {
  name: string;
  description?: string;
  onClose: () => void;
  onSave: (updatedName: string, updatedDescription: string) => void;
};

const EditProductModal: React.FC<EditProductModalProps> = ({
  name,
  description,
  onClose,
  onSave,
}) => {
  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description || "");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg h-2/3 w-[60%] relative">
        <h2 className="text-xl font-semibold mb-4"> Edit Product Info</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full border p-2 rounded"
            rows={10}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(editedName, editedDescription)}
            className="px-4 py-2 bg-[#1E293B] text-white rounded hover:[#1E293B]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

