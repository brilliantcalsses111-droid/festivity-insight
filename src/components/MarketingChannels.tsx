import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const marketingData = [
  { channel: 'Social Media', tickets: 18500, cost: 45000, roas: 4.8 },
  { channel: 'Email', tickets: 12000, cost: 15000, roas: 6.2 },
  { channel: 'Influencers', tickets: 8500, cost: 35000, roas: 2.8 },
  { channel: 'Paid Ads', tickets: 6000, cost: 28000, roas: 2.1 },
  { channel: 'Organic', tickets: 2500, cost: 5000, roas: 5.5 }
];

export const MarketingChannels = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="festival-card p-4 border border-border">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-primary">●</span>
              <span className="ml-2">Tickets: {data.tickets.toLocaleString()}</span>
            </p>
            <p className="text-sm">
              <span className="text-secondary">●</span>
              <span className="ml-2">Cost: ${data.cost.toLocaleString()}</span>
            </p>
            <p className="text-sm">
              <span className="text-accent">●</span>
              <span className="ml-2">ROAS: {data.roas}x</span>
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
        <BarChart data={marketingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="channel" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
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
            dataKey="tickets" 
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};