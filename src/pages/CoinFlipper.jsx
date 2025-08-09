import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RotateCcw } from "lucide-react";

export default function CoinFlipper() {
  const [currentSide, setCurrentSide] = useState("heads");
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipHistory, setFlipHistory] = useState([]);
  const [stats, setStats] = useState({ heads: 0, tails: 0 });

  const flipCoin = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    
    // Simulate flipping animation delay
    setTimeout(() => {
      const result = Math.random() < 0.5 ? "heads" : "tails";
      setCurrentSide(result);
      setFlipHistory(prev => [result, ...prev.slice(0, 9)]);
      setStats(prev => ({ ...prev, [result]: prev[result] + 1 }));
      setIsFlipping(false);
    }, 1000);
  };

  const resetStats = () => {
    setStats({ heads: 0, tails: 0 });
    setFlipHistory([]);
    setCurrentSide("heads");
  };

  const getTotalFlips = () => stats.heads + stats.tails;
  
  const getHeadsPercentage = () => {
    const total = getTotalFlips();
    return total > 0 ? Math.round((stats.heads / total) * 100) : 50;
  };

  const getStreakInfo = () => {
    if (flipHistory.length < 2) return "No streak yet";
    
    let streak = 1;
    const lastResult = flipHistory[0];
    
    for (let i = 1; i < flipHistory.length; i++) {
      if (flipHistory[i] === lastResult) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak > 1 ? `${streak} ${lastResult} in a row!` : "No current streak";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-8">
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
            🪙 Coin Flipper
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
            Make important life decisions with the power of random chance. When in doubt, flip it out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur border-white/20 text-center">
              <CardHeader>
                <CardTitle className="text-white text-2xl mb-8">Digital Coin</CardTitle>
                
                <div className="relative w-48 h-48 mx-auto mb-8">
                  <div className={`coin ${isFlipping ? 'flipping' : ''} ${currentSide}`}>
                    <div className="coin-inner">
                      <div className="coin-heads">
                        <div className="text-6xl">🦅</div>
                        <div className="text-xl font-bold text-yellow-800">HEADS</div>
                      </div>
                      <div className="coin-tails">
                        <div className="text-6xl">🏛️</div>
                        <div className="text-xl font-bold text-yellow-800">TAILS</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-3xl font-bold text-white mb-4">
                  {isFlipping ? "Flipping..." : currentSide.toUpperCase()}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Button
                  onClick={flipCoin}
                  size="lg"
                  disabled={isFlipping}
                  className="w-full h-16 text-xl bg-white/20 hover:bg-white/30 text-white border-white/20 transition-all hover:scale-105 disabled:opacity-50"
                >
                  {isFlipping ? "Flipping..." : "Flip Coin"}
                </Button>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-4 rounded">
                    <div className="text-2xl font-bold text-white">{stats.heads}</div>
                    <div className="text-white/80">Heads</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded">
                    <div className="text-2xl font-bold text-white">{stats.tails}</div>
                    <div className="text-white/80">Tails</div>
                  </div>
                </div>

                <Button
                  onClick={resetStats}
                  variant="outline"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Stats
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">📊 Flip Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-white/80">Total Flips: {getTotalFlips()}</div>
                  <div className="text-white/80">Heads: {getHeadsPercentage()}%</div>
                  <div className="text-white/80">Tails: {100 - getHeadsPercentage()}%</div>
                  <div className="text-white/80">Current Streak: {getStreakInfo()}</div>
                  <div className="text-white/80">Fairness: 100%</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">🕐 Recent Flips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {flipHistory.length === 0 ? (
                    <p className="text-white/60 text-sm">No flips yet...</p>
                  ) : (
                    flipHistory.map((flip, index) => (
                      <div key={index} className="text-white/80 text-sm flex items-center justify-between">
                        <span>Flip #{getTotalFlips() - index}</span>
                        <span className="font-bold">{flip.toUpperCase()}</span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/70">
            "When life gives you choices, flip a coin. Not to decide, but to realize what you're hoping for!" 🎯
          </p>
        </div>
      </div>
    </div>
  );
}
