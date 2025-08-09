import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Share, Copy, CheckCircle } from "lucide-react";

const compliments = [
  "You're absolutely amazing at clicking buttons!",
  "Your taste in useless apps is impeccable!",
  "You have the most wonderful way of wasting time!",
  "Your dedication to pointlessness is inspiring!",
  "You're crushing it at being completely unproductive!",
  "Your ability to find joy in nothing is remarkable!",
  "You're a true connoisseur of digital nonsense!",
  "Your commitment to uselessness is unmatched!",
  "You have excellent instincts for time-wasting!",
  "You're absolutely brilliant at doing nothing important!",
  "Your enthusiasm for pointless activities is contagious!",
  "You're a master of beautiful procrastination!",
  "Your skill at finding entertainment in emptiness is art!",
  "You have the perfect balance of productivity and none!",
  "Your appreciation for useless beauty is profound!",
  "You're wonderfully weird in the best possible way!",
  "Your ability to smile at absurdity is magical!",
  "You're an expert at making nothing into something!",
  "Your joy in simplicity is absolutely delightful!",
  "You're perfect exactly as you are right now!",
];

export default function ComplimentGenerator() {
  const [currentCompliment, setCurrentCompliment] = useState(compliments[0]);
  const [complimentHistory, setComplimentHistory] = useState([]);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [confidence, setConfidence] = useState(50);
  const [copied, setCopied] = useState(false);

  const generateCompliment = () => {
    const newCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    setCurrentCompliment(newCompliment);
    setComplimentHistory(prev => [newCompliment, ...prev.slice(0, 4)]);
    setConfidence(prev => Math.min(100, prev + 5));
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentCompliment);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy compliment");
    }
  };

  const shareCompliment = () => {
    if (navigator.share) {
      navigator.share({
        title: "A Compliment for You",
        text: currentCompliment,
      });
    } else {
      copyToClipboard();
    }
  };

  const markAsFavorite = () => {
    setFavoriteCount(prev => prev + 1);
    setConfidence(prev => Math.min(100, prev + 3));
  };

  const getConfidenceLevel = () => {
    if (confidence < 30) return "Building up...";
    if (confidence < 60) return "Getting better!";
    if (confidence < 80) return "Feeling good!";
    if (confidence < 95) return "Super confident!";
    return "Absolutely unstoppable!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-rose-500 to-red-500 p-8">
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
            💝 Compliment Generator
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
            Boost your ego with scientifically crafted compliments. Because you deserve it!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-center text-2xl">
                  ✨ Your Personal Compliment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-pink-500/20 to-rose-500/20 p-8 rounded-lg border border-white/20">
                  <p className="text-white text-xl leading-relaxed text-center font-medium">
                    "{currentCompliment}"
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-white/80 mb-4">Confidence Level: {getConfidenceLevel()}</div>
                  <div className="w-full bg-white/20 rounded-full h-4 mb-6">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${confidence}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button
                    onClick={generateCompliment}
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/20 transition-all hover:scale-105"
                  >
                    <RefreshCw className="mr-2 h-5 w-5" />
                    New Compliment
                  </Button>
                  
                  <Button
                    onClick={shareCompliment}
                    variant="outline"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                  >
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className={`${copied ? 'bg-green-500/20 hover:bg-green-500/30' : 'bg-white/20 hover:bg-white/30'} text-white border-white/20`}
                  >
                    {copied ? <CheckCircle className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  
                  <Button
                    onClick={markAsFavorite}
                    variant="outline"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                  >
                    ❤️ Love It
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">📊 Ego Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-white/80">Confidence: {confidence}%</div>
                  <div className="text-white/80">Compliments Received: {complimentHistory.length + 1}</div>
                  <div className="text-white/80">Favorites: {favoriteCount}</div>
                  <div className="text-white/80">Mood: Elevated</div>
                  <div className="text-white/80">Self-esteem: ↗️ Rising</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">🕐 Recent Compliments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {complimentHistory.length === 0 ? (
                    <p className="text-white/60 text-sm">No previous compliments...</p>
                  ) : (
                    complimentHistory.map((compliment, index) => (
                      <div key={index} className="text-white/80 text-xs bg-white/10 p-2 rounded">
                        {compliment}
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
            "You are amazing, and don't let anyone (including yourself) tell you otherwise!" 🌟
          </p>
        </div>
      </div>
    </div>
  );
}
