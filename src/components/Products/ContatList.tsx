import { PhoneOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Badge, Modal, Button, Input, Upload, message, Tooltip } from "antd";
import type { UploadProps } from "antd";
import { useState, useEffect } from "react";
import { ProductsList } from "@enums/index";

type PhoneNumber = {
  name: string;
  phone: string;
  date: string;
  status: "New" | "Called";
  pitch?: string;
};

type Props = {
  numbers: PhoneNumber[];
  onAdd: (entry: PhoneNumber) => void;
  onUpload: (entries: PhoneNumber[]) => void;
  selectedProduct: string;
};

const defaultPitchPerProduct: Record<string, string> = {
  [ProductsList.TILICHO]:
    "At Tilicho Labs, we transform your ideas into exceptional digital products. Our expert team specializes in mobile and web development, delivering scalable and innovative solutions tailored to your business needs.",
  [ProductsList.HOTEL_BOOKING]:
    "Welcome to Hotel Booking. We provide the best deals!",
  [ProductsList.EDU_TECH]:
    "Hello from Edu Tech! Let us help you with your learning goals.",
};

const ContactList: React.FC<Props> = ({
  numbers,
  onAdd,
  onUpload,
  selectedProduct,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });
  const [productPitches, setProductPitches] = useState(defaultPitchPerProduct);
  const [editedPitch, setEditedPitch] = useState(
    productPitches[selectedProduct]
  );

  useEffect(() => {
    setEditedPitch(productPitches[selectedProduct]);
  }, [selectedProduct, productPitches]);

  const handleAdd = () => {
    if (!newContact.name || !newContact.phone) {
      message.warning("Please enter both name and phone number");
      return;
    }

    const entry: PhoneNumber = {
      ...newContact,
      date: new Date().toISOString().slice(0, 10),
      status: "New",
      pitch: productPitches[selectedProduct],
    };

    onAdd(entry);
    setNewContact({ name: "", phone: "" });
    setIsModalOpen(false);
  };

  const handleCSVUpload: UploadProps["customRequest"] = async ({
    file,
    onSuccess,
    onError,
  }) => {
    try {
      const text = await (file as File).text();
      const rows = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      const newEntries: PhoneNumber[] = rows.map((row) => {
        const [name, phone] = row.split(",");
        return {
          name: name.trim(),
          phone: phone.trim(),
          date: new Date().toISOString().slice(0, 10),
          status: "New",
          pitch: productPitches[selectedProduct],
        };
      });

      onUpload(newEntries);
      message.success("Contacts uploaded successfully");
      onSuccess?.(undefined, {} as any);
    } catch (err) {
      console.error(err);
      message.error("Upload failed");
      onError?.(new Error("Upload failed"));
    }
  };

  const handlePitchChange = (value: string) => {
    setEditedPitch(value);
  };

  const handleSavePitch = () => {
    setProductPitches({
      ...productPitches,
      [selectedProduct]: editedPitch,
    });
    message.success("Pitch updated successfully");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-1 text-lg">
          Default Pitch for {selectedProduct}
        </label>
        <div className="flex items-center gap-2">
          <Input.TextArea
            value={editedPitch}
            onChange={(e) => handlePitchChange(e.target.value)}
            autoSize={{ minRows: 2, maxRows: 4 }}
            placeholder="Enter the default pitch for this product"
            className="w-full mb-2"
            style={{ borderColor: "#334155" }}
          />
          <Button
            type="primary"
            onClick={handleSavePitch}
            style={{ backgroundColor: "#334155", color: "white" }}
          >
            Save Pitch
          </Button>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Upload Phone Numbers</h2>
        <div className="flex gap-2">
          <Button
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            style={{ backgroundColor: "#334155", color: "white" }}
          >
            Add Number
          </Button>
          <Upload
            accept=".csv"
            showUploadList={false}
            customRequest={handleCSVUpload}
          >
            <Button
              icon={<UploadOutlined />}
              style={{ backgroundColor: "#334155", color: "white" }}
            >
              Upload CSV
            </Button>
          </Upload>
        </div>
      </div>

      <table className="w-full text-sm table-fixed">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="py-2 w-[160px]">Name</th>
            <th className="w-[140px]">Phone Number</th>
            <th className="w-[120px]">Upload Date</th>
            <th className="w-[100px]">Status</th>
            <th className="w-[320px]">Pitch</th>
            <th className="w-[50px] text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {numbers.map((entry, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="py-2 truncate">{entry.name}</td>
              <td className="truncate">{entry.phone}</td>
              <td className="truncate">{entry.date}</td>
              <td>
                <Badge
                  status={entry.status === "New" ? "processing" : "default"}
                  text={entry.status}
                />
              </td>
              <td className="truncate">
                {entry.pitch || productPitches[selectedProduct]}
              </td>
              <td className="text-center">
                <Tooltip title="Call">
                  <PhoneOutlined style={{ color: "green" }} />
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        title="Add Phone Number"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAdd}
        okText="Add"
      >
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Name"
            value={newContact.name}
            onChange={(e) =>
              setNewContact({ ...newContact, name: e.target.value })
            }
            style={{ borderColor: "#334155" }}
          />
          <Input
            placeholder="Phone"
            value={newContact.phone}
            onChange={(e) =>
              setNewContact({ ...newContact, phone: e.target.value })
            }
            style={{ borderColor: "#334155" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ContactList;
