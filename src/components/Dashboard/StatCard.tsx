import React from "react";
import {
  PhoneOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

export type StatCardProps = {
  title: string;
  value: string;
  change: string;
};

const configMap: {
  [key: string]: {
    icon: React.ElementType;
    iconColor: string;
    borderColor: string;
    changeColor: string;
  };
} = {
  "Total Calls": {
    icon: PhoneOutlined,
    iconColor: "text-indigo-400",
    borderColor: "border-blue-500",
    changeColor: "text-green-600",
  },
  "Success Rate": {
    icon: CheckCircleOutlined,
    iconColor: "text-green-500",
    borderColor: "border-green-500",
    changeColor: "text-green-600",
  },
  "Failed Calls": {
    icon: CloseCircleOutlined,
    iconColor: "text-red-400",
    borderColor: "border-red-500",
    changeColor: "text-red-500",
  },
  "Avg. Duration": {
    icon: ClockCircleOutlined,
    iconColor: "text-purple-500",
    borderColor: "border-purple-500",
    changeColor: "text-green-600",
  },
};

const StatCard: React.FC<StatCardProps> = ({ title, value, change }) => {
  const config = configMap[title] ?? {
    icon: PhoneOutlined,
    iconColor: "text-gray-400",
    borderColor: "border-gray-300",
    changeColor: "text-gray-500",
  };
  const Icon = config.icon;

  return (
    <div
      className={`flex flex-col justify-between rounded-xl bg-white p-4 shadow-sm border-l-[4px] w-64 h-28 ${config.borderColor}`}
    >
      <div className="flex justify-between items-start">
        <div className="text-lg text-gray-500 font-bold">{title}</div>
        <Icon className={`text-xl ${config.iconColor}`} />
      </div>
      <div className="mt-2">
        <div className="text-3xl font-semibold text-black">{value}</div>
        <div className={`text-sm mt-1 ${config.changeColor}`}>{change}</div>
      </div>
    </div>
  );
};

export default StatCard;
