import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Share, Copy, CheckCircle } from "lucide-react";

const uselessFacts = [
  "Bananas are berries, but strawberries aren't.",
  "A group of flamingos is called a 'flamboyance'.",
  "Honey never spoils. You could eat 3000-year-old honey.",
  "Octopi have three hearts and blue blood.",
  "A shrimp's heart is in its head.",
  "Elephants are afraid of bees.",
  "A group of pugs is called a 'grumble'.",
  "Wombat poop is cube-shaped.",
  "Sea otters hold hands while sleeping so they don't drift apart.",
  "Butterflies taste with their feet.",
  "A group of owls is called a 'parliament'.",
  "Dolphins have names for each other.",
  "Penguins can jump 6 feet out of water.",
  "A group of ravens is called a 'murder'.",
  "Koalas sleep 22 hours a day.",
  "A group of pandas is called an 'embarrassment'.",
  "Sloths only defecate once a week.",
  "A group of ferrets is called a 'business'.",
  "Cats can't taste sweetness.",
  "A group of hippos is called a 'bloat'.",
];

export default function UselessFacts() {
  const [currentFact, setCurrentFact] = useState(uselessFacts[0]);
  const [factHistory, setFactHistory] = useState([]);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const generateFact = () => {
    const newFact = uselessFacts[Math.floor(Math.random() * uselessFacts.length)];
    setCurrentFact(newFact);
    setFactHistory(prev => [newFact, ...prev.slice(0, 4)]);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`Did you know? ${currentFact}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy fact");
    }
  };

  const shareFact = () => {
    if (navigator.share) {
      navigator.share({
        title: "Useless Fact",
        text: currentFact,
      });
    } else {
      copyToClipboard();
    }
  };

  const markAsFavorite = () => {
    setFavoriteCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 p-8">
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
            📚 Useless Facts
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
            Expand your knowledge with facts you'll never need but always remember.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-center text-2xl">
                  💡 Did You Know?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/10 p-6 rounded-lg">
                  <p className="text-white text-lg leading-relaxed text-center italic">
                    "{currentFact}"
                  </p>
                </div>
                
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button
                    onClick={generateFact}
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/20 transition-all hover:scale-105"
                  >
                    <RefreshCw className="mr-2 h-5 w-5" />
                    New Fact
                  </Button>
                  
                  <Button
                    onClick={shareFact}
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
                    ❤️ Favorite
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
                  <div className="text-white/80">Facts Available: {uselessFacts.length}</div>
                  <div className="text-white/80">Facts Read: {factHistory.length + 1}</div>
                  <div className="text-white/80">Favorites: {favoriteCount}</div>
                  <div className="text-white/80">Knowledge Level: Useless</div>
                  <div className="text-white/80">Practical Value: 0%</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">🕐 Recent Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {factHistory.length === 0 ? (
                    <p className="text-white/60 text-sm">No previous facts...</p>
                  ) : (
                    factHistory.map((fact, index) => (
                      <div key={index} className="text-white/80 text-xs bg-white/10 p-2 rounded">
                        {fact}
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
            "The more you know, the more you realize how useless some knowledge is!" 🧠
          </p>
        </div>
      </div>
    </div>
  );
}
