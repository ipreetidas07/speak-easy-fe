import React, { useState, useEffect } from "react";

export type CallType = "initiated" | "ongoing" | "not answered" | "declined";

interface CallStatusProps {
  name: string;
  phone: string;
  callType: CallType;
  onClose: () => void;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
};

const getBackgroundClass = (callType: CallType) => {
  switch (callType) {
    case "declined":
      return "bg-red-300";
    case "not answered":
      return "bg-stone-300";
    case "ongoing":
    case "initiated":
    default:
      return "bg-green-200";
  }
};

export const CallStatus: React.FC<CallStatusProps> = ({
  name,
  phone,
  callType,
  onClose,
}) => {
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callType === "ongoing") {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`${getBackgroundClass(
          callType
        )} p-4 py-20 rounded-lg shadow-lg max-w-sm w-full`}
      >
        <div className="text-center">
          <div className="text-2xl font-bold mb-10">
            {callType === "initiated"
              ? "Calling..."
              : callType === "ongoing"
              ? "Call in Progress"
              : callType === "declined"
              ? "Call Declined"
              : "No Answer"}
          </div>
          <div className="mx-auto mb-7 w-24 h-24 rounded-full bg-[#1E293B] text-white flex items-center justify-center font-bold text-2xl">
            {getInitials(name)}
          </div>
        </div>

        {callType === "initiated" && (
          <div className="text-center">
            <p className="text-xl font-semibold">{name}</p>
            <p className="mt-4">{phone}</p>
          </div>
        )}

        {callType === "ongoing" && (
          <div className="text-center">
            <p className="text-xl font-semibold">{name}</p>
            <p className="text-2xl font-mono my-4">{formatTime(timer)}</p>
          </div>
        )}

        {(callType === "declined" || callType === "not answered") && (
          <div className="text-center mt-4">
            <p className="text-xl font-semibold mb-4">{name}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-white"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
