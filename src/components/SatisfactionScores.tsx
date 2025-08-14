import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const satisfactionData = [
  { category: 'Music Quality', score: 9.2, target: 8.5 },
  { category: 'Sound System', score: 8.8, target: 8.0 },
  { category: 'Venue Layout', score: 8.5, target: 8.0 },
  { category: 'Food & Drinks', score: 7.9, target: 7.5 },
  { category: 'Staff Service', score: 9.1, target: 8.5 },
  { category: 'Cleanliness', score: 8.7, target: 8.0 },
  { category: 'Value for Money', score: 8.3, target: 7.5 },
  { category: 'Overall Experience', score: 8.9, target: 8.5 }
];

export const SatisfactionScores = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const performance = data.score >= data.target ? 'Above Target' : 'Below Target';
      const diff = data.score - data.target;
      const diffFormatted = diff.toFixed(1);
      
      return (
        <div className="festival-card p-4 border border-border">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-primary">●</span>
              <span className="ml-2">Score: {data.score}/10</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">●</span>
              <span className="ml-2">Target: {data.target}/10</span>
            </p>
            <p className={`text-sm font-medium ${
              data.score >= data.target ? 'text-accent' : 'text-destructive'
            }`}>
              {performance} ({diff > 0 ? '+' : ''}{diffFormatted})
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
        <BarChart data={satisfactionData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="category" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            domain={[0, 10]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="score" 
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            name="Actual Score"
          />
          <Bar 
            dataKey="target" 
            fill="hsl(var(--muted-foreground))"
            radius={[2, 2, 0, 0]}
            name="Target Score"
            opacity={0.5}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};