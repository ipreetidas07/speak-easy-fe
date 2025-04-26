import React, { useState, useEffect } from "react";

export type CallType =
  | "initiated"
  | "ringing"
  | "not answered"
  | "declined"
  | "completed"
  | "no-answer"
  | "busy"
  | "answered"
  | "in-progress";

interface CallStatusProps {
  name: string;
  phone: string;
  callType: CallType;
  onClose: () => void;
  duration?: string;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

const getBackgroundClass = (callType: CallType) => {
  switch (callType) {
    case "declined":
    case "busy":
      return "bg-red-300";
    case "not answered":
    case "no-answer":
      return "bg-stone-400";
    case "completed":
      return "bg-blue-300";
    case "in-progress":
      return "bg-green-300";
    case "ringing":
    case "initiated":
    case "answered":
    default:
      return "bg-green-200";
  }
};

const getCallTitle = (callType: CallType) => {
  switch (callType) {
    case "initiated":
    case "ringing":
    case "answered":
      return "Calling...";
    case "in-progress":
      return "Call in Progress";
    case "completed":
      return "Call Completed";
    case "declined":
    case "busy":
      return "Call Declined";
    case "not answered":
    case "no-answer":
      return "No Answer";
    default:
      return "Call Status";
  }
};

export const CallStatus: React.FC<CallStatusProps> = ({
  name,
  phone,
  callType,
  onClose,
  duration,
}) => {
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callType === "in-progress") {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [callType]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const showCloseButton = [
    "completed",
    "declined",
    "not answered",
    "no-answer",
    "busy",
  ].includes(callType);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`${getBackgroundClass(
          callType
        )} p-6 py-20 rounded-lg shadow-lg max-w-sm w-full`}
      >
        <div className="text-center">
          <div className="text-2xl font-bold mb-10">
            {getCallTitle(callType)}
          </div>

          <div className="mx-auto mb-7 w-24 h-24 rounded-full bg-[#1E293B] text-white flex items-center justify-center font-bold text-2xl">
            {getInitials(name)}
          </div>

          <p className="text-xl font-semibold">{name}</p>
          <p className="mt-2">{phone}</p>

          {callType === "in-progress" && (
            <p className="text-2xl font-mono my-4">{formatTime(timer)}</p>
          )}

          {callType === "completed" && duration && (
            <p className="text-xl font-mono mt-4">Duration: {duration} m</p>
          )}

          {showCloseButton && (
            <div className="mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
