import { Components } from "@components/index";
import { useState } from "react";
import { Button, Modal, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PhoneNumber } from "@components/Products/ContactList";

// Initial data structure for topics and companies
const initialTopicsData = [
  {
    id: "1",
    name: "Technology",
    companies: [
      {
        id: "1-1",
        name: "Apple",
        description: "Multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services.",
        phoneNumbers: [
          { name: "Sales", phone: "+1 800-275-2273", date: "2023-05-10", status: "New" },
          { name: "Support", phone: "+1 800-694-7466", date: "2023-05-12", status: "Called" },
        ],
      },
      {
        id: "1-2",
        name: "Microsoft",
        description: "Multinational technology corporation that produces computer software, consumer electronics, personal computers, and related services.",
        phoneNumbers: [
          { name: "Customer Service", phone: "+1 800-642-7676", date: "2023-05-15", status: "New" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Healthcare",
    companies: [
      {
        id: "2-1",
        name: "Mayo Clinic",
        description: "Nonprofit American academic medical center focused on integrated health care, education, and research.",
        phoneNumbers: [
          { name: "Appointment", phone: "+1 507-284-2511", date: "2023-05-20", status: "New" },
        ],
      },
    ],
  },
];

const Topics = () => {
  const [topicsData, setTopicsData] = useState(initialTopicsData);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(initialTopicsData[0]?.id || null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyDescription, setNewCompanyDescription] = useState("");

  // Get the selected topic object
  const currentTopic = topicsData.find(topic => topic.id === selectedTopic);
  
  // Get the selected company object
  const currentCompany = currentTopic?.companies.find(company => company.id === selectedCompany);

  // Handle adding a new topic
  const handleAddTopic = () => {
    if (!newTopicName.trim()) {
      message.warning("Please enter a topic name");
      return;
    }

    const newTopic = {
      id: `${Date.now()}`,
      name: newTopicName.trim(),
      companies: [],
    };

    setTopicsData([...topicsData, newTopic]);
    setNewTopicName("");
    setIsAddTopicModalOpen(false);
    message.success("Topic added successfully");
  };

  // Handle adding a new company to the selected topic
  const handleAddCompany = () => {
    if (!newCompanyName.trim() || !selectedTopic) {
      message.warning("Please enter a company name and select a topic");
      return;
    }

    const newCompany = {
      id: `${selectedTopic}-${Date.now()}`,
      name: newCompanyName.trim(),
      description: newCompanyDescription.trim(),
      phoneNumbers: [],
    };

    setTopicsData(topicsData.map(topic => {
      if (topic.id === selectedTopic) {
        return {
          ...topic,
          companies: [...topic.companies, newCompany],
        };
      }
      return topic;
    }));

    setNewCompanyName("");
    setNewCompanyDescription("");
    setIsAddCompanyModalOpen(false);
    message.success("Company added successfully");
  };

  // Handle adding a new phone number to the selected company
  const handleAddPhoneNumber = (entry: { name: string; phone: string; date: string; status: "New" | "Called" }) => {
    if (!selectedTopic || !selectedCompany) {
      message.warning("Please select a topic and company first");
      return;
    }

    setTopicsData(topicsData.map(topic => {
      if (topic.id === selectedTopic) {
        return {
          ...topic,
          companies: topic.companies.map(company => {
            if (company.id === selectedCompany) {
              return {
                ...company,
                phoneNumbers: [...company.phoneNumbers, entry],
              };
            }
            return company;
          }),
        };
      }
      return topic;
    }));
  };

  // Handle uploading multiple phone numbers
  const handleUploadPhoneNumbers = (entries: { name: string; phone: string; date: string; status: "New" | "Called" }[]) => {
    if (!selectedTopic || !selectedCompany) {
      message.warning("Please select a topic and company first");
      return;
    }

    setTopicsData(topicsData.map(topic => {
      if (topic.id === selectedTopic) {
        return {
          ...topic,
          companies: topic.companies.map(company => {
            if (company.id === selectedCompany) {
              return {
                ...company,
                phoneNumbers: [...company.phoneNumbers, ...entries],
              };
            }
            return company;
          }),
        };
      }
      return topic;
    }));
  };

  return (
    <div className="p-6">
      {/* Topics Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Topics</h2>
          <Button 
            icon={<PlusOutlined />} 
            onClick={() => setIsAddTopicModalOpen(true)}
            style={{ backgroundColor: "#334155", color: "white" }}
          >
            Add Topic
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-6 justify-between">
          {topicsData.map((topic) => (
            <Components.ProductCard
              key={topic.id}
              name={topic.name}
              isSelected={topic.id === selectedTopic}
              onSelect={() => {
                setSelectedTopic(topic.id);
                setSelectedCompany(null); // Reset selected company when topic changes
              }}
            />
          ))}
        </div>
      </div>

      {/* Companies Section - Only show if a topic is selected */}
      {selectedTopic && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Companies for {currentTopic?.name}</h2>
            <Button 
              icon={<PlusOutlined />} 
              onClick={() => setIsAddCompanyModalOpen(true)}
              style={{ backgroundColor: "#334155", color: "white" }}
            >
              Add Company
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-6 justify-between">
            {currentTopic?.companies.map((company) => (
              <Components.ProductCard
                key={company.id}
                name={company.name}
                description={company.description}
                isSelected={company.id === selectedCompany}
                onSelect={() => setSelectedCompany(company.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Phone Numbers Section - Only show if a company is selected */}
      {selectedTopic && selectedCompany && currentCompany && (
        <Components.ContactList
          numbers={currentCompany.phoneNumbers || []}
          onAdd={handleAddPhoneNumber}
          onUpload={handleUploadPhoneNumbers}
        />
      )}

      {/* Add Topic Modal */}
      <Modal
        title="Add New Topic"
        open={isAddTopicModalOpen}
        onCancel={() => setIsAddTopicModalOpen(false)}
        onOk={handleAddTopic}
        okText="Add"
      >
        <Input
          placeholder="Topic Name"
          value={newTopicName}
          onChange={(e) => setNewTopicName(e.target.value)}
        />
      </Modal>

      {/* Add Company Modal */}
      <Modal
        title="Add New Company"
        open={isAddCompanyModalOpen}
        onCancel={() => setIsAddCompanyModalOpen(false)}
        onOk={handleAddCompany}
        okText="Add"
      >
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Company Name"
            value={newCompanyName}
            onChange={(e) => setNewCompanyName(e.target.value)}
          />
          <Input.TextArea
            placeholder="Company Description"
            value={newCompanyDescription}
            onChange={(e) => setNewCompanyDescription(e.target.value)}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Topics;