import {
  PhoneOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

export type ActivityType = {
  title: string;
  description: string;
  time: string;
  type: "success" | "no_answer" | "reschedule" | "failed";
  number: string;
};

export const RecentActivities = ({
  activities,
}: {
  activities: ActivityType[];
}) => {
  const iconMap = {
    success: <PhoneOutlined style={{ color: "#52c41a", fontSize: "20px" }} />, // Green
    no_answer: (
      <CloseCircleOutlined style={{ color: "#ff4d4f", fontSize: "20px" }} />
    ), // Red
    reschedule: (
      <ClockCircleOutlined style={{ color: "#faad14", fontSize: "20px" }} />
    ), // Yellow-orange
    failed: (
      <span
        style={{
          position: "relative",
          display: "inline-block",
          width: "20px",
          height: "20px",
        }}
      >
        <PhoneOutlined style={{ color: "#ff4d4f", fontSize: "20px" }} />
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "0",
            width: "100%",
            height: "1.5px",
            backgroundColor: "#ff4d4f",
            transform: "rotate(45deg)",
            transformOrigin: "center",
          }}
        />
      </span>
    ),
  };

  if (!activities || activities.length === 0) return null;

  return (
    <div className="mt-8 bg-white rounded-lg p-4 shadow">
      <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
      <ul>
        {activities.map((activity, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-2 border-b"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">{iconMap[activity.type]}</div>
              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-gray-500">
                  {activity.description} - {activity.number}
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-400">{activity.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
