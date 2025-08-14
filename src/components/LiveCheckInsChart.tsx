import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const checkInData = [
  { time: '14:00', checkIns: 2500, cumulative: 2500 },
  { time: '15:00', checkIns: 4200, cumulative: 6700 },
  { time: '16:00', checkIns: 6800, cumulative: 13500 },
  { time: '17:00', checkIns: 8500, cumulative: 22000 },
  { time: '18:00', checkIns: 9200, cumulative: 31200 },
  { time: '19:00', checkIns: 7800, cumulative: 39000 },
  { time: '20:00', checkIns: 2800, cumulative: 41800 },
  { time: '21:00', checkIns: 500, cumulative: 42300 }
];

export const LiveCheckInsChart = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="festival-card p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-primary">●</span>
              <span className="ml-2">Hourly Check-ins: {payload[0].value.toLocaleString()}</span>
            </p>
            <p className="text-sm">
              <span className="text-secondary">●</span>
              <span className="ml-2">Total Check-ins: {payload[1].value.toLocaleString()}</span>
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
        <LineChart data={checkInData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="checkIns"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ r: 4, fill: 'hsl(var(--primary))' }}
            activeDot={{ r: 6, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="cumulative"
            stroke="hsl(var(--secondary))"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 3, fill: 'hsl(var(--secondary))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};