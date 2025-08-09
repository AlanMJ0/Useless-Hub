import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Pause } from "lucide-react";

export default function FakeLoading() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Ready to load nothing...");
  const [completedLoads, setCompletedLoads] = useState(0);

  const loadingMessages = [
    "Initializing uselessness...",
    "Loading nothing important...",
    "Downloading more RAM...",
    "Calibrating pointlessness...",
    "Buffering emptiness...",
    "Processing void...",
    "Compiling air...",
    "Synchronizing with nothing...",
    "Optimizing nothingness...",
    "Finalizing useless data...",
  ];

  useEffect(() => {
    // Start loading automatically when component mounts
    setIsLoading(true);
    setProgress(0);
    setLoadingText("Initializing uselessness...");
  }, []);

  useEffect(() => {
    let interval = null;
    if (isLoading && progress < 100) {
      interval = setInterval(() => {
        setProgress(prevProgress => {
          const increment = Math.random() * 3 + 0.5; // Random increment between 0.5 and 3.5
          const newProgress = Math.min(prevProgress + increment, 100);
          
          // Update loading message based on progress
          const messageIndex = Math.floor((newProgress / 100) * loadingMessages.length);
          setLoadingText(loadingMessages[Math.min(messageIndex, loadingMessages.length - 1)]);
          
          if (newProgress >= 100) {
            setLoadingText("Loading complete! (Nothing was loaded)");
            setCompletedLoads(prev => prev + 1);
            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
          }
          
          return newProgress;
        });
      }, Math.random() * 200 + 100); // Random interval between 100-300ms
    }
    return () => clearInterval(interval);
  }, [isLoading, progress, loadingMessages]);
  const reset = () => {
    setProgress(0);
    setIsLoading(false);
    setLoadingText("Ready to load nothing...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-green-500 to-blue-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            variant="outline"
            asChild
            className="bg-white/40 hover:bg-white/60 text-yellow-100 border-white/40"
          >
            <a href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Hub
            </a>
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            ⏳ Fake Loading
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
            Experience the thrill of waiting for absolutely nothing to load. Premium procrastination tool.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-center text-2xl">
                  Loading Simulator 3000
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="w-full bg-white/20 rounded-full h-8 relative overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-8 rounded-full transition-all duration-300 relative"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      {Math.round(progress)}%
                    </div>
                    <div className="text-white/80 text-lg italic">
                      {loadingText}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={reset}
                    variant="outline"
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                  >
                    Reset
                  </Button>
                </div>

                {isLoading && (
                  <div className="flex flex-col items-center justify-center mt-6">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
                    <div className="mt-2 text-white text-lg font-semibold">Loading...</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">📊 Loading Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-white/80">Progress: {Math.round(progress)}%</div>
                  <div className="text-white/80">Status: {isLoading ? "Loading" : "Idle"}</div>
                  <div className="text-white/80">Completed Loads: {completedLoads}</div>
                  <div className="text-white/80">Data Transferred: 0 bytes</div>
                  <div className="text-white/80">Efficiency: 0%</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">💡 Loading Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-white/80 text-sm">
                  <div>• Watch the progress bar fill up</div>
                  <div>• Enjoy the suspense</div>
                  <div>• Perfect for procrastination</div>
                  <div>• No actual loading happens</div>
                  <div>• But it looks very important</div>
                  <div>• Great for screenshots</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-white/70">
            "Patience is a virtue, especially when waiting for nothing!" 🚀
          </p>
        </div>
      </div>
    </div>
  );
}
