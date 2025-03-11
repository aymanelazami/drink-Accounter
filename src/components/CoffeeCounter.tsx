
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon } from 'lucide-react';
import AnimatedCoffee from './AnimatedCoffee';
import { DrinkType, getDrinkName, getDrinkPrice } from '@/utils/coffeeUtils';
import { useToast } from "@/hooks/use-toast";

interface DrinkCounterProps {
  coffeeCount: number;
  juiceCount: number;
  totalSpent: number;
  onAddDrink: (type: DrinkType) => void;
}

const DrinkCounter: React.FC<DrinkCounterProps> = ({ 
  coffeeCount, 
  juiceCount, 
  totalSpent, 
  onAddDrink 
}) => {
  const [showCoffeeAnimation, setShowCoffeeAnimation] = useState(false);
  const [showJuiceAnimation, setShowJuiceAnimation] = useState(false);
  const { toast } = useToast();
  
  const handleAddDrink = (type: DrinkType) => {
    if (type === 'coffee') {
      setShowCoffeeAnimation(true);
      setTimeout(() => setShowCoffeeAnimation(false), 2000);
    } else {
      setShowJuiceAnimation(true);
      setTimeout(() => setShowJuiceAnimation(false), 2000);
    }
    
    onAddDrink(type);
    
    const newCount = type === 'coffee' ? coffeeCount + 1 : juiceCount + 1;
    const price = getDrinkPrice(type);
    const name = getDrinkName(type);
    
    toast({
      title: `${name} added`,
      description: `You've now had ${newCount} ${name.toLowerCase()}s for a total of ${type === 'coffee' ? coffeeCount * price + price : juiceCount * price + price} DHS`,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass rounded-3xl p-8 subtle-shadow">
        <div className="space-y-8">
          {/* Coffee animation */}
          <div className="flex justify-center -mt-4 mb-2">
            <AnimatedCoffee showAnimation={showCoffeeAnimation} size="lg" />
          </div>
          
          {/* Stats display */}
          <div className="text-center space-y-1">
            <div className="text-xs uppercase tracking-wide text-muted-foreground animate-fade-in">
              Total drinks
            </div>
            <div className="text-5xl font-light animate-fade-up">
              {coffeeCount + juiceCount}
            </div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mt-4 animate-fade-in">
              Total spent
            </div>
            <div className="text-3xl font-light animate-fade-up">
              {totalSpent} <span className="text-sm">DHS</span>
            </div>
          </div>
          
          {/* Drink buttons */}
          <div className="pt-4 space-y-4">
            <Button 
              onClick={() => handleAddDrink('coffee')}
              className="w-full h-14 rounded-2xl bg-coffee-dark hover:bg-coffee-darkest
                       text-white transition-all duration-300 transform hover:scale-[1.02]
                       active:scale-[0.98]"
            >
              <PlusIcon className="mr-2 h-5 w-5" />
              Add Coffee <span className="ml-2 opacity-80">• {getDrinkPrice('coffee')} DHS</span>
            </Button>
            
            <Button 
              onClick={() => handleAddDrink('juice')}
              className="w-full h-14 rounded-2xl bg-orange-500 hover:bg-orange-600
                       text-white transition-all duration-300 transform hover:scale-[1.02]
                       active:scale-[0.98]"
            >
              <PlusIcon className="mr-2 h-5 w-5" />
              Add Orange Juice <span className="ml-2 opacity-80">• {getDrinkPrice('juice')} DHS</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkCounter;
