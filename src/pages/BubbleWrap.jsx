import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RotateCcw } from "lucide-react";

export default function BubbleWrap() {
  const [bubbles, setBubbles] = useState(() =>
    Array.from({ length: 35 }, (_, i) => ({ id: i, popped: false }))
  );
  const [poppedCount, setPoppedCount] = useState(0);

  const popBubble = (id) => {
    setBubbles(prev => 
      prev.map(bubble => 
        bubble.id === id && !bubble.popped 
          ? { ...bubble, popped: true }
          : bubble
      )
    );
    
    if (!bubbles.find(b => b.id === id)?.popped) {
      setPoppedCount(prev => prev + 1);
    }
  };

  const resetBubbles = () => {
    setBubbles(prev => prev.map(bubble => ({ ...bubble, popped: false })));
    setPoppedCount(0);
  };

  const getSatisfactionLevel = () => {
    const percentage = (poppedCount / bubbles.length) * 100;
    if (percentage === 0) return "Start popping!";
    if (percentage < 25) return "Just getting started...";
    if (percentage < 50) return "Keep popping!";
    if (percentage < 75) return "So satisfying!";
    if (percentage < 100) return "Almost there!";
    return "All popped! 🎉";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            variant="outline"
            asChild
            className="bg-white/20 hover:bg-white/30 text-white border-white/20"
          >
            <a href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Hub
            </a>
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            🫧 Virtual Bubble Wrap
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
            Experience the therapeutic joy of popping bubbles without the mess. Premium stress relief.
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl">
              Stress Relief Simulator 3000
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">
                {getSatisfactionLevel()}
              </div>
              <div className="text-white/80">
                Popped: {poppedCount} / {bubbles.length} bubbles
              </div>
            </div>

            <div className="grid grid-cols-7 gap-3 mb-8 justify-center">
              {bubbles.map((bubble) => (
                <button
                  key={bubble.id}
                  onClick={() => popBubble(bubble.id)}
                  className={`
                    w-12 h-12 rounded-full border-2 transition-all duration-200 text-lg
                    ${bubble.popped 
                      ? 'bg-slate-700/50 border-slate-600 text-slate-500 scale-75' 
                      : 'bg-blue-500/80 border-blue-400/50 hover:scale-110 hover:bg-blue-400/90 active:scale-95 text-white shadow-lg hover:shadow-blue-500/50'
                    }
                  `}
                  disabled={bubble.popped}
                >
                  {bubble.popped ? '💥' : '●'}
                </button>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={resetBubbles}
                variant="outline"
                size="lg"
                className="bg-white/20 hover:bg-white/30 text-white border-white/20"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Reset Bubble Wrap
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-white/70">
            "Therapeutic bubble popping without the cleanup!" 🎈
          </p>
        </div>
      </div>
    </div>
  );
}
