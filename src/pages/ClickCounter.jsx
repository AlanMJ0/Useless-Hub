import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RotateCcw } from "lucide-react";

export default function ClickCounter() {
  const [count, setCount] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [clickHistory, setClickHistory] = useState([]);

  const handleClick = () => {
    const newCount = count + 1;
    const newTotal = totalClicks + 1;
    setCount(newCount);
    setTotalClicks(newTotal);
    setClickHistory(prev => [...prev.slice(-9), { id: newTotal, time: new Date().toLocaleTimeString() }]);
  };

  const reset = () => {
    setCount(0);
    setClickHistory([]);
  };

  const getEncouragement = () => {
    if (count < 10) return "Just getting started!";
    if (count < 50) return "Keep clicking!";
    if (count < 100) return "You're on fire!";
    if (count < 500) return "Unstoppable!";
    if (count < 1000) return "Legend status!";
    return "Click Master Supreme!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-8">
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
            👆 Click Counter
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
            The most sophisticated clicking experience known to humanity. Every click matters... or does it?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur border-white/20 text-center">
              <CardHeader>
                <CardTitle className="text-white text-4xl">{count}</CardTitle>
                <p className="text-white/80 text-lg">{getEncouragement()}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button
                  onClick={handleClick}
                  size="lg"
                  className="w-full h-20 text-2xl bg-white/20 hover:bg-white/30 text-white border-white/20 transition-all hover:scale-105"
                >
                  CLICK ME!
                </Button>
                
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={reset}
                    variant="outline"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">📊 Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-white/80">Current Session: {count}</div>
                  <div className="text-white/80">Total Clicks: {totalClicks}</div>
                  <div className="text-white/80">Clicks per minute: {totalClicks > 0 ? "∞" : "0"}</div>
                  <div className="text-white/80">Efficiency: 100% useless</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">🕐 Recent Clicks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {clickHistory.length === 0 ? (
                    <p className="text-white/60 text-sm">No clicks yet...</p>
                  ) : (
                    clickHistory.slice().reverse().map((click) => (
                      <div key={click.id} className="text-white/80 text-sm">
                        Click #{click.id} at {click.time}
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
            "Every click is a step towards... absolutely nothing!" 🎯
          </p>
        </div>
      </div>
    </div>
  );
}
