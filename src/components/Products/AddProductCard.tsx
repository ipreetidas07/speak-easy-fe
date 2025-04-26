import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

type AddProductCardProps = {
  onClick: () => void;
};

const AddProductCard: React.FC<AddProductCardProps> = ({ onClick }) => {
  return (
    <Tooltip title="Add Product">
      <div
        onClick={onClick}
        className="flex items-center justify-center w-[20px] h-[20px] border border-dashed border-gray-400 rounded-full bg-[#1E293B] shadow hover:shadow-md cursor-pointer transition p-4 aspect-square"
      >
        <PlusOutlined className="text-2xl text-white" />
      </div>
    </Tooltip>
  );
};

export default AddProductCard;
