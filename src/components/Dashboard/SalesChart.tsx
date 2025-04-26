import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type PieChartData = {
  name: string;
  value: number;
  color: string;
};

type LineChartPoint = {
  [key: string]: string | number;
};

export type PieChartProps = {
  title: string;
  data: PieChartData[];
};

export type LineChartProps = {
  title: string;
  data: LineChartPoint[];
  dataKey: string;
  lineColor: string;
};

type ChartsProps = {
  pieCharts: PieChartProps[];
  lineCharts: LineChartProps[];
};

const SalesChart: React.FC<ChartsProps> = ({ pieCharts, lineCharts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2 px-[50px] mt-5">
      {/* Pie Charts */}
      {pieCharts.map((chart, index) => (
        <div key={`pie-${index}`} className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">{chart.title}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chart.data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-out"
                labelLine={false}
              >
                {chart.data.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ))}

      {/* Line Charts */}
      {lineCharts.map((chart, index) => (
        <div
          key={`line-${index}`}
          className="bg-white p-4 rounded-xl shadow-sm"
        >
          <h2 className="text-xl font-bold mb-4">{chart.title}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={chart.dataKey}
                name={chart.title}
                stroke={chart.lineColor}
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default SalesChart;
