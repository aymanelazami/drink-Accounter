
import React from 'react';
import { formatDate, DrinkEntry, getDrinkName } from '@/utils/coffeeUtils';
import { motion } from 'framer-motion';

interface DrinkHistoryProps {
  entries: DrinkEntry[];
}

const DrinkHistory: React.FC<DrinkHistoryProps> = ({ entries }) => {
  if (entries.length === 0) {
    return (
      <div className="glass rounded-3xl p-6 subtle-shadow text-center">
        <p className="text-muted-foreground text-sm">
          Your drink history will appear here after you add drinks.
        </p>
      </div>
    );
  }
  
  return (
    <div className="glass rounded-3xl p-6 subtle-shadow">
      <h3 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-wide">
        Recent History
      </h3>
      
      <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
        {entries.map((entry, index) => {
          const isLatest = index === 0;
          const drinkName = getDrinkName(entry.type);
          
          // Define background colors based on drink type
          let bgColor;
          switch(entry.type) {
            case 'coffee':
              bgColor = isLatest ? 'bg-coffee-dark animate-pulse-soft' : 'bg-coffee-light';
              break;
            case 'juice':
              bgColor = isLatest ? 'bg-orange-500 animate-pulse-soft' : 'bg-orange-300';
              break;
            case 'coffee-cream':
              bgColor = isLatest ? 'bg-amber-500 animate-pulse-soft' : 'bg-amber-300';
              break;
            case 'coffee-prestige':
              bgColor = isLatest ? 'bg-amber-700 animate-pulse-soft' : 'bg-amber-600';
              break;
            case 'soda':
              bgColor = isLatest ? 'bg-red-500 animate-pulse-soft' : 'bg-red-300';
              break;
            default:
              bgColor = isLatest ? 'bg-gray-500 animate-pulse-soft' : 'bg-gray-300';
          }
          
          return (
            <div 
              key={entry.id} 
              className={`flex items-center justify-between p-3 rounded-xl transition-all
                      ${isLatest ? 'bg-secondary/50' : 'hover:bg-secondary/30'}`}
            >
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${bgColor}`} />
                <div>
                  <div className="text-sm font-medium">{drinkName} #{entry.count}</div>
                  <div className="text-xs text-muted-foreground">{formatDate(entry.timestamp)}</div>
                </div>
              </div>
              <div className="text-sm font-medium">{entry.totalSpent} DHS</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DrinkHistory;
