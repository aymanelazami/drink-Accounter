
import React, { useState, useEffect } from 'react';

interface AnimatedCoffeeProps {
  showAnimation: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const AnimatedCoffee: React.FC<AnimatedCoffeeProps> = ({ 
  showAnimation, 
  size = 'md' 
}) => {
  const [animating, setAnimating] = useState(false);
  
  // Size mapping
  const sizeMap = {
    sm: { cup: 'w-16 h-16', container: 'w-20 h-20' },
    md: { cup: 'w-24 h-24', container: 'w-28 h-28' },
    lg: { cup: 'w-32 h-32', container: 'w-36 h-36' }
  };
  
  // Handle animation state
  useEffect(() => {
    if (showAnimation) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setAnimating(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  return (
    <div className={`relative ${sizeMap[size].container} flex items-center justify-center`}>
      {/* Steam animation (shows only when animating) */}
      {animating && (
        <div className="absolute z-10 top-[-10px] left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-3 bg-gray-300/60 rounded-full animate-steam mx-auto mb-1 
                        delay-300"></div>
          <div className="w-1 h-3 bg-gray-300/60 rounded-full animate-steam mx-auto mb-1 
                        delay-100 -ml-2"></div>
          <div className="w-1 h-3 bg-gray-300/60 rounded-full animate-steam mx-auto 
                        delay-500 ml-2"></div>
        </div>
      )}
      
      {/* Cup */}
      <div className={`${sizeMap[size].cup} bg-white relative subtle-shadow rounded-2xl 
                     flex items-center justify-center overflow-hidden transition-all
                     duration-500 transform ${animating ? 'scale-105' : 'scale-100'}`}>
        {/* Handle */}
        <div className="absolute right-[-10px] top-1/4 w-4 h-10 border-4 border-gray-100 
                      rounded-r-full"></div>
        
        {/* Coffee liquid */}
        <div className={`coffee-liquid ${animating ? 'animate-cup-fill' : ''}`} 
             style={{ height: animating ? '0%' : '70%' }}></div>
             
        {/* Cup highlight */}
        <div className="absolute top-2 left-2 w-6 h-2 bg-white/30 rounded-full rotate-45"></div>
      </div>
    </div>
  );
};

export default AnimatedCoffee;
