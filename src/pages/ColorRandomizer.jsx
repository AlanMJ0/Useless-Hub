import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <div className="min-h-screen bg-gradient-secondary p-6 flex items-center justify-center">
      <Card className="w-full max-w-md p-8 text-center bg-white/95 backdrop-blur-sm shadow-glow">
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

        <h1 className="text-3xl font-bold text-primary mb-4">Color Chaos</h1>
        <p className="text-muted-foreground mb-8">
          Generate completely random colors for no particular reason
        </p>

        <div className="mb-8">
          <div 
            className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg mb-4 transition-all duration-500"
            style={{ backgroundColor: color }}
          />
          
          <h2 className="text-2xl font-bold text-primary mb-2">
            {colorName}
          </h2>
          
          <div className="text-lg font-mono text-accent mb-4">
            {color}
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={generateRandomColor}
            className="w-full text-xl py-6 bg-gradient-primary hover:scale-105 transition-transform duration-200 shadow-glow"
          >
            <Shuffle className="h-5 w-5 mr-2" />
            New Random Color
          </Button>
          
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="w-full"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Color Code
          </Button>
        </div>

        <div className="mt-6 text-xs text-muted-foreground">
          Fun fact: This color has probably never been used in any real design project.
        </div>
      </Card>
    </div>
  );
}
