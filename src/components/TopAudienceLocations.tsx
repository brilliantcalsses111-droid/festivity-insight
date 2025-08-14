import { motion } from 'framer-motion';
import { MapPin, Users } from 'lucide-react';
import { mockGeographicData } from '@/lib/mockData';

export const TopAudienceLocations = () => {
  const sortedLocations = [...mockGeographicData]
    .sort((a, b) => b.tickets - a.tickets)
    .slice(0, 8);

  const maxTickets = sortedLocations[0]?.tickets || 1;

  return (
    <div className="w-full h-80 overflow-y-auto space-y-3">
      {sortedLocations.map((location, index) => {
        const percentage = (location.tickets / maxTickets) * 100;
        
        return (
          <motion.div
            key={`${location.country}-${location.city}`}
            className="flex items-center space-x-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="p-2 rounded-full bg-primary/20">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground truncate">{location.city}</p>
                <p className="text-sm text-muted-foreground">{location.country}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 min-w-0">
              <div className="flex-1 bg-muted rounded-full h-2 min-w-[80px]">
                <motion.div
                  className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                />
              </div>
              <div className="text-right min-w-[60px]">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3 text-muted-foreground" />
                  <span className="font-bold text-foreground text-sm">
                    {location.tickets.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {((location.tickets / mockGeographicData.reduce((sum, l) => sum + l.tickets, 0)) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
      
      <motion.div
        className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Total Countries</p>
            <p className="text-lg font-bold text-primary">
              {new Set(mockGeographicData.map(l => l.country)).size}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Cities</p>
            <p className="text-lg font-bold text-primary">
              {mockGeographicData.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">International %</p>
            <p className="text-lg font-bold text-primary">
              {(
                (mockGeographicData
                  .filter(l => l.country !== 'USA')
                  .reduce((sum, l) => sum + l.tickets, 0) /
                mockGeographicData.reduce((sum, l) => sum + l.tickets, 0)) * 100
              ).toFixed(1)}%
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};