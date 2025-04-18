import {
  PhoneOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Components } from "@components/index";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Calls",
      value: "1,234",
      change: "+12% from last month",
      changeColor: "text-green-600",
      borderColor: "border-blue-500",
      icon: PhoneOutlined,
      iconColor: "text-indigo-400",
    },
    {
      title: "Success Rate",
      value: "85%",
      change: "+5% from last month",
      changeColor: "text-green-600",
      borderColor: "border-green-500",
      icon: CheckCircleOutlined,
      iconColor: "text-green-500",
    },
    {
      title: "Failed Calls",
      value: "185",
      change: "-3% from last month",
      changeColor: "text-red-500",
      borderColor: "border-red-500",
      icon: CloseCircleOutlined,
      iconColor: "text-red-400",
    },
    {
      title: "Avg. Duration",
      value: "4m 30s",
      change: "+30s from last month",
      changeColor: "text-green-600",
      borderColor: "border-purple-500",
      icon: ClockCircleOutlined,
      iconColor: "text-purple-500",
    },
  ];

  const pieChartData = [
    {
      title: "Call Distribution",
      data: [
        { name: "Successful Calls", value: 65, color: "#4F46E5" },
        { name: "Failed Calls", value: 15, color: "#EF4444" },
        { name: "Missed Calls", value: 12, color: "#F59E0B" },
        { name: "Busy", value: 8, color: "#6B7280" },
      ],
    },
  ];

  const lineChartData = [
    {
      title: "Success Rate Trend",
      dataKey: "rate",
      lineColor: "#4F46E5",
      data: [
        { month: "Jan", rate: 76 },
        { month: "Feb", rate: 80 },
        { month: "Mar", rate: 86 },
        { month: "Apr", rate: 83 },
        { month: "May", rate: 89 },
        { month: "Jun", rate: 85 },
      ],
    },
  ];

  return (
    <div className="">
      <Components.Header />
      <div className="flex justify-around p-4">
        {stats.map((stat, index) => (
          <Components.StatCard key={index} {...stat} />
        ))}
      </div>
      <Components.SalesChart
        pieCharts={pieChartData}
        lineCharts={lineChartData}
      />
      ;{/* <Components.RecentActivity /> */}
    </div>
  );
};

export default Dashboard;
