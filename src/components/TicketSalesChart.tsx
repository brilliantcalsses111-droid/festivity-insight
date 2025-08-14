import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { mockTicketSales } from '@/lib/mockData';

export const TicketSalesChart = () => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="festival-card p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-2">{formatDate(label)}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-primary">●</span>
              <span className="ml-2">Tickets: {payload[0].value.toLocaleString()}</span>
            </p>
            <p className="text-sm">
              <span className="text-secondary">●</span>
              <span className="ml-2">Revenue: {formatCurrency(payload[1].value)}</span>
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
        <LineChart data={mockTicketSales} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            yAxisId="tickets"
            orientation="left"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            yAxisId="revenue"
            orientation="right"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            yAxisId="tickets"
            type="monotone"
            dataKey="sales"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ r: 4, fill: 'hsl(var(--primary))' }}
            activeDot={{ r: 6, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
          />
          <Line
            yAxisId="revenue"
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--secondary))"
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={{ r: 4, fill: 'hsl(var(--secondary))' }}
            activeDot={{ r: 6, fill: 'hsl(var(--secondary))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};