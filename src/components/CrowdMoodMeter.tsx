import { motion } from 'framer-motion';
import { Heart, Smile, Meh, Frown } from 'lucide-react';
import { mockSentimentData, calculateCrowdMood } from '@/lib/mockData';

export const CrowdMoodMeter = () => {
  const crowdMood = calculateCrowdMood(mockSentimentData);
  const moodPercentage = crowdMood * 100;

  const getMoodIcon = () => {
    if (crowdMood >= 0.8) return Smile;
    if (crowdMood >= 0.6) return Heart;
    if (crowdMood >= 0.4) return Meh;
    return Frown;
  };

  const getMoodColor = () => {
    if (crowdMood >= 0.8) return '#22c55e';
    if (crowdMood >= 0.6) return '#3b82f6';
    if (crowdMood >= 0.4) return '#f59e0b';
    return '#ef4444';
  };

  const getMoodLabel = () => {
    if (crowdMood >= 0.8) return 'Excellent';
    if (crowdMood >= 0.6) return 'Great';
    if (crowdMood >= 0.4) return 'Good';
    return 'Needs Attention';
  };

  const MoodIcon = getMoodIcon();

  return (
    <div className="festival-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Crowd Mood Meter</h3>
      
      <div className="flex flex-col items-center space-y-6">
        {/* Mood Icon */}
        <div className="relative">
          <motion.div
            className="p-4 rounded-full"
            style={{ backgroundColor: `${getMoodColor()}20` }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <MoodIcon 
              className="w-12 h-12" 
              style={{ color: getMoodColor() }}
            />
          </motion.div>
        </div>

        {/* Mood Score */}
        <div className="text-center">
          <motion.div
            className="text-4xl font-bold mb-2"
            style={{ color: getMoodColor() }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            {Math.round(moodPercentage)}%
          </motion.div>
          <p className="text-lg font-medium text-foreground">{getMoodLabel()}</p>
          <p className="text-sm text-muted-foreground">Overall Sentiment</p>
        </div>

        {/* Mood Bar */}
        <div className="w-full">
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: getMoodColor() }}
              initial={{ width: 0 }}
              animate={{ width: `${moodPercentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Recent Mentions */}
        <div className="w-full space-y-2">
          <h4 className="text-sm font-medium text-foreground">Recent Mentions</h4>
          {mockSentimentData.slice(0, 3).map((mention, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: mention.sentiment === 'positive' ? '#22c55e' :
                                 mention.sentiment === 'negative' ? '#ef4444' : '#6b7280'
                }}
              />
              <p className="text-xs text-muted-foreground flex-1 line-clamp-1">
                {mention.content}
              </p>
              <span className="text-xs text-muted-foreground capitalize">
                {mention.platform}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};