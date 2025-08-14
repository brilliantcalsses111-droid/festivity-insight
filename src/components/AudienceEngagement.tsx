import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

const engagementData = [
  { segment: 'Social Media', value: 85, maxValue: 100 },
  { segment: 'Merchandise', value: 72, maxValue: 100 },
  { segment: 'Food & Drinks', value: 68, maxValue: 100 },
  { segment: 'Photo Spots', value: 91, maxValue: 100 },
  { segment: 'Interactive Games', value: 45, maxValue: 100 },
  { segment: 'Live Streaming', value: 78, maxValue: 100 }
];

export const AudienceEngagement = () => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="festival-card p-4 border border-border">
          <p className="text-sm font-medium text-foreground">{data.segment}</p>
          <p className="text-lg font-bold text-primary">{data.value}%</p>
          <p className="text-sm text-muted-foreground">Engagement Rate</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={engagementData}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis 
            dataKey="segment" 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} 
          />
          <Radar
            name="Engagement"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};