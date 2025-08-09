import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw } from "lucide-react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(50);

  useEffect(() => {
    let interval;
    if (isRunning && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsRunning(false);
            return 100;
          }
          return prev + 1;
        });
      }, 101 - speed);
    }
    return () => clearInterval(interval);
  }, [isRunning, progress, speed]);

  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setProgress(0);
    setIsRunning(false);
  };

  const getMotivationalMessage = () => {
    if (progress === 0) return "Ready to achieve absolutely nothing!";
    if (progress < 25) return "Great start! You're wasting time efficiently.";
    if (progress < 50) return "Halfway to nowhere! Keep going!";
    if (progress < 75) return "Three quarters done with nothing!";
    if (progress < 100) return "Almost there! The pointlessness is real!";
    return "🎉 Congratulations! You've successfully accomplished nothing!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">📊 Progress Bar</h1>
          <p className="text-slate-300">Watch progress happen for absolutely no reason</p>
        </div>

        <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-center">
              Pointless Progress Tracker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">
                  {Math.round(progress)}%
                </div>
                <div className="text-slate-300">
                  {getMotivationalMessage()}
                </div>
              </div>

              <Progress 
                value={progress} 
                className="w-full h-6 bg-slate-700"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Speed: {speed}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  disabled={isRunning}
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>Snail Pace</span>
                  <span>Lightning Fast</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleStart}
                  className={`flex-1 ${isRunning ? 'bg-orange-600 hover:bg-orange-500' : 'bg-emerald-600 hover:bg-emerald-500'} text-white`}
                  disabled={progress === 100}
                >
                  {isRunning ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      Pause Progress
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Start Progress
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={handleReset}
                  className="px-4 bg-slate-600 hover:bg-slate-500 text-white"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {progress === 100 && (
              <div className="text-center p-4 bg-emerald-900/30 rounded-lg border border-emerald-600/30">
                <div className="text-emerald-400 font-medium mb-2">
                  🏆 Achievement Unlocked: Master of Pointlessness!
                </div>
                <div className="text-sm text-slate-300">
                  You have successfully watched something complete for no reason whatsoever.
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button
            onClick={() => window.location.href = "/"}
            className="bg-slate-700 hover:bg-slate-600 text-white"
          >
            Back to Hub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
