import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeColor: string;
  borderColor: string;
  icon: React.ElementType;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeColor,
  borderColor,
  icon: Icon,
  iconColor,
}) => {
  return (
    <div
      className={`flex flex-col justify-between rounded-xl bg-white p-4 shadow-sm border-l-[4px] w-64 h-320 ${borderColor}`}
    >
      <div className="flex justify-between items-start">
        <div className="text-sm text-gray-500">{title}</div>
        <Icon className={`text-lg ${iconColor}`} />
      </div>
      <div className="mt-2">
        <div className="text-3xl font-semibold text-black">{value}</div>
        <div className={`text-sm mt-1 ${changeColor}`}>{change}</div>
      </div>
    </div>
  );
};

export default StatCard;
