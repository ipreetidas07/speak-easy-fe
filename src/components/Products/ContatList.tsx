import { PhoneOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Badge, Modal, Button, Input, Upload, message } from "antd";
import type { UploadProps } from "antd";
import { useState } from "react";

type PhoneNumber = {
  name: string;
  phone: string;
  date: string;
  status: "New" | "Called";
};

type Props = {
  numbers: PhoneNumber[];
  onAdd: (entry: PhoneNumber) => void;
  onUpload: (entries: PhoneNumber[]) => void;
};

const ContactList: React.FC<Props> = ({ numbers, onAdd, onUpload }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });

  const handleAdd = () => {
    if (!newContact.name || !newContact.phone) {
      message.warning("Please enter both name and phone number");
      return;
    }

    const entry: PhoneNumber = {
      ...newContact,
      date: new Date().toISOString().slice(0, 10),
      status: "New",
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

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-md font-semibold">Upload Phone Numbers</h2>
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
            <th className="py-2 w-[180px]">Name</th>
            <th className="w-[160px]">Phone Number</th>
            <th className="w-[140px]">Upload Date</th>
            <th className="w-[120px]">Status</th>
            <th className="w-[80px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {numbers.map((entry, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="py-2 w-[180px] truncate">{entry.name}</td>
              <td className="w-[160px] truncate">{entry.phone}</td>
              <td className="w-[140px] truncate">{entry.date}</td>
              <td className="w-[120px]">
                <Badge
                  status={entry.status === "New" ? "processing" : "default"}
                  text={entry.status}
                />
              </td>
              <td className="w-[80px]">
                <PhoneOutlined style={{ color: "green" }} />
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
          />
          <Input
            placeholder="Phone"
            value={newContact.phone}
            onChange={(e) =>
              setNewContact({ ...newContact, phone: e.target.value })
            }
          />
        </div>
      </Modal>
    </div>
  );
};

export default ContactList;
