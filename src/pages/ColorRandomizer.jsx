import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shuffle, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function ColorRandomizer() {
  const [color, setColor] = useState("#FF6B9D");
  const [colorName, setColorName] = useState("Pink Paradise");

  const funnyColorNames = [
    "Unicorn Tears", "Dragon Breath", "Alien Snot", "Cosmic Confusion",
    "Boring Beige", "Mysterious Maroon", "Ridiculous Red", "Bizarre Blue",
    "Goofy Green", "Silly Silver", "Pretentious Purple", "Obnoxious Orange",
    "Weird White", "Bratty Black", "Grumpy Gray", "Happy Yellow",
    "Sleepy Cyan", "Angry Amber", "Confused Coral", "Dizzy Violet"
  ];

  const generateRandomColor = () => {
    const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const randomName = funnyColorNames[Math.floor(Math.random() * funnyColorNames.length)];
    setColor(randomColor);
    setColorName(randomName);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Color copied!",
      description: `${color} has been copied to your clipboard`,
    });
  };

  useEffect(() => {
    generateRandomColor();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 p-8">
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
            🎨 Color Chaos
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
            Generate completely random colors with absurdly creative names. Perfect for indecisive designers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-center text-2xl">
                  Color Generator 3000
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div 
                    className="w-40 h-40 mx-auto rounded-full border-4 border-white/50 shadow-2xl mb-6 transition-all duration-500"
                    style={{ backgroundColor: color }}
                  />
                  
                  <div className="text-3xl font-bold text-white mb-2">
                    {colorName}
                  </div>
                  
                  <div className="text-xl font-mono text-white/80 bg-white/10 rounded-lg p-3 border border-white/20">
                    {color}
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={generateRandomColor}
                    size="lg"
                    className="w-full text-xl py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transition-all hover:scale-105"
                  >
                    <Shuffle className="mr-2 h-5 w-5" />
                    Generate New Color
                  </Button>
                  
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="lg"
                    className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Color Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">🎯 Color Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-white/80">Current Color: {colorName}</div>
                  <div className="text-white/80">Hex Code: {color}</div>
                  <div className="text-white/80">Randomness Level: Maximum</div>
                  <div className="text-white/80">Design Value: Questionable</div>
                  <div className="text-white/80">Fun Factor: 100%</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">💡 Color Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-white/80 text-sm">
                  <div>• Each color is completely random</div>
                  <div>• Names are creatively generated</div>
                  <div>• Perfect for procrastination</div>
                  <div>• No design knowledge required</div>
                  <div>• Probably unusable in real projects</div>
                  <div>• But that's the point!</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/70">
            "Because choosing colors is hard, let chaos decide!" 🌈
          </p>
        </div>
      </div>
    </div>
  );
}
