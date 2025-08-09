import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <div className="min-h-screen bg-gradient-fun p-6">
      <div className="mx-auto max-w-2xl">
        <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-glow">
          <div className="mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = "/"}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Hub
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-4">Virtual Bubble Wrap</h1>
            <p className="text-muted-foreground mb-4">
              The stress relief you never knew you needed
            </p>
            
            <div className="text-lg font-semibold text-accent mb-2">
              {getSatisfactionLevel()}
            </div>
            <div className="text-sm text-muted-foreground">
              Popped: {poppedCount} / {bubbles.length}
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-8 justify-center">
            {bubbles.map((bubble) => (
              <button
                key={bubble.id}
                onClick={() => popBubble(bubble.id)}
                className={`
                  w-12 h-12 rounded-full border-2 transition-all duration-200
                  ${bubble.popped 
                    ? 'bg-muted border-muted text-muted-foreground scale-75' 
                    : 'bg-gradient-primary border-primary/30 hover:scale-110 hover:shadow-glow active:scale-95'
                  }
                `}
                disabled={bubble.popped}
              >
                {bubble.popped ? '💥' : '●'}
              </button>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={resetBubbles}
              variant="outline"
              className="w-full max-w-xs"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Bubble Wrap
            </Button>
          </div>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            No real bubbles were harmed in the making of this entertainment.
          </div>
        </Card>
      </div>
    </div>
  );
}
