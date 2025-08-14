import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const ticketData = [
  { name: 'General Admission', value: 25000, color: 'hsl(var(--primary))' },
  { name: 'VIP', value: 1250, color: 'hsl(var(--secondary))' },
  { name: 'Early Bird', value: 15000, color: 'hsl(var(--accent))' },
  { name: 'Student', value: 6250, color: 'hsl(260 73% 72%)' }
];

export const TicketCategoriesChart = () => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="festival-card p-4 border border-border">
          <p className="text-sm font-medium text-foreground">{data.name}</p>
          <p className="text-lg font-bold text-primary">{data.value.toLocaleString()} tickets</p>
          <p className="text-sm text-muted-foreground">
            {((data.value / ticketData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={ticketData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {ticketData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};