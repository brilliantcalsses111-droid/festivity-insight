import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { mockGeographicData } from '@/lib/mockData';

export const GeographicHeatmap = () => {
  const maxTickets = Math.max(...mockGeographicData.map(d => d.tickets));

  return (
    <div className="w-full h-80 flex flex-col">
      <div className="flex-1 space-y-4">
        {mockGeographicData.slice(0, 6).map((location, index) => {
          const intensity = (location.tickets / maxTickets) * 100;
          
          return (
            <motion.div
              key={`${location.country}-${location.city}`}
              className="flex items-center space-x-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3 flex-1">
                <MapPin className="w-4 h-4 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{location.city}</p>
                  <p className="text-sm text-muted-foreground">{location.country}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 min-w-0">
                <div className="flex-1 bg-muted rounded-full h-2 min-w-[100px]">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${intensity}%` }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                  />
                </div>
                <div className="text-right min-w-[60px]">
                  <p className="font-bold text-foreground">{location.tickets.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">tickets</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-4 p-4 rounded-lg bg-primary/10">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Total Markets</span>
          <span className="font-bold text-primary">{mockGeographicData.length}</span>
        </div>
      </div>
    </div>
  );
};