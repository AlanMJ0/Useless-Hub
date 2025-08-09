import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";

export default function PointlessTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSessions, setTotalSessions] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const toggle = () => {
    setIsRunning(!isRunning);
    if (!isRunning && seconds === 0) {
      setTotalSessions(prev => prev + 1);
    }
  };

  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getMotivationalMessage = () => {
    if (seconds < 10) return "Just getting started!";
    if (seconds < 60) return "You're timing... something!";
    if (seconds < 300) return "5 minutes of pure timing!";
    if (seconds < 600) return "10 minutes of dedication!";
    if (seconds < 3600) return "This is getting serious!";
    return "You're a timing legend!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-8">
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
            ⏰ Pointless Timer
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
            Time absolutely nothing with scientific precision. Perfect for measuring the unmeasurable.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur border-white/20 text-center">
              <CardHeader>
                <CardTitle className="text-white text-8xl font-mono">
                  {formatTime(seconds)}
                </CardTitle>
                <p className="text-white/80 text-lg">{getMotivationalMessage()}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={toggle}
                    size="lg"
                    className="w-32 h-16 text-xl bg-white/20 hover:bg-white/30 text-white border-white/20 transition-all hover:scale-105"
                  >
                    {isRunning ? (
                      <>
                        <Pause className="mr-2 h-6 w-6" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-6 w-6" />
                        Start
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={reset}
                    variant="outline"
                    size="lg"
                    className="w-32 h-16 text-xl bg-white/20 hover:bg-white/30 text-white border-white/20"
                  >
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Reset
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/10 p-4 rounded">
                    <div className="text-2xl font-bold text-white">{Math.floor(seconds / 3600)}</div>
                    <div className="text-white/80">Hours</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded">
                    <div className="text-2xl font-bold text-white">{Math.floor((seconds % 3600) / 60)}</div>
                    <div className="text-white/80">Minutes</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded">
                    <div className="text-2xl font-bold text-white">{seconds % 60}</div>
                    <div className="text-white/80">Seconds</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">📊 Timer Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-white/80">Current Session: {formatTime(seconds)}</div>
                  <div className="text-white/80">Total Sessions: {totalSessions}</div>
                  <div className="text-white/80">Status: {isRunning ? "Running" : "Stopped"}</div>
                  <div className="text-white/80">Purpose: Unknown</div>
                  <div className="text-white/80">Precision: 100%</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">🎯 Timer Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-white/80 text-sm">
                  <div>• Time is relative</div>
                  <div>• This timer measures nothing</div>
                  <div>• But it does it very well</div>
                  <div>• Every second counts</div>
                  <div>• Even if we don't know what for</div>
                  <div>• Time well wasted</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/70">
            "Time flies when you're having fun. It crawls when you're watching this timer." ⏱️
          </p>
        </div>
      </div>
    </div>
  );
}
