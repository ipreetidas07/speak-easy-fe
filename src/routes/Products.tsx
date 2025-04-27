import { Components } from "@components/index";
import { ActivityType } from "@components/Products/RecentActivities";
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { TEST_ROUTES } from "../api/routes/test.routes";
import { PhoneNumber } from "@components/Products/ContatList";

interface Product {
  _id: string;
  name: string;
  description: string;
  initialPitch?: string;
  phoneNumbers?: PhoneNumber[];
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productList, setProductList] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [phoneData, setPhoneData] = useState<Record<string, PhoneNumber[]>>({});
  const [recentActivities, setRecentActivities] = useState<
    Record<string, ActivityType[]>
  >({});
  const [newProductName, setNewProductName] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState<
    { name: string; description: string; pitch: string | undefined }[]
  >([]);
  const [productId, setProductId] = useState<string[] | undefined>();
  const [callInitiated, setCallInitiated] = useState(false);

  const handleCallInitiated = () => {
    setCallInitiated((prev) => !prev);
  };

  useEffect(() => {
    fetchProducts();
  }, [callInitiated]);

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get(TEST_ROUTES.PRODUCTS);
      const companies: Product[] = response?.data?.data?.companies || [];
      console.log(companies);
      if (response.status === 200 && companies.length > 0) {
        setProducts(companies);

        const productNames = companies.map((c) => c.name);
        const productDetails = companies.map((c) => ({
          name: c.name,
          description: c.description,
          pitch: c.initialPitch,
        }));
        setProductId([companies[0]._id]);
        setProductList(productNames);
        setProductDetails(productDetails);

        setProductList(productNames);
        setSelectedProduct(companies[0].name);

        const phoneMap: Record<string, PhoneNumber[]> = {};
        const activityMap: Record<string, ActivityType[]> = {};

        companies.forEach((company) => {
          const productName = company.name;
          const numbers = company.phoneNumbers || [];
          phoneMap[productName] = numbers.map((num) => ({
            name: num.name,
            phoneNumber: num.phoneNumber,
            pitch: num.pitch,
            status: num.status,
            createdAt: new Date(num.createdAt).toISOString().slice(0, 10),
          }));

          activityMap[productName] = numbers.map((num) => ({
            title: num.name,
            description: num.status,
            time: new Date(num.updatedAt || "").toLocaleTimeString(),
            type: num.status,
            number: num.phoneNumber,
          }));
        });

        setPhoneData(phoneMap);
        setRecentActivities(activityMap);
        setIsAddProductModalOpen(false);
      } else {
        setIsAddProductModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAdd = async (entry: {
    name: string;
    phoneNumber: string;
    createdAt: string;
    status: string;
    pitch?: string;
  }) => {
    const selectedProductId = products.find(
      (p) => p.name === selectedProduct
    )?._id;
    if (!selectedProductId) {
      console.error("Product ID not found for selected product.");
      return;
    }
    try {
      await apiClient.post(TEST_ROUTES.ADD_CONTACT, {
        phoneNumber: `+91${entry.phoneNumber}`,
        name: entry.name,
        company: selectedProductId,
      });
      fetchProducts();
    } catch (error) {
      console.error("Failed to add contact via API:", error);
    }
  };

  // const handleUpload = (
  //   entries: {
  //     name: string;
  //     phone: string;
  //     date: string;
  //     status: "New" | "Called";
  //     pitch?: string;
  //   }[]
  // ) => {
  //   setPhoneData((prev) => ({
  //     ...prev,
  //     [selectedProduct]: [
  //       ...(prev[selectedProduct] || []),
  //       ...entries.map((entry) => ({
  //         name: entry.name,
  //         phoneNumber: entry.phone,
  //         pitch: entry.pitch,
  //         status: entry.status,
  //         createdAt: entry.date,
  //       })),
  //     ],
  //   }));
  // };

  const handleSavePitch = async (pitch: string) => {
    try {
      await apiClient.put(`${TEST_ROUTES.UPDATE_PITCH}/${productId}`, {
        initialPitch: pitch,
      });
      console.log("Pitch saved to server!");
    } catch (error) {
      console.error(error);
      console.log("Failed to save pitch");
    }
  };

  const handleAddProduct = async () => {
    if (!newProductName.trim()) return;

    const productName = newProductName.trim();
    const productDescription = newProductDescription.trim();

    try {
      await apiClient.post(TEST_ROUTES.ADD_TOPIC, {
        name: productName,
        description: productDescription || "",
      });

      const updated = [...productList, productName];
      setProductList(updated);
      setSelectedProduct(productName);
      setPhoneData((prev) => ({ ...prev, [productName]: [] }));
      setRecentActivities((prev) => ({ ...prev, [productName]: [] }));

      setNewProductName("");
      setNewProductDescription("");
      setIsAddProductModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <div className="p-6">
      {isAddProductModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pl-48">
          <div className="relative bg-white shadow-2xl rounded-lg p-8 w-[600px] max-w-full flex flex-col">
            {/* Close Icon */}
            <button
              onClick={() => setIsAddProductModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold mb-4">Add Product</h2>

            <input
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              placeholder="Enter product name"
              className="border p-2 w-full rounded mb-4"
            />
            <textarea
              value={newProductDescription}
              onChange={(e) => setNewProductDescription(e.target.value)}
              placeholder="Enter product description"
              className="border p-2 w-full rounded mb-6"
            />
            <div className="flex justify-center">
              <button
                onClick={handleAddProduct}
                className="bg-[#1E293B] text-white px-6 py-2 rounded hover:bg-[#0f172a]"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Cards */}
      {productList.length > 0 && (
        <div className="flex justify-between items-center">
          <div className="grid grid-cols-5 gap-6 justify-between">
            {productDetails.map((product) => (
              <Components.ProductCard
                key={product.name}
                name={product.name}
                isSelected={product.name === selectedProduct}
                onSelect={() => setSelectedProduct(product.name)}
                description={product.description}
              />
            ))}
          </div>

          <div className="flex justify-end">
            <Components.AddProductCard
              onClick={() => setIsAddProductModalOpen(true)}
            />
          </div>
        </div>
      )}

      {/* Contact List */}
      {selectedProduct && (
        <Components.ContactList
          numbers={phoneData[selectedProduct] || []}
          onAdd={handleAdd}
          // onUpload={handleUpload}
          selectedProduct={selectedProduct}
          defaultPitchPerProduct={
            productDetails.find((p) => p.name === selectedProduct)?.pitch
          }
          onSavePitch={handleSavePitch}
          callInitiated={handleCallInitiated}
        />
      )}

      {/* Recent Activities */}
      {selectedProduct && (
        <Components.RecentActivities
          activities={recentActivities[selectedProduct] || []}
        />
      )}
    </div>
  );
};

export default Products;
