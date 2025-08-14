import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const revenueData = [
  { name: 'Ticket Sales', value: 2375000, color: 'hsl(var(--primary))' },
  { name: 'Merchandise', value: 485000, color: 'hsl(var(--secondary))' },
  { name: 'Food & Beverages', value: 720000, color: 'hsl(var(--accent))' },
  { name: 'Sponsorships', value: 650000, color: 'hsl(260 73% 72%)' },
  { name: 'Parking', value: 125000, color: 'hsl(var(--muted-foreground))' }
];

export const RevenueBreakdownChart = () => {
  const total = revenueData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / total) * 100).toFixed(1);
      return (
        <div className="festival-card p-4 border border-border">
          <p className="text-sm font-medium text-foreground">{data.name}</p>
          <p className="text-lg font-bold text-primary">
            ${data.value.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">{percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={revenueData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {revenueData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};