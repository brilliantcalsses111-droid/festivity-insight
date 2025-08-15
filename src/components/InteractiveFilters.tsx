import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Ticket, Filter, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export interface FilterState {
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  location: string[];
  ticketType: string[];
  eventType: string[];
}

interface InteractiveFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

const locationOptions = [
  'New York, NY',
  'Los Angeles, CA', 
  'Chicago, IL',
  'Miami, FL',
  'Austin, TX',
  'Nashville, TN',
  'Denver, CO',
  'Seattle, WA'
];

const ticketTypeOptions = [
  'General Admission',
  'VIP',
  'Premium',
  'Early Bird',
  'Student',
  'Group',
  'Corporate'
];

const eventTypeOptions = [
  'Music Festival',
  'Conference',
  'Workshop',
  'Concert',
  'Exhibition',
  'Networking',
  'Awards Ceremony'
];

export const InteractiveFilters: React.FC<InteractiveFiltersProps> = ({
  onFiltersChange,
  className = ''
}) => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { from: null, to: null },
    location: [],
    ticketType: [],
    eventType: []
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Load saved filters from localStorage
    const savedFilters = localStorage.getItem('dashboard-filters');
    if (savedFilters) {
      const parsed = JSON.parse(savedFilters);
      // Convert date strings back to Date objects
      if (parsed.dateRange.from) {
        parsed.dateRange.from = new Date(parsed.dateRange.from);
      }
      if (parsed.dateRange.to) {
        parsed.dateRange.to = new Date(parsed.dateRange.to);
      }
      setFilters(parsed);
      onFiltersChange(parsed);
    }
  }, [onFiltersChange]);

  const updateFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    onFiltersChange(newFilters);
    localStorage.setItem('dashboard-filters', JSON.stringify(newFilters));
  };

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    const newFilters = {
      ...filters,
      dateRange: {
        from: range.from || null,
        to: range.to || null
      }
    };
    updateFilters(newFilters);
  };

  const handleMultiSelectChange = (
    field: 'location' | 'ticketType' | 'eventType',
    value: string
  ) => {
    const currentValues = filters[field];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)  
      : [...currentValues, value];
    
    const newFilters = { ...filters, [field]: newValues };
    updateFilters(newFilters);
  };

  const resetFilters = () => {
    const resetState: FilterState = {
      dateRange: { from: null, to: null },
      location: [],
      ticketType: [],
      eventType: []
    };
    updateFilters(resetState);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.dateRange.from || filters.dateRange.to) count++;
    if (filters.location.length > 0) count++;
    if (filters.ticketType.length > 0) count++;
    if (filters.eventType.length > 0) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className={`space-y-4 ${className}`} data-tour="filters">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </Button>
        )}
      </div>

      {/* Active Filters Preview */}
      {activeFiltersCount > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex flex-wrap gap-2"
        >
          {filters.dateRange.from && (
            <Badge variant="outline" className="text-xs">
              {format(filters.dateRange.from, 'MMM dd')}
              {filters.dateRange.to && ` - ${format(filters.dateRange.to, 'MMM dd')}`}
            </Badge>
          )}
          {filters.location.map(loc => (
            <Badge key={loc} variant="outline" className="text-xs">
              📍 {loc}
            </Badge>
          ))}
          {filters.ticketType.map(type => (
            <Badge key={type} variant="outline" className="text-xs">
              🎫 {type}
            </Badge>
          ))}
          {filters.eventType.map(type => (
            <Badge key={type} variant="outline" className="text-xs">
              🎪 {type}
            </Badge>
          ))}
        </motion.div>
      )}

      {/* Expanded Filters */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filter Your Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Date Range Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Date Range</span>
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        {filters.dateRange.from ? (
                          filters.dateRange.to ? (
                            <>
                              {format(filters.dateRange.from, "LLL dd")} -{" "}
                              {format(filters.dateRange.to, "LLL dd")}
                            </>
                          ) : (
                            format(filters.dateRange.from, "LLL dd")
                          )
                        ) : (
                          "Pick a date range"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="range"
                        selected={{
                          from: filters.dateRange.from || undefined,
                          to: filters.dateRange.to || undefined
                        }}
                        onSelect={handleDateRangeChange}
                        numberOfMonths={2}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Location Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Location</span>
                  </label>
                  <Select onValueChange={(value) => handleMultiSelectChange('location', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={
                        filters.location.length > 0 
                          ? `${filters.location.length} selected`
                          : "Select locations"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {locationOptions.map(option => (
                        <SelectItem key={option} value={option}>
                          <div className="flex items-center space-x-2">
                            <span>{option}</span>
                            {filters.location.includes(option) && (
                              <Badge variant="secondary" className="text-xs">✓</Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Ticket Type Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <Ticket className="w-4 h-4" />
                    <span>Ticket Type</span>
                  </label>
                  <Select onValueChange={(value) => handleMultiSelectChange('ticketType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={
                        filters.ticketType.length > 0
                          ? `${filters.ticketType.length} selected`
                          : "Select ticket types"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {ticketTypeOptions.map(option => (
                        <SelectItem key={option} value={option}>
                          <div className="flex items-center space-x-2">
                            <span>{option}</span>
                            {filters.ticketType.includes(option) && (
                              <Badge variant="secondary" className="text-xs">✓</Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Event Type Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Event Type</span>
                  </label>
                  <Select onValueChange={(value) => handleMultiSelectChange('eventType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={
                        filters.eventType.length > 0
                          ? `${filters.eventType.length} selected`
                          : "Select event types"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypeOptions.map(option => (
                        <SelectItem key={option} value={option}>
                          <div className="flex items-center space-x-2">
                            <span>{option}</span>
                            {filters.eventType.includes(option) && (
                              <Badge variant="secondary" className="text-xs">✓</Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};