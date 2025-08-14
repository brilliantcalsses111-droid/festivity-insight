import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const journeyData = [
  { stage: 'Awareness', percentage: 100, drop: 0 },
  { stage: 'Interest', percentage: 78, drop: 22 },
  { stage: 'Consideration', percentage: 65, drop: 13 },
  { stage: 'Purchase Intent', percentage: 52, drop: 13 },
  { stage: 'Purchase', percentage: 45, drop: 7 },
  { stage: 'Check-in', percentage: 40, drop: 5 },
  { stage: 'Engagement', percentage: 35, drop: 5 },
  { stage: 'Advocacy', percentage: 28, drop: 7 }
];

export const AudienceJourney = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="festival-card p-4 border border-border">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-primary">●</span>
              <span className="ml-2">Retention: {data.percentage}%</span>
            </p>
            {data.drop > 0 && (
              <p className="text-sm">
                <span className="text-destructive">●</span>
                <span className="ml-2">Drop-off: -{data.drop}%</span>
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={journeyData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="stage" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="percentage"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ r: 5, fill: 'hsl(var(--primary))' }}
            activeDot={{ r: 7, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};