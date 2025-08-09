import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shuffle, ExternalLink } from "lucide-react";

const uselessApps = [
  {
    name: "Click Counter",
    description: "Count your clicks, because why not?",
    path: "/click-counter",
    icon: "👆",
    category: "Interactive"
  },
  {
    name: "Color Randomizer",
    description: "Generate random colors with funny names",
    path: "/color-randomizer",
    icon: "🎨",
    category: "Creative"
  },
  {
    name: "Bubble Wrap",
    description: "Pop virtual bubbles for stress relief",
    path: "/bubble-wrap",
    icon: "🫧",
    category: "Relaxation"
  },
  {
    name: "Number Generator",
    description: "Generate completely random numbers",
    path: "/number-generator",
    icon: "🎲",
    category: "Random"
  },
  {
    name: "Pet Rock",
    description: "Take care of your digital pet rock",
    path: "/pet-rock",
    icon: "🪨",
    category: "Simulation"
  },
  {
    name: "Pointless Timer",
    description: "Time absolutely nothing with precision",
    path: "/pointless-timer",
    icon: "⏰",
    category: "Productivity"
  },
  {
    name: "Useless Facts",
    description: "Learn facts you'll never need but always remember",
    path: "/useless-facts",
    icon: "📚",
    category: "Educational"
  },
  {
    name: "Fake Loading",
    description: "Watch progress bars that lead nowhere",
    path: "/fake-loading",
    icon: "⏳",
    category: "Simulation"
  },
  {
    name: "Compliment Generator",
    description: "Boost your ego with AI-generated praise",
    path: "/compliment-generator",
    icon: "💝",
    category: "Wellness"
  },
  {
    name: "Coin Flipper",
    description: "Make important decisions with digital chance",
    path: "/coin-flipper",
    icon: "🪙",
    category: "Decision Making"
  },
  {
    name: "Password Generator",
    description: "Generate passwords you'll never use",
    path: "/password-generator",
    icon: "🔐",
    category: "Security"
  },
  {
    name: "Text Reverser",
    description: "Reverse text because backwards is better",
    path: "/text-reverser",
    icon: "🔄",
    category: "Text Tools"
  },
  {
    name: "Morse Code",
    description: "Convert text to dots and dashes",
    path: "/morse-code",
    icon: "📡",
    category: "Communication"
  }
];

export default function Index() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedGradient, setSelectedGradient] = useState('');
  const carouselRef = useRef(null);

  // Available gradient classes
  const gradientClasses = [
    'gradient-aurora',
    'gradient-cosmic', 
    'gradient-neon',
    'gradient-electric',
    'gradient-sunset',
    'gradient-matrix'
  ];

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === ' ' || event.key === 'Enter') {
        if (event.target.closest('.random-selector-button')) {
          event.preventDefault();
          selectRandomProject();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectRandomProject = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedProject(null);
    setSelectedGradient('');
    
    // Random project selection
    const randomIndex = Math.floor(Math.random() * uselessApps.length);
    const selectedApp = uselessApps[randomIndex];
    
    // Random gradient selection
    const randomGradientIndex = Math.floor(Math.random() * gradientClasses.length);
    const selectedGradientClass = gradientClasses[randomGradientIndex];
    
    // Animation duration and easing
    const animationDuration = 3000; // 3 seconds
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // Ease-out animation curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      if (carouselRef.current) {
        // Calculate scroll position with multiple full cycles plus final position
        const fullCycles = 3; // Number of complete cycles through all projects
        const totalScroll = (fullCycles * uselessApps.length + randomIndex) * 200; // 200px per card
        const currentScroll = totalScroll * easeOut;
        
        carouselRef.current.scrollLeft = currentScroll;
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete - navigate directly to the selected project
        setSelectedProject(selectedApp);
        setSelectedGradient(selectedGradientClass);
        setIsSpinning(false);
        
        // Announce to screen readers
        const announcement = `Navigating to ${selectedApp.name}: ${selectedApp.description}`;
        const ariaLiveRegion = document.createElement('div');
        ariaLiveRegion.setAttribute('aria-live', 'polite');
        ariaLiveRegion.setAttribute('aria-atomic', 'true');
        ariaLiveRegion.className = 'sr-only';
        ariaLiveRegion.textContent = announcement;
        document.body.appendChild(ariaLiveRegion);
        
        // Navigate to the selected project after a brief delay to show the selection
        setTimeout(() => {
          window.location.href = selectedApp.path;
        }, 1000);
      }
    };
    
    requestAnimationFrame(animate);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Useless Hub
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Welcome to the ultimate collection of completely pointless but oddly satisfying applications. 
            Because sometimes you need to waste time productively.
          </p>
          
          {/* Random Project Selector */}
          <div className="mb-8">
            <Button
              onClick={selectRandomProject}
              disabled={isSpinning}
              className={`random-selector-button bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl transition-all duration-300 focus:ring-4 focus:ring-blue-500/50 focus:outline-none ${
                isSpinning ? 'animate-pulse scale-95' : 'hover:scale-105 hover:shadow-2xl'
              }`}
              aria-label={isSpinning ? 'Selecting random project' : 'Pick a random project to explore'}
              aria-describedby="random-selector-help"
            >
              <Shuffle className={`mr-3 h-6 w-6 ${isSpinning ? 'animate-spin' : ''}`} />
              {isSpinning ? 'Selecting Your Adventure...' : 'Pick Random Project'}
            </Button>
            
            <div id="random-selector-help" className="sr-only">
              Press Enter or Space to select a random project and navigate automatically.
            </div>
          </div>
          
          <div className="text-slate-400">
            <span className="bg-slate-800/50 px-3 py-1 rounded-full text-sm">
              {uselessApps.length} Useless Apps Available
            </span>
          </div>
        </div>

        {/* Horizontal Carousel for Random Selection */}
        <div className="mb-12 relative z-10 bg-slate-800/30 backdrop-blur-md rounded-2xl border border-slate-600/50 shadow-2xl p-6 pt-16 pb-16">
          <div className="text-center mb-4 relative z-10">
            <h3 className="text-xl font-semibold text-white mb-2">🎯 Project Selection Carousel</h3>
            <p className="text-slate-300 text-sm">Watch the selection process in action</p>
          </div>
          <div 
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide py-8 relative z-20"
            style={{ 
              scrollBehavior: isSpinning ? 'auto' : 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {/* Repeat projects multiple times for seamless scrolling */}
            {[...Array(5)].map((_, cycleIndex) => 
              uselessApps.map((app, index) => (
                <div
                  key={`${cycleIndex}-${index}`}
                  className={`flex-shrink-0 w-48 transition-all duration-500 relative ${
                    selectedProject && selectedProject.name === app.name && !isSpinning
                      ? 'transform scale-125 project-glow ring-4 ring-white/90 ring-offset-4 ring-offset-slate-900 shadow-2xl z-[200] m-4'
                      : selectedProject && selectedProject.name !== app.name && !isSpinning
                      ? 'opacity-30 z-20'
                      : 'opacity-100 z-30'
                  }`}
                  style={{
                    zIndex: selectedProject && selectedProject.name === app.name && !isSpinning ? 200 : 30,
                    margin: selectedProject && selectedProject.name === app.name && !isSpinning ? '16px' : '4px'
                  }}
                >
                  <Card className={`border-slate-600/50 hover:border-blue-500/50 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all duration-300 relative overflow-visible ${
                    selectedProject && selectedProject.name === app.name && !isSpinning
                      ? `border-white/80 z-[210] neon-border-selected ${selectedGradient}`
                      : 'bg-slate-800/60 z-40'
                  }`}>
                    <CardContent className="p-4 text-center">
                      <div className="text-4xl mb-2">{app.icon}</div>
                      <div className={`font-medium text-sm ${
                        selectedProject && selectedProject.name === app.name && !isSpinning
                          ? 'text-white font-bold drop-shadow-lg'
                          : 'text-white'
                      }`}>{app.name}</div>
                      <div className={`text-xs mt-1 ${
                        selectedProject && selectedProject.name === app.name && !isSpinning
                          ? 'text-white/90 font-semibold drop-shadow'
                          : 'text-slate-400'
                      }`}>{app.category}</div>
                    </CardContent>
                  </Card>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="text-center mt-16 space-y-4">
          <p className="text-slate-400">
            Made with ❤️ for people who appreciate the finer things in uselessness
          </p>
          <div className="flex justify-center space-x-6 text-sm text-slate-500">
            <span>No productivity harmed</span>
            <span>•</span>
            <span>100% time waste guaranteed</span>
            <span>•</span>
            <span>Side effects may include joy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
