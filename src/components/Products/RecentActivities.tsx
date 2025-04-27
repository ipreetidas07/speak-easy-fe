import {
  PhoneOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { removeCountryCode } from "../../utils/DateUtils";

export type ActivityType = {
  title: string;
  description: string;
  time: string;
  type: string;
  number: string;
};

export const RecentActivities = ({
  activities,
}: {
  activities: ActivityType[];
}) => {
  const iconMap = {
    completed: <PhoneOutlined style={{ color: "#52c41a", fontSize: "20px" }} />,
    "no-answer": (
      <CloseCircleOutlined style={{ color: "#ff4d4f", fontSize: "20px" }} />
    ),
    reschedule: (
      <ClockCircleOutlined style={{ color: "#faad14", fontSize: "20px" }} />
    ),
    busy: (
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

  const validStatuses = ["completed", "no-answer", "busy"];

  // Filter and Sort
  const filteredActivities = activities
    .filter((activity) => validStatuses.includes(activity.type))
    .sort((a, b) => {
      const timeA = new Date(`1970-01-01T${convertTo24Hour(a.time)}`);
      const timeB = new Date(`1970-01-01T${convertTo24Hour(b.time)}`);
      return timeB.getTime() - timeA.getTime();
    })
    .slice(0, 5);

  if (!filteredActivities.length) return null;

  return (
    <div className="mt-5 bg-white rounded-lg p-4 shadow">
      <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>

      <div className="max-h-24 overflow-y-auto pr-2">
        <ul>
          {filteredActivities.map((activity, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-2 border-b pr-6"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {iconMap[activity.type as keyof typeof iconMap]}
                </div>
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-500">
                    {activity.description} -{" "}
                    {removeCountryCode(activity.number)}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-400">{activity.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Helper function to convert 12h to 24h format
function convertTo24Hour(timeStr: string) {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes, seconds] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  // Pad 0 for single digits
  const pad = (n: number) => (n < 10 ? "0" + n : n);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
