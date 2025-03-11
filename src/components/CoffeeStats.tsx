
import React from 'react';
import { DrinkEntry, COFFEE_PRICE, JUICE_PRICE } from '@/utils/coffeeUtils';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DrinkStatsProps {
  entries: DrinkEntry[];
}

const DrinkStats: React.FC<DrinkStatsProps> = ({ entries }) => {
  // If no entries yet, show empty state
  if (entries.length === 0) {
    return null;
  }

  // Separate entries by type
  const coffeeEntries = entries.filter(entry => entry.type === 'coffee');
  const juiceEntries = entries.filter(entry => entry.type === 'juice');
  
  const totalCoffees = coffeeEntries.length > 0 ? coffeeEntries[0].count : 0;
  const totalJuices = juiceEntries.length > 0 ? juiceEntries[0].count : 0;
  const totalSpent = (coffeeEntries.length > 0 ? coffeeEntries[0].totalSpent : 0) + 
                    (juiceEntries.length > 0 ? juiceEntries[0].totalSpent : 0);
  
  // Calculate average consumption
  const hasEnoughData = entries.length > 5;
  const oldestEntryTimestamp = entries[entries.length - 1]?.timestamp;
  const newestEntryTimestamp = entries[0]?.timestamp;
  
  let averagePerDay = 0;
  let message = '';
  
  if (hasEnoughData && oldestEntryTimestamp) {
    const daysDifference = (newestEntryTimestamp - oldestEntryTimestamp) / (1000 * 60 * 60 * 24);
    averagePerDay = daysDifference > 0 ? (totalCoffees + totalJuices) / daysDifference : (totalCoffees + totalJuices);
    
    if (averagePerDay < 1) {
      message = `About ${(averagePerDay * 7).toFixed(1)} drinks per week`;
    } else if (averagePerDay < 2) {
      message = `About ${averagePerDay.toFixed(1)} drinks per day`;
    } else {
      message = `About ${averagePerDay.toFixed(1)} drinks per day`;
    }
  } else {
    message = 'Add more drinks to see your consumption patterns';
  }

  // Prepare chart data
  // Group by day for the last 7 days
  const last7Days = new Map();
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dayStr = date.toLocaleDateString('en-US', { weekday: 'short' });
    last7Days.set(dayStr, { name: dayStr, coffee: 0, juice: 0 });
  }
  
  // Fill in the data
  entries.forEach(entry => {
    const date = new Date(entry.timestamp);
    const dayStr = date.toLocaleDateString('en-US', { weekday: 'short' });
    if (last7Days.has(dayStr)) {
      const dayData = last7Days.get(dayStr);
      if (entry.type === 'coffee') {
        dayData.coffee += COFFEE_PRICE;
      } else {
        dayData.juice += JUICE_PRICE;
      }
    }
  });
  
  const chartData = Array.from(last7Days.values()).reverse();

  return (
    <div className="glass rounded-3xl p-6 subtle-shadow">
      <h3 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-wide">
        Your Drink Stats
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
      
      {chartData.some(day => day.coffee > 0 || day.juice > 0) && (
        <div className="h-36 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} stackOffset="sign">
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
                formatter={(value: any) => [`${value} DHS`, '']}
              />
              <Legend />
              <Bar 
                dataKey="coffee" 
                name="Coffee"
                fill="#8B6E4F" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              <Bar 
                dataKey="juice" 
                name="Orange Juice"
                fill="#F97316" 
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

export default DrinkStats;
