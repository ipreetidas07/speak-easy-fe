import { Components } from "@components/index";
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { TEST_ROUTES } from "../api/routes/test.routes";
import { StatCardProps } from "@components/Dashboard/StatCard";
import {
  LineChartProps,
  PieChartProps,
} from "@components/Dashboard/SalesChart";
import { getStartAndEndDate } from "../utils/DateUtils";
import { DateFilter } from "@enums/index";

const Dashboard = () => {
  const [stats, setStats] = useState<StatCardProps[]>([]);
  const [pieChartData, setPieChartData] = useState<PieChartProps[]>([]);
  const [lineChartData, setLineChartData] = useState<LineChartProps[]>([]);
  const [product, setProduct] = useState<string[]>([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState(
    DateFilter.LAST_7_DAYS
  );
  const [selectedProduct, setSelectedProduct] = useState("All");

  useEffect(() => {
    fetchDashboardOverview();
  }, [selectedProduct, selectedDateFilter]);

  const fetchDashboardOverview = async () => {
    const { startDate, endDate } = getStartAndEndDate(selectedDateFilter);

    try {
      const response = await apiClient.get(TEST_ROUTES.DASHBOARD_OVERVIEW, {
        params: {
          startDate,
          endDate,
          company:selectedProduct,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setProduct(data.companies);
        // Set Stats
        setStats([
          {
            title: "Total Calls",
            value: data.summary.totalCalls.toString(),
            change: "", // You can calculate change if needed
          },
          {
            title: "Success Rate",
            value: `${data.summary.successRate}%`,
            change: "",
          },
          {
            title: "Failed Calls",
            value: data.summary.failedCalls.toString(),
            change: "",
          },
          {
            title: "Avg. Duration",
            value: data.summary.avgDuration,
            change: "",
          },
        ]);

        // Set Pie Chart
        setPieChartData([
          {
            title: "Call Distribution",
            data: [
              {
                name: "Successful Calls",
                value: data.distribution.successful,
                color: "#4F46E5",
              },
              {
                name: "Failed Calls",
                value: data.distribution.failed,
                color: "#EF4444",
              },
              {
                name: "Missed Calls",
                value: data.distribution.missed,
                color: "#F59E0B",
              },
              { name: "Busy", value: data.distribution.busy, color: "#6B7280" },
            ],
          },
        ]);

        // Set Line Chart
        setLineChartData([
          {
            title: "Success Rate Trend",
            dataKey: "rate",
            lineColor: "#4F46E5",
            data: data.successRateTrend.map((item: any) => ({
              month: item.month,
              rate: item.rate,
            })),
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching dashboard overview:", error);
    }
  };

  const handleFilterChange = (dateFilter: DateFilter, product: string) => {
    setSelectedDateFilter(dateFilter);
    setSelectedProduct(product);
  };

  return (
    <div>
      <Components.Header
        products={product}
        onFilterChange={handleFilterChange}
      />
      <div className="flex justify-around p-4">
        {stats.map((stat, index) => (
          <Components.StatCard key={index} {...stat} />
        ))}
      </div>
      <Components.SalesChart
        pieCharts={pieChartData}
        lineCharts={lineChartData}
      />
      {/* <Components.RecentActivity /> */}
    </div>
  );
};

export default Dashboard;
