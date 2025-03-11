
import React from 'react';
import CoffeeCounter from '@/components/CoffeeCounter';
import CoffeeHistory from '@/components/CoffeeHistory';
import CoffeeStats from '@/components/CoffeeStats';
import { useCoffeeData } from '@/utils/coffeeUtils';
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
  const { coffeeData, coffeeStats, addCoffee, resetData } = useCoffeeData();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-accent/50 to-background">
      {/* Header */}
      <header className="w-full py-6 mb-4 px-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-xl font-medium tracking-tight">Daily Brew</div>
            <div className="ml-2 px-2 py-1 bg-coffee-light/20 rounded-full text-xs text-coffee-dark">
              8 DHS
            </div>
          </div>
          
          {coffeeData.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <RotateCcwIcon className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="glass">
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset coffee counter?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will delete all your coffee history. This action cannot be undone.
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

      <main className="flex-1 w-full pb-8 px-6">
        <div className="max-w-4xl mx-auto grid gap-6">
          {/* Main counter */}
          <div className="animate-fade-in">
            <CoffeeCounter 
              count={coffeeStats.count} 
              totalSpent={coffeeStats.totalSpent} 
              onAddCoffee={addCoffee} 
            />
          </div>
          
          {/* Stats and history section */}
          <div className="grid md:grid-cols-2 gap-6 animate-fade-up" 
               style={{ animationDelay: '0.2s' }}>
            <CoffeeStats entries={coffeeData} />
            <CoffeeHistory entries={coffeeData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
