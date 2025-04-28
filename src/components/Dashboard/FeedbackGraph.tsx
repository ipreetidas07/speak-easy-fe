import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

export type FeedbackDistributionProps = {
  feedbackDistribution: { [key: string]: number };
};

const barColors: { [key: string]: string } = {
  "1": "#FF4C4C", // Red
  "2": "#FFA500", // Orange
  "3": "#FFD700", // Yellow
  "4": "#90EE90", // Light Green
  "5": "#4CAF50", // Green
};

const ratingLabels: { [key: string]: string } = {
  "1": "Poor",
  "2": "Bad",
  "3": "Good",
  "4": "Very Good",
  "5": "Excellent",
};

const FeedbackDistribution: React.FC<FeedbackDistributionProps> = ({
  feedbackDistribution,
}) => {
  // Dynamically create feedback data based on feedbackDistribution prop
  const feedbackData = Object.entries(feedbackDistribution).map(
    ([rating, count]) => ({
      rating,
      count,
    })
  );
  const maxCount = Math.max(...Object.values(feedbackDistribution));

  // Create an array of numbers from 1 to maxCount
  const ticks = Array.from({ length: maxCount }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-[580px] h-auto">
      <h2 className="text-xl font-bold mb-3">Feedback Distribution</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={feedbackData} layout="vertical">
          <XAxis
            type="number"
            label={{ value: "Count", position: "insideBottom", dy: 10 }}
            ticks={ticks}
          />
          <YAxis
            dataKey="rating"
            type="category"
            label={{
              value: "Rating",
              angle: 0,
              position: "insideLeft",
              dx: -10,
            }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={15}>
            {feedbackData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[entry.rating]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-2 flex flex-wrap gap-3 items-center justify-center">
        {Object.entries(ratingLabels).map(([rating, label]) => (
          <div key={rating} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: barColors[rating] }}
            ></div>
            <span className="text-xs font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackDistribution;
