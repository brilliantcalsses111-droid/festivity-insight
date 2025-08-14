import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Users, DollarSign, Star, Target, Award, BarChart3 } from 'lucide-react';
import { MetricCard } from '@/components/MetricCard';
import { ChartCard } from '@/components/ChartCard';
import { AttendanceVsSalesChart } from '@/components/AttendanceVsSalesChart';
import { RevenueBreakdownChart } from '@/components/RevenueBreakdownChart';
import { AudienceEngagement } from '@/components/AudienceEngagement';
import { SatisfactionScores } from '@/components/SatisfactionScores';
import { mockEvent, calculateCheckInRate } from '@/lib/mockData';

const PostEvent = () => {
  const showUpRate = calculateCheckInRate(mockEvent);
  const netPromoterScore = 8.7;
  const totalEngagement = 145000;
  const roas = 4.2; // Return on Ad Spend

  return (
    <div className="space-y-8">
      {/* Success Header */}
      <motion.div
        className="festival-card p-6 border border-accent/30 bg-accent/5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-accent/20">
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Post-Event Analysis</h1>
              <p className="text-muted-foreground">Comprehensive event performance insights and learnings</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-accent mb-2">
              <Award className="w-6 h-6" />
              <span className="text-lg font-bold">Event Complete</span>
            </div>
            <p className="text-sm text-muted-foreground">August 20, 2024</p>
          </div>
        </div>
      </motion.div>

      {/* Final Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Final Attendance"
          value={mockEvent.checkedIn}
          change={5.2}
          icon={Users}
          trend="up"
          delay={0.1}
        />
        <MetricCard
          title="Show-up Rate"
          value={showUpRate}
          change={2.8}
          icon={Target}
          suffix="%"
          decimals={1}
          trend="up"
          delay={0.2}
        />
        <MetricCard
          title="Total Revenue"
          value={mockEvent.revenue}
          change={8.7}
          icon={DollarSign}
          prefix="$"
          trend="up"
          delay={0.3}
        />
        <MetricCard
          title="NPS Score"
          value={netPromoterScore}
          change={12.3}
          icon={Star}
          decimals={1}
          trend="up"
          delay={0.4}
        />
      </div>

      {/* Additional Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Engagement"
          value={totalEngagement}
          change={25.4}
          icon={TrendingUp}
          trend="up"
          delay={0.5}
        />
        <MetricCard
          title="Return on Ad Spend"
          value={roas}
          change={18.9}
          icon={BarChart3}
          suffix="x"
          decimals={1}
          trend="up"
          delay={0.6}
        />
        <MetricCard
          title="Repeat Attendees"
          value={34.2}
          change={7.1}
          icon={Award}
          suffix="%"
          decimals={1}
          trend="up"
          delay={0.7}
        />
      </div>

      {/* Analysis Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Attendance vs Ticket Sales" delay={0.8}>
          <AttendanceVsSalesChart />
        </ChartCard>
        
        <ChartCard title="Revenue Breakdown" delay={0.9}>
          <RevenueBreakdownChart />
        </ChartCard>
      </div>

      {/* Analysis Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Audience Engagement Segments" delay={1.0}>
          <AudienceEngagement />
        </ChartCard>
        
        <ChartCard title="Satisfaction Scores by Category" delay={1.1}>
          <SatisfactionScores />
        </ChartCard>
      </div>

      {/* Key Learnings & Recommendations */}
      <motion.div
        className="festival-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <h3 className="text-xl font-semibold text-foreground mb-6">Key Insights & Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-accent mb-3">🎯 What Worked Well</h4>
            {[
              'High VIP engagement and satisfaction scores',
              'Strong social media buzz throughout the event',
              'Excellent vendor performance and sustainability scores',
              'Smooth check-in process with minimal wait times'
            ].map((insight, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg bg-accent/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
              >
                <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
                <span className="text-sm text-foreground">{insight}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-primary mb-3">🚀 Areas for Improvement</h4>
            {[
              'Optimize food vendor distribution to reduce congestion',
              'Enhance mobile app features for better user experience',
              'Increase early bird marketing for higher conversion rates',
              'Add more interactive elements in secondary stages'
            ].map((recommendation, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg bg-primary/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 + index * 0.1 }}
              >
                <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-sm text-foreground">{recommendation}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Event Summary Report */}
      <motion.div
        className="festival-card p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2.1 }}
      >
        <h3 className="text-xl font-semibold text-foreground mb-4">Generate Full Report</h3>
        <p className="text-muted-foreground mb-6">
          Download a comprehensive PDF report with all analytics and insights
        </p>
        <motion.button
          className="px-8 py-3 gradient-primary text-white rounded-lg font-medium hover:shadow-[var(--shadow-primary)] transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download Report
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PostEvent;