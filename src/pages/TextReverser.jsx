import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RotateCcw, Copy, CheckCircle } from "lucide-react";

const TextReverser = () => {
  const [inputText, setInputText] = useState("Hello World!");
  const [reversedText, setReversedText] = useState("!dlroW olleH");
  const [copied, setCopied] = useState(false);

  const reverseText = (text) => {
    return text.split("").reverse().join("");
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    setReversedText(reverseText(text));
    setCopied(false);
  };

  const handleReverse = () => {
    setReversedText(reverseText(inputText));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(reversedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text");
    }
  };

  const getRandomText = () => {
    const texts = [
      "The quick brown fox jumps over the lazy dog",
      "To be or not to be, that is the question",
      "In a hole in the ground there lived a hobbit",
      "May the Force be with you",
      "I have a dream",
      "Life is what happens to you while you're busy making other plans",
      "The only way to do great work is to love what you do"
    ];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setInputText(randomText);
    setReversedText(reverseText(randomText));
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-900 to-purple-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">🔄 Text Reverser</h1>
          <p className="text-slate-300">Because sometimes backwards is better than forwards</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Original Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={inputText}
                onChange={handleInputChange}
                placeholder="Enter text to reverse..."
                className="bg-slate-900/50 border-slate-600/50 text-white placeholder-slate-400 min-h-[150px] resize-none"
              />
              
              <div className="flex gap-2">
                <Button
                  onClick={getRandomText}
                  className="flex-1 bg-violet-600 hover:bg-violet-500 text-white"
                >
                  Random Text
                </Button>
                <Button
                  onClick={handleReverse}
                  className="px-4 bg-purple-600 hover:bg-purple-500 text-white"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Reversed Text</CardTitle>
              <Button
                onClick={copyToClipboard}
                size="sm"
                className={`${copied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-500'} text-white`}
              >
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900/50 border border-slate-600/50 p-4 rounded-lg min-h-[150px]">
                <div className="text-green-400 font-mono whitespace-pre-wrap break-all">
                  {reversedText || "Enter text to see the magic happen..."}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-white">Fun Facts About Text Reversing</h3>
                <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm text-slate-300">
                  <div className="bg-slate-700/30 p-3 rounded">
                    <div className="font-medium text-violet-400">Palindromes</div>
                    <div>Words that read the same backwards: racecar, level, madam</div>
                  </div>
                  <div className="bg-slate-700/30 p-3 rounded">
                    <div className="font-medium text-purple-400">Mirror Writing</div>
                    <div>Leonardo da Vinci wrote backwards in his notebooks</div>
                  </div>
                  <div className="bg-slate-700/30 p-3 rounded">
                    <div className="font-medium text-pink-400">Brain Exercise</div>
                    <div>Reading backwards can improve cognitive flexibility</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Button
            onClick={() => window.location.href = "/"}
            className="bg-slate-600 hover:bg-slate-500 text-white border border-white/20"
          >
            Back to Hub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TextReverser;
