import { Components } from "@components/index";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Calls",
      value: "1,234",
      change: "+12% from last month",
    },
    {
      title: "Success Rate",
      value: "85%",
      change: "+5% from last month",
    },
    {
      title: "Failed Calls",
      value: "185",
      change: "-3% from last month",
    },
    {
      title: "Avg. Duration",
      value: "4m 30s",
      change: "+30s from last month",
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
    <div>
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
