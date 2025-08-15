import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ThumbsUp, ThumbsDown, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface FeedbackSystemProps {
  className?: string;
}

interface FeedbackData {
  helpful: boolean | null;
  feedback: string;
  timestamp: number;
  sessionId: string;
}

export const FeedbackSystem: React.FC<FeedbackSystemProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // Mock analytics function - in real app would connect to analytics service
  const logFeedback = (feedbackData: FeedbackData) => {
    console.log('Feedback logged:', feedbackData);
    
    // Save to localStorage for demo purposes
    const existingFeedback = JSON.parse(localStorage.getItem('user-feedback') || '[]');
    existingFeedback.push(feedbackData);
    localStorage.setItem('user-feedback', JSON.stringify(existingFeedback));
  };

  const handleSubmit = () => {
    if (helpful === null && !feedback.trim()) {
      toast({
        title: "Please provide feedback",
        description: "Rate the dashboard or leave a comment",
        variant: "destructive"
      });
      return;
    }

    const feedbackData: FeedbackData = {
      helpful,
      feedback: feedback.trim(),
      timestamp: Date.now(),
      sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    logFeedback(feedbackData);
    setIsSubmitted(true);

    toast({
      title: "Thank you for your feedback!",
      description: "Your input helps us improve the dashboard experience.",
    });

    // Reset form after a delay
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setHelpful(null);
      setFeedback('');
    }, 2000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setHelpful(null);
    setFeedback('');
    setIsSubmitted(false);
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <motion.div
        className={`fixed bottom-20 right-4 z-50 ${className}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3, type: 'spring', stiffness: 200 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg gradient-primary hover:shadow-[var(--shadow-primary)] transition-all duration-300"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Feedback Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">
                    {isSubmitted ? 'Thank You!' : 'Quick Feedback'}
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={handleClose}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!isSubmitted ? (
                    <>
                      {/* Quick Poll */}
                      <div className="space-y-3">
                        <p className="text-sm font-medium">Was this dashboard helpful?</p>
                        <div className="flex space-x-3">
                          <Button
                            variant={helpful === true ? "default" : "outline"}
                            onClick={() => setHelpful(true)}
                            className="flex items-center space-x-2 flex-1"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span>Yes</span>
                          </Button>
                          <Button
                            variant={helpful === false ? "default" : "outline"}
                            onClick={() => setHelpful(false)}
                            className="flex items-center space-x-2 flex-1"
                          >
                            <ThumbsDown className="w-4 h-4" />
                            <span>No</span>
                          </Button>
                        </div>
                      </div>

                      {/* Optional Feedback */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium">
                          Suggestions? (optional)
                        </label>
                        <Textarea
                          placeholder="Tell us how we can improve..."
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          rows={3}
                          className="resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        onClick={handleSubmit}
                        className="w-full flex items-center space-x-2"
                        disabled={helpful === null && !feedback.trim()}
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Feedback</span>
                      </Button>
                    </>
                  ) : (
                    <motion.div
                      className="text-center py-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center">
                        <ThumbsUp className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-lg font-semibold mb-2">Feedback Received!</p>
                      <p className="text-sm text-muted-foreground">
                        Your input helps us make the dashboard better.
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};