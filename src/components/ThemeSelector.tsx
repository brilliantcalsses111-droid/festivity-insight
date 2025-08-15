import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sun, Moon } from 'lucide-react';
import { useTheme, Theme, Mode } from './ThemeProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const themes: { name: Theme; color: string; label: string }[] = [
  { name: 'default', color: 'hsl(260, 73%, 62%)', label: 'Festival Purple' },
  { name: 'green', color: 'hsl(142, 76%, 36%)', label: 'Forest Green' },
  { name: 'blue', color: 'hsl(210, 100%, 65%)', label: 'Ocean Blue' },
  { name: 'purple', color: 'hsl(280, 73%, 62%)', label: 'Royal Purple' },
  { name: 'orange', color: 'hsl(25, 95%, 53%)', label: 'Sunset Orange' },
  { name: 'red', color: 'hsl(0, 84%, 60%)', label: 'Cherry Red' },
  { name: 'pink', color: 'hsl(330, 81%, 60%)', label: 'Cotton Candy' },
  { name: 'yellow', color: 'hsl(45, 93%, 47%)', label: 'Golden Sun' },
];

const modes: { name: Mode; icon: React.ComponentType<any>; label: string }[] = [
  { name: 'light', icon: Sun, label: 'Light Mode' },
  { name: 'dark', icon: Moon, label: 'Dark Mode' },
];

export const ThemeSelector: React.FC = () => {
  const { theme, mode, setTheme, setMode } = useTheme();

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Appearance Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {modes.map((modeOption) => (
              <Button
                key={modeOption.name}
                variant={mode === modeOption.name ? "default" : "outline"}
                onClick={() => setMode(modeOption.name)}
                className="flex items-center gap-2"
              >
                <modeOption.icon className="w-4 h-4" />
                {modeOption.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Theme Color Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Color Themes</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose your preferred color scheme for the dashboard
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {themes.map((themeOption) => (
              <motion.div
                key={themeOption.name}
                className="relative cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(themeOption.name)}
              >
                <div
                  className="w-16 h-16 rounded-full border-4 border-border flex items-center justify-center transition-all duration-200 hover:border-primary"
                  style={{ backgroundColor: themeOption.color }}
                >
                  {theme === themeOption.name && (
                    <Check className="w-6 h-6 text-white" />
                  )}
                </div>
                <p className="text-xs text-center mt-2 text-muted-foreground">
                  {themeOption.label}
                </p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="festival-card p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Sample Dashboard Card</h3>
              <Button size="sm" className="gradient-primary">
                Action
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="metric-card p-4">
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold text-primary">1,234</p>
              </div>
              <div className="metric-card p-4">
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold text-secondary">$45,678</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};