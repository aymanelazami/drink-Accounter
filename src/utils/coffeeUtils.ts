
import { useState, useEffect } from 'react';

// Price of one coffee in DHS
export const COFFEE_PRICE = 8;

// Define types for our coffee data
export interface CoffeeEntry {
  id: string;
  timestamp: number;
  count: number;
  totalSpent: number;
}

// Local storage key
const COFFEE_STORAGE_KEY = 'coffee-tracker-data';

// Get data from local storage
export const getCoffeeData = (): CoffeeEntry[] => {
  try {
    const storedData = localStorage.getItem(COFFEE_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error retrieving coffee data:', error);
    return [];
  }
};

// Save data to local storage
export const saveCoffeeData = (data: CoffeeEntry[]): void => {
  try {
    localStorage.setItem(COFFEE_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving coffee data:', error);
  }
};

// Add a new coffee entry
export const addCoffeeEntry = (currentEntries: CoffeeEntry[]): CoffeeEntry[] => {
  const lastEntry = currentEntries[0] || { count: 0, totalSpent: 0 };
  
  const newEntry: CoffeeEntry = {
    id: generateId(),
    timestamp: Date.now(),
    count: lastEntry.count + 1,
    totalSpent: lastEntry.totalSpent + COFFEE_PRICE
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

// Custom hook for coffee data
export const useCoffeeData = () => {
  const [coffeeData, setCoffeeData] = useState<CoffeeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load data on mount
  useEffect(() => {
    setCoffeeData(getCoffeeData());
    setIsLoading(false);
  }, []);
  
  // Save data when it changes
  useEffect(() => {
    if (!isLoading) {
      saveCoffeeData(coffeeData);
    }
  }, [coffeeData, isLoading]);
  
  // Add a coffee
  const addCoffee = () => {
    setCoffeeData(prev => addCoffeeEntry(prev));
  };
  
  // Reset all data
  const resetData = () => {
    setCoffeeData([]);
  };
  
  // Get current stats
  const coffeeStats = {
    count: coffeeData[0]?.count || 0,
    totalSpent: coffeeData[0]?.totalSpent || 0
  };
  
  return { coffeeData, coffeeStats, addCoffee, resetData, isLoading };
};
