import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const uselessApps = [
  {
    name: "Hub",
    description: "Central command for all your useless needs",
    path: "/hub",
    icon: "🏠",
    category: "Navigation"
  },
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
    name: "Progress Bar",
    description: "Watch a bar progress to 100% for no reason",
    path: "/progress-bar",
    icon: "📊",
    category: "Visual"
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Useless Hub
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Welcome to the ultimate collection of completely pointless but oddly satisfying applications. 
            Because sometimes you need to waste time productively.
          </p>
          <div className="mt-6 text-slate-400">
            <span className="bg-slate-800/50 px-3 py-1 rounded-full text-sm">
              {uselessApps.length} Useless Apps Available
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {uselessApps.map((app) => (
            <Card key={app.name} className="group hover:scale-105 transition-all duration-300 bg-slate-800/40 border-slate-700/50 hover:border-blue-500/50 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl">{app.icon}</div>
                  <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded">
                    {app.category}
                  </span>
                </div>
                <CardTitle className="text-lg text-white group-hover:text-blue-300 transition-colors">
                  {app.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                  {app.description}
                </p>
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white border-0 group-hover:bg-blue-500 transition-all duration-300"
                >
                  <a href={app.path}>Launch App</a>
                </Button>
              </CardContent>
            </Card>
          ))}
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
