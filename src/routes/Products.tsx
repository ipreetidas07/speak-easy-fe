import { Components } from "@components/index";
import { ActivityType } from "@components/Products/RecentActivities";
import { ProductsList } from "@enums/index";
import { useState } from "react";

const productList = [
  ProductsList.TILICHO,
  ProductsList.HOTEL_BOOKING,
  ProductsList.EDU_TECH,
];

const initialPhoneData: Record<
  string,
  {
    name: string;
    phone: string;
    date: string;
    status: "New" | "Called";
    pitch?: string;
  }[]
> = {
  [ProductsList.TILICHO]: [
    {
      name: "John Doe",
      phone: "+1 234-567-8900",
      date: "2025-04-18",
      status: "Called",
      pitch: "Had concerns about pricing but interested in demo.",
    },
    {
      name: "Preeti",
      phone: "123456789",
      date: "2025-04-18",
      status: "Called",
      pitch: "Asked for a callback next week, interested in the product.",
    },
  ],
  [ProductsList.HOTEL_BOOKING]: [
    {
      name: "Jane Smith",
      phone: "+1 234-567-8901",
      date: "2025-04-18",
      status: "Called",
      pitch: "Needs bulk booking for a corporate event.",
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
    pitch?: string;
  }) => {
    setPhoneData((prev) => ({
      ...prev,
      [selectedProduct]: [...prev[selectedProduct], entry],
    }));
  };

  const handleUpload = (
    entries: {
      name: string;
      phone: string;
      date: string;
      status: "New" | "Called";
      pitch?: string;
    }[]
  ) => {
    setPhoneData((prev) => ({
      ...prev,
      [selectedProduct]: [...prev[selectedProduct], ...entries],
    }));
  };

  const initialActivities: Record<string, ActivityType[]> = {
    [ProductsList.TILICHO]: [
      {
        title: "John Doe",
        description: "Failed",
        time: "2 hours ago",
        type: "failed",
        number: "+1 234-567-8900",
      },
      {
        title: "Preeti",
        description: "Success",
        time: "4 hours ago",
        type: "success",
        number: "123456789",
      },
    ],
    [ProductsList.HOTEL_BOOKING]: [
      {
        title: "Jane Smith",
        description: "No Answer",
        time: "4 hours ago",
        type: "no_answer",
        number: "+1 234-567-8901",
      },
    ],
  };

  const [recentActivities, setRecentActivities] = useState(initialActivities);

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
        selectedProduct={selectedProduct}
      />

      {/* Recent Activities */}
      <Components.RecentActivities
        activities={recentActivities[selectedProduct] || []}
      />
    </div>
  );
};

export default Products;
