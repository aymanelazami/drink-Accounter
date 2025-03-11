
import React from 'react';
import CoffeeCounter from '@/components/CoffeeCounter';
import CoffeeHistory from '@/components/CoffeeHistory';
import CoffeeStats from '@/components/CoffeeStats';
import { useDrinkData } from '@/utils/coffeeUtils';
import { Button } from '@/components/ui/button';
import { RotateCcwIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Index = () => {
  const { 
    drinkData, 
    coffeeStats, 
    juiceStats, 
    coffeeCreamStats,
    coffeePrestigeStats,
    sodaStats,
    totalStats, 
    addDrink, 
    resetData 
  } = useDrinkData();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-accent/50 to-background">
      {/* Header */}
      <header className="w-full py-4 sm:py-6 mb-2 sm:mb-4 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="text-xl font-medium tracking-tight">Daily Brew</div>
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <div className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-coffee-light/20 rounded-full text-[10px] sm:text-xs text-coffee-dark">
                Coffee: 8 DHS
              </div>
              <div className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-amber-500/20 rounded-full text-[10px] sm:text-xs text-amber-600">
                Coffee w/Cream: 10 DHS
              </div>
              <div className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-amber-700/20 rounded-full text-[10px] sm:text-xs text-amber-700">
                Coffee Prestige: 10 DHS
              </div>
              <div className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-orange-300/30 rounded-full text-[10px] sm:text-xs text-orange-600">
                Juice: 12 DHS
              </div>
              <div className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-red-300/30 rounded-full text-[10px] sm:text-xs text-red-600">
                Soda: 12 DHS
              </div>
            </div>
          </div>
          
          {drinkData.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <RotateCcwIcon className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="glass max-w-[90vw] sm:max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset drink counter?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will delete all your drink history. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-0">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={resetData} className="bg-coffee-dark">
                    Reset
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </header>

      <main className="flex-1 w-full pb-6 sm:pb-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid gap-4 sm:gap-6">
          {/* Main counter */}
          <div className="animate-fade-in">
            <CoffeeCounter 
              coffeeCount={coffeeStats.count} 
              juiceCount={juiceStats.count}
              totalSpent={totalStats.totalSpent} 
              onAddDrink={addDrink} 
            />
          </div>
          
          {/* Stats and history section */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 animate-fade-up" 
               style={{ animationDelay: '0.2s' }}>
            <CoffeeStats entries={drinkData} />
            <CoffeeHistory entries={drinkData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
