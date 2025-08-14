import { motion } from 'framer-motion';
import { Users, UserCheck, Target, TrendingUp, MapPin, Clock, Heart, Star } from 'lucide-react';
import { MetricCard } from '@/components/MetricCard';
import { ChartCard } from '@/components/ChartCard';
import { AudienceDemographics } from '@/components/AudienceDemographics';
import { AudienceSegmentation } from '@/components/AudienceSegmentation';
import { AudienceJourney } from '@/components/AudienceJourney';
import { TopAudienceLocations } from '@/components/TopAudienceLocations';
import { mockEvent } from '@/lib/mockData';

const Audience = () => {
  const avgAge = 28.5;
  const loyaltyRate = 42.8;
  const avgSpend = 285;
  const engagementScore = 87.3;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="festival-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Audience Analytics</h1>
            <p className="text-muted-foreground">Deep insights into your event audience and their behavior</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-primary mb-2">
              <Users className="w-6 h-6" />
              <span className="text-2xl font-bold">{mockEvent.checkedIn.toLocaleString()}</span>
            </div>
            <p className="text-sm text-muted-foreground">total attendees</p>
          </div>
        </div>
      </motion.div>

      {/* Audience Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Average Age"
          value={avgAge}
          change={-2.1}
          icon={UserCheck}
          decimals={1}
          trend="down"
          delay={0.1}
        />
        <MetricCard
          title="Loyalty Rate"
          value={loyaltyRate}
          change={8.4}
          icon={Heart}
          suffix="%"
          decimals={1}
          trend="up"
          delay={0.2}
        />
        <MetricCard
          title="Avg. Spend per Person"
          value={avgSpend}
          change={12.7}
          icon={TrendingUp}
          prefix="$"
          trend="up"
          delay={0.3}
        />
        <MetricCard
          title="Engagement Score"
          value={engagementScore}
          change={5.9}
          icon={Star}
          decimals={1}
          trend="up"
          delay={0.4}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Audience Demographics" delay={0.5}>
          <AudienceDemographics />
        </ChartCard>
        
        <ChartCard title="Audience Segmentation" delay={0.6}>
          <AudienceSegmentation />
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Audience Journey" delay={0.7}>
          <AudienceJourney />
        </ChartCard>
        
        <ChartCard title="Top Locations" delay={0.8}>
          <TopAudienceLocations />
        </ChartCard>
      </div>

      {/* Audience Insights */}
      <motion.div
        className="festival-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <h3 className="text-xl font-semibold text-foreground mb-6">Audience Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Peak Attendance Time',
              value: '8:30 PM',
              description: 'Main stage headliner performance',
              icon: Clock,
              color: 'primary'
            },
            {
              title: 'Most Engaged Segment',
              value: 'Music Enthusiasts',
              description: '85% social media interaction rate',
              icon: Heart,
              color: 'accent'
            },
            {
              title: 'Geographic Reach',
              value: '47 States',
              description: 'Attendees from across the country',
              icon: MapPin,
              color: 'secondary'
            }
          ].map((insight, index) => (
            <motion.div
              key={insight.title}
              className={`p-4 rounded-lg border ${
                insight.color === 'primary' ? 'bg-primary/10 border-primary/30' :
                insight.color === 'accent' ? 'bg-accent/10 border-accent/30' :
                'bg-secondary/10 border-secondary/30'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 + index * 0.1 }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-full ${
                  insight.color === 'primary' ? 'bg-primary/20' :
                  insight.color === 'accent' ? 'bg-accent/20' :
                  'bg-secondary/20'
                }`}>
                  <insight.icon className={`w-5 h-5 ${
                    insight.color === 'primary' ? 'text-primary' :
                    insight.color === 'accent' ? 'text-accent' :
                    'text-secondary'
                  }`} />
                </div>
                <h4 className="font-medium text-foreground">{insight.title}</h4>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{insight.value}</p>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Audience Persona Cards */}
      <motion.div
        className="festival-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.3 }}
      >
        <h3 className="text-xl font-semibold text-foreground mb-6">Top Audience Personas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Music Enthusiasts',
              percentage: 35,
              age: '25-34',
              description: 'Passionate about live music, high social media engagement',
              traits: ['High spending', 'Social sharers', 'Return attendees']
            },
            {
              name: 'Festival Hoppers',
              percentage: 28,
              age: '18-28',
              description: 'Attend multiple festivals annually, budget-conscious',
              traits: ['Early birds', 'Group bookings', 'Value seekers']
            },
            {
              name: 'VIP Experience Seekers',
              percentage: 22,
              age: '30-45',
              description: 'Premium experience focused, high disposable income',
              traits: ['VIP packages', 'Premium add-ons', 'Loyalty members']
            }
          ].map((persona, index) => (
            <motion.div
              key={persona.name}
              className="p-6 rounded-lg bg-gradient-to-br from-muted/20 to-muted/10 border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-foreground">{persona.name}</h4>
                <span className="text-2xl font-bold text-primary">{persona.percentage}%</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Age: {persona.age}
              </p>
              <p className="text-sm text-foreground mb-4">{persona.description}</p>
              <div className="space-y-2">
                {persona.traits.map((trait, traitIndex) => (
                  <div key={traitIndex} className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-xs text-muted-foreground">{trait}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Audience;