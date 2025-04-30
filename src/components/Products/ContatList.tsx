import { EyeOutlined, PhoneOutlined, PlusOutlined } from "@ant-design/icons";
import { Badge, Modal, Button, Input, message, Tooltip } from "antd";
import { useState, useEffect } from "react";
import SessionList from "./SessionList";
import { CallStatus, CallType } from "./CallStatus";
import { TEST_ROUTES } from "../../api/routes/test.routes";
import apiClient from "../../api/apiClient";
import { removeCountryCode } from "../../utils/DateUtils";

export type PhoneNumber = {
  updatedAt?: string | number | Date;
  name: string;
  phoneNumber: string;
  createdAt: string;
  status: string;
  pitch?: string;
  intent?: string;
};

type Props = {
  numbers: PhoneNumber[];
  onAdd: (entry: PhoneNumber) => void;
  // onUpload: (entries: PhoneNumber[]) => void;
  selectedProduct: string;
  defaultPitchPerProduct?: string | undefined;
  onSavePitch: (pitch: string) => void;
  handleCallCard: () => void;
};

const ContactList: React.FC<Props> = ({
  numbers,
  onAdd,
  // onUpload,
  selectedProduct,
  defaultPitchPerProduct,
  onSavePitch,
  handleCallCard,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phoneNumber: "" });
  const [editedPitch, setEditedPitch] = useState(defaultPitchPerProduct || "");
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [selectedPhoneNumber, setSelectedPhoneNumber] =
    useState<PhoneNumber | null>(null);
  const [selectedSessions, setSelectedSessions] = useState<any[]>([]);
  const [currentCall, setCurrentCall] = useState<{
    name: string;
    phone: string;
    status: CallType;
    duration: string;
  } | null>(null);

  useEffect(() => {
    setEditedPitch(defaultPitchPerProduct || "");
  }, [defaultPitchPerProduct]);

  const handleAdd = () => {
    if (!newContact.name || !newContact.phoneNumber) {
      message.warning("Please enter both name and phone number");
      return;
    }

    const entry: PhoneNumber = {
      ...newContact,
      createdAt: new Date().toISOString().slice(0, 10),
      status: "New",
      pitch: "",
    };

    onAdd(entry);
    setNewContact({ name: "", phoneNumber: "" });
    setIsModalOpen(false);
  };

  // const handleCSVUpload: UploadProps["customRequest"] = async ({
  //   file,
  //   onSuccess,
  //   onError,
  // }) => {
  //   try {
  //     const text = await (file as File).text();
  //     const rows = text
  //       .split("\n")
  //       .map((line) => line.trim())
  //       .filter(Boolean);
  //     const newEntries: PhoneNumber[] = rows.map((row) => {
  //       const [name, phoneNumber] = row.split(",");
  //       return {
  //         name: name.trim(),
  //         phoneNumber: phoneNumber.trim(),
  //         createdAt: new Date().toISOString().slice(0, 10),
  //         status: "New",
  //         pitch: "",
  //       };
  //     });

  //     onUpload(newEntries);
  //     message.success("Contacts uploaded successfully");
  //     onSuccess?.(undefined, {} as any);
  //   } catch (err) {
  //     console.error(err);
  //     message.error("Upload failed");
  //     onError?.(new Error("Upload failed"));
  //   }
  // };

  const handlePitchChange = (value: string) => {
    setEditedPitch(value);
  };

  const handleSavePitch = () => {
    if (editedPitch.trim() === "") {
      message.warning("Pitch cannot be empty");
      return;
    }

    onSavePitch(editedPitch); // <- inform parent
    message.success("Pitch updated successfully");
  };

  const FINAL_STATUSES = ["completed", "no-answer", "busy"];

  const initiateCall = async (entry: PhoneNumber) => {
    try {
      setCurrentCall({
        name: entry.name,
        phone: entry.phoneNumber,
        status: "initiated",
        duration: "0+",
      });

      const response = await apiClient.post(TEST_ROUTES.MAKE_CALL, {
        phoneNumber: entry.phoneNumber,
        message: editedPitch,
      });

      if (response.status === 200) {
        const callSid = response.data.callSid;

        const pollStatus = async () => {
          try {
            const statusRes = await apiClient.get(
              `${TEST_ROUTES.CALL_STATUS}?callSid=${callSid}`
            );

            if (statusRes.status === 200 && statusRes.data.success) {
              const { status, name, phoneNumber, duration } = statusRes.data;

              setCurrentCall({
                name,
                phone: phoneNumber,
                status,
                duration,
              });

              if (!FINAL_STATUSES.includes(status)) {
                setTimeout(pollStatus, 1000);
              }
            } else {
              console.error("Error fetching call status", statusRes.status);
            }
          } catch (err) {
            console.error("Polling error:", err);
          }
        };

        setTimeout(pollStatus, 1000);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (err) {
      console.error("Error making the call:", err);
      message.error("Failed to initiate the call");
    }
  };

  const handleGetSessions = async (phoneNumber: string) => {
    try {
      const statusRes = await apiClient.get(TEST_ROUTES.GET_SESSIONS);
      if (statusRes.status === 200) {
        const sessions = statusRes.data; // your array

        const filteredSessions = sessions.filter(
          (session: any) => session.phoneNumber === phoneNumber
        );

        const formattedSessions = filteredSessions.map((session: any) => ({
          id: session._id,
          date: new Date(session.createdAt).toISOString().split("T")[0], // YYYY-MM-DD
          status:
            session.status.charAt(0).toUpperCase() + session.status.slice(1), // capitalize
          duration: formatDuration(session.duration), // we'll define this
          conversation: session.messages.map((msg: any) => ({
            speaker: msg.messageFrom === "bot" ? "Bot" : "Customer",
            message: msg.content,
          })),
          summary: session.summary,
        }));

        setSelectedSessions(formattedSessions);
        setIsSessionModalOpen(true);
      } else {
        console.error("Error fetching call sessions", statusRes.status);
      }
    } catch (err) {
      console.error("Polling error:", err);
    }
  };

  const formatDuration = (durationInSeconds: string) => {
    const totalSeconds = parseInt(durationInSeconds, 10);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
      <div className="mb-6">
        <label className="block mb-1 text-lg font-semibold">
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
          {/* <Upload
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
          </Upload> */}
        </div>
      </div>

      {numbers.length > 0 && (
        <div className="w-full h-36 overflow-y-scroll">
          <table className="w-full text-sm table-fixed">
            <thead className="table-fixed">
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2 w-[100px]">Name</th>
                <th className="w-[100px]">Phone Number</th>
                <th className="w-[120px]">Upload Date</th>
                <th className="w-[100px]">Status</th>
                <th className="w-[80px]">Intent</th>
                <th className="w-[320px]">Pitch</th>
                <th className="w-[50px] text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {numbers.map((entry, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-2 truncate">{entry.name}</td>
                  <td className="truncate">
                    {removeCountryCode(entry.phoneNumber)}
                  </td>
                  <td className="truncate">{entry.createdAt}</td>
                  <td className="font-semibold">
                    <Badge
                      status={
                        entry.status.toLowerCase() === "new"
                          ? "processing"
                          : entry.status.toLowerCase() === "busy" ||
                            entry.status.toLowerCase() === "no-answer"
                          ? "warning"
                          : "success"
                      }
                      text={capitalizeFirstLetter(entry?.status)}
                    />
                  </td>
                  <td className="font-semibold">
                    {entry.intent ? (
                      entry.intent.toLowerCase() == "interested" ||
                      entry.intent.toLowerCase() == "positive" ? (
                        <>👍 {"Interested"} </>
                      ) : entry.intent.toLowerCase() == "not_interested" ||
                        entry.intent.toLowerCase() == "negative" ? (
                        <>👎 {"Not Interested"}</>
                      ) : (
                        <>😐 {"Neutral"}</>
                      )
                    ) : (
                      <>-</>
                    )}
                  </td>
                  <td className="truncate">
                    <Tooltip title={entry.pitch || editedPitch}>
                      {entry.pitch || editedPitch}
                    </Tooltip>
                  </td>
                  <td className="text-center">
                    <Tooltip title="Call">
                      <PhoneOutlined
                        className="cursor-pointer mr-3"
                        style={{ color: "green" }}
                        onClick={() => initiateCall(entry)}
                      />
                    </Tooltip>
                    <Tooltip title="View Sessions">
                      <EyeOutlined
                        className="cursor-pointer"
                        style={{ color: "#1d4ed8" }}
                        onClick={() => {
                          setSelectedPhoneNumber(entry);
                          handleGetSessions(entry.phoneNumber); // pass the phone number here
                        }}
                      />
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
            value={newContact.phoneNumber}
            onChange={(e) =>
              setNewContact({ ...newContact, phoneNumber: e.target.value })
            }
            style={{ borderColor: "#334155" }}
          />
        </div>
      </Modal>

      {selectedPhoneNumber && (
        <SessionList
          sessions={selectedSessions}
          isOpen={isSessionModalOpen}
          onClose={() => setIsSessionModalOpen(false)}
          phoneNumber={selectedPhoneNumber.createdAt}
          contactName={selectedPhoneNumber.name}
        />
      )}

      {currentCall && (
        <CallStatus
          name={currentCall.name}
          phone={currentCall.phone}
          callType={currentCall.status}
          duration={currentCall.duration}
          onClose={() => {
            handleCallCard();
            setCurrentCall(null);
          }}
        />
      )}
    </div>
  );
};

export default ContactList;
