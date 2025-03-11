
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon } from 'lucide-react';
import AnimatedCoffee from './AnimatedCoffee';
import { COFFEE_PRICE } from '@/utils/coffeeUtils';
import { useToast } from "@/hooks/use-toast";

interface CoffeeCounterProps {
  count: number;
  totalSpent: number;
  onAddCoffee: () => void;
}

const CoffeeCounter: React.FC<CoffeeCounterProps> = ({ 
  count, 
  totalSpent, 
  onAddCoffee 
}) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const { toast } = useToast();
  
  const handleAddCoffee = () => {
    setShowAnimation(true);
    onAddCoffee();
    
    toast({
      title: "Coffee added",
      description: `You've now had ${count + 1} coffees for a total of ${totalSpent + COFFEE_PRICE} DHS`,
    });
    
    // Reset animation state after it completes
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass rounded-3xl p-8 subtle-shadow">
        <div className="space-y-8">
          {/* Coffee animation */}
          <div className="flex justify-center -mt-4 mb-2">
            <AnimatedCoffee showAnimation={showAnimation} size="lg" />
          </div>
          
          {/* Stats display */}
          <div className="text-center space-y-1">
            <div className="text-xs uppercase tracking-wide text-muted-foreground animate-fade-in">
              Total coffees
            </div>
            <div className="text-5xl font-light animate-fade-up">
              {count}
            </div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mt-4 animate-fade-in">
              Total spent
            </div>
            <div className="text-3xl font-light animate-fade-up">
              {totalSpent} <span className="text-sm">DHS</span>
            </div>
          </div>
          
          {/* Add button */}
          <div className="pt-4">
            <Button 
              onClick={handleAddCoffee}
              className="w-full h-14 rounded-2xl bg-coffee-dark hover:bg-coffee-darkest
                       text-white transition-all duration-300 transform hover:scale-[1.02]
                       active:scale-[0.98]"
            >
              <PlusIcon className="mr-2 h-5 w-5" />
              Add Coffee <span className="ml-2 opacity-80">• {COFFEE_PRICE} DHS</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCounter;
