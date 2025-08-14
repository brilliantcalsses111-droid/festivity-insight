import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const segmentData = [
  { segment: 'Music Enthusiasts', count: 16800, spending: 320, engagement: 92 },
  { segment: 'Festival Hoppers', count: 13440, spending: 185, engagement: 78 },
  { segment: 'VIP Experience', count: 10560, spending: 580, engagement: 85 },
  { segment: 'Casual Attendees', count: 8400, spending: 125, engagement: 65 },
  { segment: 'Local Supporters', count: 5280, spending: 95, engagement: 58 }
];

export const AudienceSegmentation = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="festival-card p-4 border border-border">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-primary">●</span>
              <span className="ml-2">Count: {data.count.toLocaleString()}</span>
            </p>
            <p className="text-sm">
              <span className="text-secondary">●</span>
              <span className="ml-2">Avg Spending: ${data.spending}</span>
            </p>
            <p className="text-sm">
              <span className="text-accent">●</span>
              <span className="ml-2">Engagement: {data.engagement}%</span>
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
        <BarChart data={segmentData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="segment" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="count" 
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            name="Audience Count"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};