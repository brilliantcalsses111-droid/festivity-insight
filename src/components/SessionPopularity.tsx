import { motion } from 'framer-motion';
import { Users, Clock, MapPin, TrendingUp } from 'lucide-react';

const sessionData = [
  { name: 'Main Stage - Headliner', attendees: 35000, capacity: 40000, rating: 4.9, duration: '90 min' },
  { name: 'Electronic Stage', attendees: 12500, capacity: 15000, rating: 4.7, duration: '120 min' },
  { name: 'Acoustic Tent', attendees: 3200, capacity: 4000, rating: 4.8, duration: '60 min' },
  { name: 'DJ Set - Pool Area', attendees: 8900, capacity: 10000, rating: 4.6, duration: '75 min' },
  { name: 'Rock Stage', attendees: 18000, capacity: 20000, rating: 4.5, duration: '85 min' },
  { name: 'Jazz Lounge', attendees: 1800, capacity: 2000, rating: 4.9, duration: '45 min' }
];

export const SessionPopularity = () => {
  const sortedSessions = [...sessionData].sort((a, b) => b.attendees - a.attendees);

  return (
    <div className="w-full h-80 overflow-y-auto space-y-3">
      {sortedSessions.map((session, index) => {
        const fillPercentage = (session.attendees / session.capacity) * 100;
        const isNearCapacity = fillPercentage > 85;
        
        return (
          <motion.div
            key={session.name}
            className={`p-4 rounded-lg border transition-colors ${
              isNearCapacity ? 'bg-destructive/10 border-destructive/30' : 'bg-muted/20 border-border'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{session.name}</h4>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{session.attendees.toLocaleString()}/{session.capacity.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{session.duration}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="font-bold text-primary">{session.rating}</span>
                </div>
                <span className={`text-sm font-medium ${
                  isNearCapacity ? 'text-destructive' : 'text-accent'
                }`}>
                  {fillPercentage.toFixed(0)}% Full
                </span>
              </div>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full ${
                  isNearCapacity ? 'bg-destructive' : 'bg-gradient-to-r from-primary to-secondary'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${fillPercentage}%` }}
                transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};