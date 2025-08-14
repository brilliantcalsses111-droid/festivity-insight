import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const ageData = [
  { name: '18-24', value: 28, color: 'hsl(var(--primary))' },
  { name: '25-34', value: 35, color: 'hsl(var(--secondary))' },
  { name: '35-44', value: 22, color: 'hsl(var(--accent))' },
  { name: '45-54', value: 12, color: 'hsl(260 73% 72%)' },
  { name: '55+', value: 3, color: 'hsl(var(--muted-foreground))' }
];

const genderData = [
  { name: 'Female', value: 52, color: 'hsl(var(--primary))' },
  { name: 'Male', value: 46, color: 'hsl(var(--secondary))' },
  { name: 'Non-binary', value: 2, color: 'hsl(var(--accent))' }
];

export const AudienceDemographics = () => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="festival-card p-4 border border-border">
          <p className="text-sm font-medium text-foreground">{data.name}</p>
          <p className="text-lg font-bold text-primary">{data.value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80 flex flex-col">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Age Distribution */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2 text-center">Age Distribution</h4>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={ageData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {ageData.map((entry, index) => (
                  <Cell key={`age-cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gender Distribution */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2 text-center">Gender Distribution</h4>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {genderData.map((entry, index) => (
                  <Cell key={`gender-cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Age Groups</p>
          <div className="space-y-1">
            {ageData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-foreground">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Gender</p>
          <div className="space-y-1">
            {genderData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-foreground">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};