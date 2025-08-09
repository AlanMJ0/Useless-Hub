import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart } from "lucide-react";

export default function PetRock() {
  const [rockName, setRockName] = useState("Rocky");
  const [happiness, setHappiness] = useState(50);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [totalPets, setTotalPets] = useState(0);

  const rockMoods = [
    { min: 0, max: 20, mood: "😴", text: "Sleeping peacefully" },
    { min: 21, max: 40, mood: "😐", text: "Feeling neutral" },
    { min: 41, max: 60, mood: "🙂", text: "Content and happy" },
    { min: 61, max: 80, mood: "😊", text: "Very cheerful" },
    { min: 81, max: 100, mood: "🤩", text: "Absolutely ecstatic!" }
  ];

  const getCurrentMood = () => {
    return rockMoods.find(mood => happiness >= mood.min && happiness <= mood.max);
  };

  const petRock = () => {
    setHappiness(prev => Math.min(100, prev + 10));
    setTotalPets(prev => prev + 1);
    setLastInteraction(Date.now());
  };

  const feedRock = () => {
    setHappiness(prev => Math.min(100, prev + 5));
    setLastInteraction(Date.now());
  };

  const talkToRock = () => {
    setHappiness(prev => Math.min(100, prev + 3));
    setLastInteraction(Date.now());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceLastInteraction = Date.now() - lastInteraction;
      const hoursIdle = timeSinceLastInteraction / (1000 * 60 * 60);
      
      if (hoursIdle > 0.1) { // After 6 minutes of no interaction
        setHappiness(prev => Math.max(0, prev - 1));
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [lastInteraction]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-400 via-stone-500 to-slate-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            variant="outline"
            asChild
            className="bg-white/20 hover:bg-white/30 text-white border-white/20"
          >
            <a href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </a>
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            🪨 Pet Rock
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
            The most low-maintenance pet in the universe. Zero calories, maximum love.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur border-white/20 text-center">
              <CardHeader>
                <CardTitle className="text-white text-2xl">{rockName}</CardTitle>
                <div className="text-8xl my-8">🪨</div>
                <div className="text-4xl mb-2">{getCurrentMood().mood}</div>
                <p className="text-white/80 text-lg">{getCurrentMood().text}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="w-full bg-white/20 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${happiness}%` }}
                  ></div>
                </div>
                <p className="text-white/80">Happiness: {happiness}%</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <Button
                    onClick={petRock}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/20 transition-all hover:scale-105"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Pet Rock
                  </Button>
                  
                  <Button
                    onClick={feedRock}
                    variant="outline"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                  >
                    🍎 Feed Rock
                  </Button>
                  
                  <Button
                    onClick={talkToRock}
                    variant="outline"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                  >
                    💬 Talk to Rock
                  </Button>
                </div>

                <div className="mt-6">
                  <input
                    type="text"
                    value={rockName}
                    onChange={(e) => setRockName(e.target.value || "Rocky")}
                    placeholder="Name your rock"
                    className="w-full p-3 rounded bg-white/20 text-white border border-white/20 placeholder-white/50 text-center"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">📊 Rock Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-white/80">Total Pets: {totalPets}</div>
                  <div className="text-white/80">Age: Geological</div>
                  <div className="text-white/80">Weight: Immeasurable</div>
                  <div className="text-white/80">Intelligence: Rock-level</div>
                  <div className="text-white/80">Loyalty: 100%</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">🎯 Rock Care Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-white/80 text-sm">
                  <div>• Pet regularly for maximum happiness</div>
                  <div>• Rocks love attention</div>
                  <div>• No water needed</div>
                  <div>• No food required (but feeding is fun)</div>
                  <div>• Talk to your rock daily</div>
                  <div>• Rocks are excellent listeners</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/70">
            "A rock is man's best friend. They never leave, never complain, and never need walks!" 🐕
          </p>
        </div>
      </div>
    </div>
  );
}
