import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Shield, Database, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Settings = () => {
  return (
    <div className="space-y-8">
      <motion.div
        className="festival-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure your analytics dashboard and integrations</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[
          { title: 'Notifications', icon: Bell, description: 'Configure alert preferences' },
          { title: 'Security', icon: Shield, description: 'Manage access and permissions' },
          { title: 'Data Sources', icon: Database, description: 'Connect APIs and data feeds' },
          { title: 'User Management', icon: Users, description: 'Manage team access' }
        ].map((setting, index) => (
          <motion.div
            key={setting.title}
            className="festival-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <setting.icon className="w-8 h-8 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">{setting.title}</h3>
                <p className="text-muted-foreground">{setting.description}</p>
              </div>
            </div>
            <Button className="gradient-primary">Configure</Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Settings;