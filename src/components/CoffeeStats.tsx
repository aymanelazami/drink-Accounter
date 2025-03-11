
import React from 'react';
import { CoffeeEntry, COFFEE_PRICE } from '@/utils/coffeeUtils';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface CoffeeStatsProps {
  entries: CoffeeEntry[];
}

const CoffeeStats: React.FC<CoffeeStatsProps> = ({ entries }) => {
  // If no entries yet, show empty state
  if (entries.length === 0) {
    return null;
  }

  const totalCoffees = entries[0]?.count || 0;
  const totalSpent = entries[0]?.totalSpent || 0;
  
  // Calculate average consumption (weekly if enough data)
  const hasEnoughData = entries.length > 5;
  const oldestEntryTimestamp = entries[entries.length - 1]?.timestamp;
  const newestEntryTimestamp = entries[0]?.timestamp;
  
  let averagePerDay = 0;
  let message = '';
  
  if (hasEnoughData && oldestEntryTimestamp) {
    const daysDifference = (newestEntryTimestamp - oldestEntryTimestamp) / (1000 * 60 * 60 * 24);
    averagePerDay = daysDifference > 0 ? totalCoffees / daysDifference : totalCoffees;
    
    if (averagePerDay < 1) {
      message = `About ${(averagePerDay * 7).toFixed(1)} coffees per week`;
    } else if (averagePerDay < 2) {
      message = `About ${averagePerDay.toFixed(1)} coffees per day`;
    } else {
      message = `About ${averagePerDay.toFixed(1)} coffees per day`;
    }
  } else {
    message = 'Add more coffees to see your consumption patterns';
  }

  // Prepare chart data - last 7 entries (excluding current total)
  const chartData = entries.slice(1, 8).map(entry => ({
    name: new Date(entry.timestamp).toLocaleDateString('en-US', { weekday: 'short' }),
    count: entry.count,
    amount: entry.totalSpent
  })).reverse();

  return (
    <div className="glass rounded-3xl p-6 subtle-shadow">
      <h3 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-wide">
        Your Coffee Stats
      </h3>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Card className="bg-secondary/50 border-0">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground mb-1">Monthly Spending</div>
            <div className="text-2xl font-light">{totalSpent} DHS</div>
          </CardContent>
        </Card>
        <Card className="bg-secondary/50 border-0">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground mb-1">Consumption</div>
            <div className="text-sm font-medium">{message}</div>
          </CardContent>
        </Card>
      </div>
      
      {chartData.length > 1 && (
        <div className="h-36 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                hide={true} 
                domain={[0, 'dataMax + 5']}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                }}
                formatter={(value: any) => [`${value} DHS`, 'Amount']}
                labelFormatter={(label) => `${label}`}
              />
              <Bar 
                dataKey="amount" 
                fill="#8B6E4F" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default CoffeeStats;
