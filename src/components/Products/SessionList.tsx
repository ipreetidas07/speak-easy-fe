import { Modal, List, Typography, Button } from "antd";
import { useState, useEffect } from "react";

type Session = {
  id: string;
  date: string;
  status: string;
  duration: string;
  conversation: Array<{
    speaker: "Agent" | "Customer";
    message: string;
    timestamp: string;
  }>;
  summary: string;
};

type Props = {
  sessions: Session[];
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
  contactName: string;
};

const SessionList: React.FC<Props> = ({
  sessions,
  isOpen,
  onClose,
  phoneNumber,
  contactName,
}) => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [summaryText, setSummaryText] = useState<string>("");
  const [displayedSummary, setDisplayedSummary] = useState<string>("");

  const handleSessionClick = (session: Session) => {
    setSelectedSession(session);
    setSummaryText(""); // clear summary when opening messages
    setDisplayedSummary("");
  };

  const handleBackToSessions = () => {
    setSelectedSession(null);
    setSummaryText("");
    setDisplayedSummary("");
  };

  const handleClose = () => {
    setSelectedSession(null);
    setSummaryText("");
    setDisplayedSummary("");
    onClose();
  };

  const handleSummarize = () => {
    if (!selectedSession?.summary) return;
    setSummaryText(selectedSession.summary);
    setDisplayedSummary("");
  };

  // Typing animation effect
  useEffect(() => {
    if (!summaryText) return;

    let index = 0;
    setDisplayedSummary("");

    const interval = setInterval(() => {
      setDisplayedSummary((prev) => prev + summaryText[index]);
      index++;
      if (index >= summaryText.length - 1) {
        clearInterval(interval);
      }
    }, 10); // faster typing 30ms per letter (feel free to adjust)

    return () => clearInterval(interval);
  }, [summaryText]);

  return (
    <Modal
      title={
        selectedSession ? (
          <div className="flex justify-between pr-8 items-center">
            <div className="flex items-center gap-2">
              <span
                onClick={handleBackToSessions}
                className="cursor-pointer text-[#1e293b] text-2xl"
              >
                ←
              </span>
              <span>Conversation Details - {contactName}</span>
            </div>
            {selectedSession.summary && !displayedSummary && (
              <div className="flex flex-col items-center">
                <Button type="primary" onClick={handleSummarize}>
                  Summarize Conversation
                </Button>
              </div>
            )}
          </div>
        ) : (
          `Sessions for ${contactName} (${phoneNumber})`
        )
      }
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={800}
    >
      <div className="max-h-[60vh] overflow-y-auto">
        {!selectedSession ? (
          <List
            dataSource={sessions}
            renderItem={(session) => (
              <List.Item
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSessionClick(session)}
              >
                <List.Item.Meta
                  title={
                    <div className="flex justify-between items-center pr-5">
                      <span>Session {session.id}</span>
                      <Typography.Text
                        type={
                          session.status.toLowerCase() === "completed"
                            ? "success"
                            : session.status.toLowerCase() === "busy"
                            ? "danger"
                            : "warning"
                        }
                      >
                        {session.status}
                      </Typography.Text>
                    </div>
                  }
                  description={
                    <div className="flex justify-between text-sm text-gray-500 pr-5">
                      <span>{session.date}</span>
                      <span>Duration: {session.duration}</span>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <>
            {!displayedSummary && (
              <div>
                <List
                  className="conversation-list"
                  dataSource={selectedSession.conversation}
                  renderItem={(message) => (
                    <List.Item
                      className={`flex ${
                        message.speaker === "Agent"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.speaker === "Agent"
                            ? "bg-blue-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <div className="font-semibold text-sm mb-1">
                          {message.speaker}
                        </div>
                        <div className="text-gray-800">{message.message}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {message.timestamp}
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            )}
            {displayedSummary && (
              <div className="mt-4 bg-gray-100 p-4 rounded-md text-sm w-full whitespace-pre-line">
                {displayedSummary}
                <span className="animate-pulse">|</span>
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default SessionList;
