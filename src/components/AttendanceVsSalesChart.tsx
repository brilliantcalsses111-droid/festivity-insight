import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const comparisonData = [
  { category: 'General', ticketsSold: 25000, attended: 22500 },
  { category: 'VIP', ticketsSold: 1250, attended: 1200 },
  { category: 'Early Bird', ticketsSold: 15000, attended: 13800 },
  { category: 'Student', ticketsSold: 6250, attended: 5800 }
];

export const AttendanceVsSalesChart = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const showUpRate = ((payload[1].value / payload[0].value) * 100).toFixed(1);
      return (
        <div className="festival-card p-4 border border-border">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-primary">●</span>
              <span className="ml-2">Tickets Sold: {payload[0].value.toLocaleString()}</span>
            </p>
            <p className="text-sm">
              <span className="text-accent">●</span>
              <span className="ml-2">Attended: {payload[1].value.toLocaleString()}</span>
            </p>
            <p className="text-sm font-medium">
              <span className="ml-2">Show-up Rate: {showUpRate}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="category" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            dataKey="ticketsSold" 
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            name="Tickets Sold"
          />
          <Bar 
            dataKey="attended" 
            fill="hsl(var(--accent))"
            radius={[4, 4, 0, 0]}
            name="Attended"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};