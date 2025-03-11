
import { useState, useEffect } from 'react';

// Prices in DHS
export const COFFEE_PRICE = 8;
export const JUICE_PRICE = 12;

// Drink types
export type DrinkType = 'coffee' | 'juice';

// Define types for our drink entries
export interface DrinkEntry {
  id: string;
  timestamp: number;
  count: number;
  totalSpent: number;
  type: DrinkType;
}

// Local storage key
const DRINKS_STORAGE_KEY = 'drink-tracker-data';

// Get data from local storage
export const getDrinkData = (): DrinkEntry[] => {
  try {
    const storedData = localStorage.getItem(DRINKS_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error retrieving drink data:', error);
    return [];
  }
};

// Save data to local storage
export const saveDrinkData = (data: DrinkEntry[]): void => {
  try {
    localStorage.setItem(DRINKS_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving drink data:', error);
  }
};

// Add a new drink entry
export const addDrinkEntry = (currentEntries: DrinkEntry[], type: DrinkType): DrinkEntry[] => {
  const price = type === 'coffee' ? COFFEE_PRICE : JUICE_PRICE;
  
  // Get the latest count for this type of drink
  const lastEntryOfType = currentEntries.find(entry => entry.type === type);
  const lastCount = lastEntryOfType ? lastEntryOfType.count : 0;
  const lastTotal = lastEntryOfType ? lastEntryOfType.totalSpent : 0;
  
  const newEntry: DrinkEntry = {
    id: generateId(),
    timestamp: Date.now(),
    count: lastCount + 1,
    totalSpent: lastTotal + price,
    type
  };
  
  return [newEntry, ...currentEntries];
};

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Format a date
export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get the drink name for display
export const getDrinkName = (type: DrinkType): string => {
  return type === 'coffee' ? 'Coffee' : 'Orange Juice';
};

// Get drink price
export const getDrinkPrice = (type: DrinkType): number => {
  return type === 'coffee' ? COFFEE_PRICE : JUICE_PRICE;
};

// Custom hook for drink data
export const useDrinkData = () => {
  const [drinkData, setDrinkData] = useState<DrinkEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load data on mount
  useEffect(() => {
    setDrinkData(getDrinkData());
    setIsLoading(false);
  }, []);
  
  // Save data when it changes
  useEffect(() => {
    if (!isLoading) {
      saveDrinkData(drinkData);
    }
  }, [drinkData, isLoading]);
  
  // Add a drink
  const addDrink = (type: DrinkType) => {
    setDrinkData(prev => addDrinkEntry(prev, type));
  };
  
  // Reset all data
  const resetData = () => {
    setDrinkData([]);
  };
  
  // Get stats for each drink type
  const coffeeEntries = drinkData.filter(entry => entry.type === 'coffee');
  const juiceEntries = drinkData.filter(entry => entry.type === 'juice');
  
  const coffeeStats = {
    count: coffeeEntries.length > 0 ? coffeeEntries[0].count : 0,
    totalSpent: coffeeEntries.length > 0 ? coffeeEntries[0].totalSpent : 0
  };
  
  const juiceStats = {
    count: juiceEntries.length > 0 ? juiceEntries[0].count : 0,
    totalSpent: juiceEntries.length > 0 ? juiceEntries[0].totalSpent : 0
  };
  
  const totalStats = {
    count: coffeeStats.count + juiceStats.count,
    totalSpent: coffeeStats.totalSpent + juiceStats.totalSpent
  };
  
  return { 
    drinkData, 
    coffeeStats, 
    juiceStats, 
    totalStats,
    addDrink,
    resetData, 
    isLoading 
  };
};
