import { Modal, List, Typography, Button } from 'antd';
import { useState } from 'react';

type Session = {
  id: string;
  date: string;
  status: 'Completed' | 'In Progress' | 'Failed';
  duration: string;
  conversation: Array<{
    speaker: 'Agent' | 'Customer';
    message: string;
    timestamp: string;
  }>;
};

type Props = {
  sessions: Session[];
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
  contactName: string;
};

const SessionList: React.FC<Props> = ({ sessions, isOpen, onClose, phoneNumber, contactName }) => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const handleSessionClick = (session: Session) => {
    setSelectedSession(session);
  };

  const handleBackToSessions = () => {
    setSelectedSession(null);
  };

  return (
    <Modal
      title={
        selectedSession
          ? `Conversation Details - ${contactName}`
          : `Sessions for ${contactName} (${phoneNumber})`
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
    >
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
                  <div className="flex justify-between items-center">
                    <span>Session {session.id}</span>
                    <Typography.Text
                      type={
                        session.status === 'Completed'
                          ? 'success'
                          : session.status === 'Failed'
                          ? 'danger'
                          : 'warning'
                      }
                    >
                      {session.status}
                    </Typography.Text>
                  </div>
                }
                description={
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{session.date}</span>
                    <span>Duration: {session.duration}</span>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <div>
          <Button
            type="link"
            onClick={handleBackToSessions}
            className="mb-4 pl-0"
          >
            ← Back to Sessions
          </Button>
          <List
            className="conversation-list"
            dataSource={selectedSession.conversation}
            renderItem={(message) => (
              <List.Item
                className={`flex ${message.speaker === 'Agent' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${message.speaker === 'Agent' ? 'bg-blue-100' : 'bg-gray-100'}`}
                >
                  <div className="font-semibold text-sm mb-1">{message.speaker}</div>
                  <div className="text-gray-800">{message.message}</div>
                  <div className="text-xs text-gray-500 mt-1">{message.timestamp}</div>
                </div>
              </List.Item>
            )}
          />
        </div>
      )}
    </Modal>
  );
};

export default SessionList;