import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  TrendingUp, 
  Filter, 
  Target, 
  BarChart3,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'action' | 'data';
}

interface AIChatbotProps {
  onFilterChange?: (filters: any) => void;
  onMetricUpdate?: (metric: string, value: number) => void;
  className?: string;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ 
  onFilterChange, 
  onMetricUpdate,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions = [
    { label: 'Show ticket sales trend', icon: TrendingUp, action: 'show_sales_trend' },
    { label: 'Filter by last month', icon: Filter, action: 'filter_last_month' },
    { label: 'Update revenue target', icon: Target, action: 'update_revenue' },
    { label: 'Explain top metric', icon: BarChart3, action: 'explain_metrics' },
  ];

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('ai-chat-history');
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages);
      setMessages(parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    } else {
      // Welcome message for new users
      setMessages([{
        id: '1',
        content: "Hi! I'm your Festivity Insight AI assistant. I can help you understand your data, update filters, and explain metrics. What would you like to know?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }]);
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('ai-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const generateResponse = (userMessage: string): Message => {
    const message = userMessage.toLowerCase();
    let response = '';
    let type: 'text' | 'action' | 'data' = 'text';

    // Analyze user message and provide intelligent responses
    if (message.includes('sales') || message.includes('revenue') || message.includes('ticket')) {
      if (message.includes('trend') || message.includes('show')) {
        response = "Here's your ticket sales trend analysis: Sales have increased 12.5% compared to last month, with VIP tickets showing the strongest growth at 18.2%. The peak sales period was between 2-4 PM today.";
        type = 'data';
      } else if (message.includes('total') || message.includes('how much')) {
        response = "Your current total revenue is $287,450 from 4,532 tickets sold. This represents 94% of your target, putting you on track to exceed projections by 8%.";
        type = 'data';
      } else {
        response = "Your ticket sales are performing excellently! Revenue is up 12.5% with strong VIP performance. Would you like me to show you the sales trend or break down by ticket category?";
      }
    } else if (message.includes('filter') || message.includes('show only') || message.includes('last month')) {
      if (message.includes('last month') || message.includes('month')) {
        response = "I've updated your filters to show data from the last month. The dashboard now displays metrics from " + new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString() + " to today.";
        type = 'action';
        // Trigger filter change
        onFilterChange?.({
          dateRange: {
            from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            to: new Date()
          }
        });
      } else {
        response = "I can help you filter your data by date range, location, ticket type, or event type. What specific filter would you like to apply?";
      }
    } else if (message.includes('target') || message.includes('update') || message.includes('goal')) {
      if (message.includes('revenue')) {
        response = "I can help you update your revenue target. What should the new target be? Current target is $305,000.";
        type = 'action';
      } else {
        response = "I can update various targets for you - revenue, attendance, or conversion rate goals. Which would you like to modify?";
      }
    } else if (message.includes('explain') || message.includes('what') || message.includes('meaning')) {
      response = "Your top metrics show strong performance: \n\n📈 **Total Attendees (8,432)** - Up 8.2% from last period\n💰 **Revenue ($287,450)** - 94% of target, trending to exceed goals\n🎫 **Tickets Sold (4,532)** - Strong conversion rate at 89.4%\n👑 **VIP Attendees (856)** - Premium segment showing 18% growth\n\nThe check-in rate of 78.2% is healthy, and your top market (New York) represents 23% of total sales.";
      type = 'data';
    } else if (message.includes('help') || message.includes('what can you do')) {
      response = "I can help you with:\n\n🔍 **Data Analysis** - Explain metrics and trends\n📊 **Filtering** - Update date ranges, locations, ticket types\n🎯 **Goal Setting** - Update revenue and attendance targets\n📈 **Insights** - Identify opportunities and patterns\n🔧 **Dashboard** - Customize layout and visibility\n\nTry asking me things like 'Show sales trend' or 'Filter by VIP tickets'.";
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      response = "Hello! I'm here to help you get the most out of your event analytics. You can ask me about your data, update filters, or get insights about performance. What would you like to explore?";
    } else {
      // Generic intelligent response
      response = "I understand you're asking about " + userMessage + ". Let me help you with that. Could you be more specific about what data or insights you're looking for? I can analyze sales, attendance, demographics, or any other metrics.";
    }

    return {
      id: Date.now().toString(),
      content: response,
      sender: 'bot',
      timestamp: new Date(),
      type
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const response = generateResponse(inputValue);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // 1-3 second delay
  };

  const handleQuickAction = (action: string) => {
    let message = '';
    switch (action) {
      case 'show_sales_trend':
        message = 'Show me the ticket sales trend';
        break;
      case 'filter_last_month':
        message = 'Filter data by last month';
        break;
      case 'update_revenue':
        message = 'Update revenue target';
        break;
      case 'explain_metrics':
        message = 'Explain the top metrics';
        break;
    }
    setInputValue(message);
    handleSendMessage();
  };

  const formatMessageContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className={`fixed bottom-4 right-4 z-50 ${className}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        data-tour="ai-chat"
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg bg-gradient-to-r from-primary to-secondary hover:shadow-[var(--shadow-glow)] transition-all duration-300"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] md:w-96"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <Card className="shadow-2xl">
              {/* Chat Header */}
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8 gradient-primary">
                      <AvatarFallback className="text-white">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Festivity AI</CardTitle>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        <span className="text-xs text-muted-foreground">Online</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMinimized(!isMinimized)}
                    >
                      {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {!isMinimized && (
                <CardContent className="p-0">
                  {/* Messages */}
                  <ScrollArea className="h-80 px-4">
                    <div className="space-y-4 pb-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={`flex items-start space-x-2 max-w-[80%] ${
                            message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                          }`}>
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className={`text-xs ${
                                message.sender === 'user' 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'gradient-primary text-white'
                              }`}>
                                {message.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`rounded-lg px-3 py-2 ${
                              message.sender === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}>
                              <div 
                                className="text-sm"
                                dangerouslySetInnerHTML={{ 
                                  __html: formatMessageContent(message.content) 
                                }}
                              />
                              <div className="text-xs opacity-70 mt-1">
                                {message.timestamp.toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      {/* Typing Indicator */}
                      {isTyping && (
                        <motion.div
                          className="flex justify-start"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="gradient-primary text-white text-xs">
                                <Bot className="w-3 h-3" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="bg-muted rounded-lg px-3 py-2">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Quick Actions */}
                  <div className="px-4 py-2 border-t">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {quickActions.map((action) => (
                        <Button
                          key={action.action}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAction(action.action)}
                          className="flex items-center space-x-1 text-xs"
                        >
                          <action.icon className="w-3 h-3" />
                          <span>{action.label}</span>
                        </Button>
                      ))}
                    </div>

                    {/* Input Area */}
                    <div className="flex space-x-2">
                      <Input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask me about your event data..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        size="sm"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};