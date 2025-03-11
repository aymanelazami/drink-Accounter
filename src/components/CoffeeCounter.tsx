
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon, CoffeeIcon, WineIcon, CupSoda, Milk } from 'lucide-react';
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
    } else if (type === 'juice') {
      setShowJuiceAnimation(true);
      setTimeout(() => setShowJuiceAnimation(false), 2000);
    }
    
    onAddDrink(type);
    
    const name = getDrinkName(type);
    const price = getDrinkPrice(type);
    
    toast({
      title: `${name} added`,
      description: `Added ${name} for ${price} DHS`,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass rounded-3xl p-5 sm:p-8 subtle-shadow">
        <div className="space-y-6 sm:space-y-8">
          {/* Coffee animation */}
          <div className="flex justify-center -mt-2 sm:-mt-4 mb-1 sm:mb-2">
            <AnimatedCoffee showAnimation={showCoffeeAnimation} size="lg" />
          </div>
          
          {/* Stats display */}
          <div className="text-center space-y-1">
            <div className="text-xs uppercase tracking-wide text-muted-foreground animate-fade-in">
              Total drinks
            </div>
            <div className="text-4xl sm:text-5xl font-light animate-fade-up">
              {totalSpent / 10}
            </div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mt-3 sm:mt-4 animate-fade-in">
              Total spent
            </div>
            <div className="text-2xl sm:text-3xl font-light animate-fade-up">
              {totalSpent} <span className="text-sm">DHS</span>
            </div>
          </div>
          
          {/* Drink buttons */}
          <div className="pt-3 sm:pt-4 space-y-3 sm:space-y-4">
            <Button 
              onClick={() => handleAddDrink('coffee')}
              className="w-full h-12 sm:h-14 rounded-2xl bg-coffee-dark hover:bg-coffee-darkest
                       text-white transition-all duration-300 transform hover:scale-[1.02]
                       active:scale-[0.98] text-xs sm:text-sm"
            >
              <CoffeeIcon className="mr-1 sm:mr-2 h-4 sm:h-5 w-4 sm:w-5" />
              Add Coffee <span className="ml-1 sm:ml-2 opacity-80">• {getDrinkPrice('coffee')} DHS</span>
            </Button>
            
            <Button 
              onClick={() => handleAddDrink('coffee-cream')}
              className="w-full h-12 sm:h-14 rounded-2xl bg-coffee-light hover:bg-coffee-dark
                       text-white transition-all duration-300 transform hover:scale-[1.02]
                       active:scale-[0.98] text-xs sm:text-sm"
            >
              <Milk className="mr-1 sm:mr-2 h-4 sm:h-5 w-4 sm:w-5" />
              Coffee with Cream <span className="ml-1 sm:ml-2 opacity-80">• {getDrinkPrice('coffee-cream')} DHS</span>
            </Button>
            
            <Button 
              onClick={() => handleAddDrink('coffee-prestige')}
              className="w-full h-12 sm:h-14 rounded-2xl bg-amber-700 hover:bg-amber-800
                       text-white transition-all duration-300 transform hover:scale-[1.02]
                       active:scale-[0.98] text-xs sm:text-sm"
            >
              <CoffeeIcon className="mr-1 sm:mr-2 h-4 sm:h-5 w-4 sm:w-5" />
              Coffee Prestige <span className="ml-1 sm:ml-2 opacity-80">• {getDrinkPrice('coffee-prestige')} DHS</span>
            </Button>
            
            <Button 
              onClick={() => handleAddDrink('juice')}
              className="w-full h-12 sm:h-14 rounded-2xl bg-orange-500 hover:bg-orange-600
                       text-white transition-all duration-300 transform hover:scale-[1.02]
                       active:scale-[0.98] text-xs sm:text-sm"
            >
              <WineIcon className="mr-1 sm:mr-2 h-4 sm:h-5 w-4 sm:w-5" />
              Add Orange Juice <span className="ml-1 sm:ml-2 opacity-80">• {getDrinkPrice('juice')} DHS</span>
            </Button>
            
            <Button 
              onClick={() => handleAddDrink('soda')}
              className="w-full h-12 sm:h-14 rounded-2xl bg-red-500 hover:bg-red-600
                       text-white transition-all duration-300 transform hover:scale-[1.02]
                       active:scale-[0.98] text-xs sm:text-sm"
            >
              <CupSoda className="mr-1 sm:mr-2 h-4 sm:h-5 w-4 sm:w-5" />
              Add Soda <span className="ml-1 sm:ml-2 opacity-80">• {getDrinkPrice('soda')} DHS</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkCounter;
