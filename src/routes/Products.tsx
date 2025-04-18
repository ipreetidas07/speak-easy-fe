import { Components } from "@components/index";
import { ProductsList } from "@enums/index";
import { useState } from "react";

const productList = [
  ProductsList.TILICHO,
  ProductsList.HOTEL_BOOKING,
  ProductsList.EDU_TECH,
];

const initialPhoneData: Record<
  string,
  { name: string; phone: string; date: string; status: "New" | "Called" }[]
> = {
  [ProductsList.TILICHO]: [
    {
      name: "John Doe",
      phone: "+1 234-567-8900",
      date: "2025-04-18",
      status: "New",
    },
  ],
  [ProductsList.HOTEL_BOOKING]: [
    {
      name: "Jane Smith",
      phone: "+1 234-567-8901",
      date: "2025-04-18",
      status: "Called",
    },
  ],
  [ProductsList.EDU_TECH]: [
    {
      name: "Alice Cooper",
      phone: "+1 234-567-8902",
      date: "2025-04-18",
      status: "New",
    },
  ],
};

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>(
    productList[0]
  );
  const [phoneData, setPhoneData] = useState(initialPhoneData);

  const handleAdd = (entry: {
    name: string;
    phone: string;
    date: string;
    status: "New" | "Called";
  }) => {
    setPhoneData((prev) => ({
      ...prev,
      [selectedProduct]: [...prev[selectedProduct], entry],
    }));
  };

  const handleUpload = (entries: any) => {
    setPhoneData((prev) => ({
      ...prev,
      [selectedProduct]: [...prev[selectedProduct], ...entries],
    }));
  };

  return (
    <div className="p-6">
      {/* Products Grid */}
      <div className="grid grid-cols-3 gap-6 justify-between">
        {productList.map((product) => (
          <Components.ProductCard
            key={product}
            name={product}
            isSelected={product === selectedProduct}
            onSelect={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {/* Contact Table */}
      <Components.ContactList
        numbers={phoneData[selectedProduct] || []}
        onAdd={handleAdd}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default Products;
