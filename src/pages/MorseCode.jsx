import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Radio, Copy, CheckCircle, Volume2 } from "lucide-react";

const MorseCode = () => {
  const [inputText, setInputText] = useState("Hello World");
  const [morseCode, setMorseCode] = useState(".... . .-.. .-.. ---   .-- --- .-. .-.. -..");
  const [copied, setCopied] = useState(false);
  const [isEncoding, setIsEncoding] = useState(true);

  const morseCodeMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/', '.': '.-.-.-', ',': '--..--',
    '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.',
    ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
    '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-',
    '@': '.--.-.'
  };

  const reverseMorseMap = Object.fromEntries(
    Object.entries(morseCodeMap).map(([k, v]) => [v, k])
  );

  const textToMorse = (text) => {
    return text.toUpperCase()
      .split('')
      .map(char => morseCodeMap[char] || char)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const morseToText = (morse) => {
    return morse.split(' ')
      .map(code => reverseMorseMap[code] || code)
      .join('')
      .replace(/\//g, ' ');
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    
    if (isEncoding) {
      setMorseCode(textToMorse(text));
    } else {
      setMorseCode(morseToText(text));
    }
    setCopied(false);
  };

  const toggleMode = () => {
    setIsEncoding(!isEncoding);
    // Swap input and output
    const temp = inputText;
    setInputText(morseCode);
    setMorseCode(temp);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(morseCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text");
    }
  };

  const playMorse = () => {
    if (!morseCode || !isEncoding) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const dotDuration = 100; // milliseconds
    const dashDuration = dotDuration * 3;
    const pauseDuration = dotDuration;
    const letterPause = dotDuration * 3;
    const wordPause = dotDuration * 7;
    
    let currentTime = audioContext.currentTime;
    
    morseCode.split('').forEach(char => {
      if (char === '.') {
        playTone(audioContext, currentTime, dotDuration);
        currentTime += (dotDuration + pauseDuration) / 1000;
      } else if (char === '-') {
        playTone(audioContext, currentTime, dashDuration);
        currentTime += (dashDuration + pauseDuration) / 1000;
      } else if (char === ' ') {
        currentTime += letterPause / 1000;
      } else if (char === '/') {
        currentTime += wordPause / 1000;
      }
    });
  };

  const playTone = (audioContext, startTime, duration) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 600; // Hz
    gainNode.gain.setValueAtTime(0.3, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration / 1000);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + duration / 1000);
  };

  const getSampleText = () => {
    const samples = [
      "SOS", "HELLO WORLD", "MORSE CODE", "TELEGRAPH", "WIRELESS",
      "THE QUICK BROWN FOX", "EMERGENCY", "CONTACT", "MESSAGE RECEIVED"
    ];
    const sample = samples[Math.floor(Math.random() * samples.length)];
    setInputText(sample);
    if (isEncoding) {
      setMorseCode(textToMorse(sample));
    }
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-orange-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">📡 Morse Code Translator</h1>
          <p className="text-slate-300">Communicate like it's 1838</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">
                {isEncoding ? "Text Input" : "Morse Code Input"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={inputText}
                onChange={handleInputChange}
                placeholder={isEncoding ? "Enter text to convert..." : "Enter morse code (dots, dashes, spaces)..."}
                className="bg-slate-900/50 border-slate-600/50 text-white placeholder-slate-400 min-h-[150px] resize-none font-mono"
              />
              
              <div className="flex gap-2">
                <Button
                  onClick={getSampleText}
                  className="flex-1 bg-amber-600 hover:bg-amber-500 text-white"
                >
                  Sample Text
                </Button>
                <Button
                  onClick={toggleMode}
                  className="px-4 bg-orange-600 hover:bg-orange-500 text-white"
                >
                  <Radio className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">
                {isEncoding ? "Morse Code Output" : "Text Output"}
              </CardTitle>
              <div className="flex gap-2">
                {isEncoding && (
                  <Button
                    onClick={playMorse}
                    size="sm"
                    className="bg-green-600 hover:bg-green-500 text-white"
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  onClick={copyToClipboard}
                  size="sm"
                  className={`${copied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-500'} text-white`}
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900/50 border border-slate-600/50 p-4 rounded-lg min-h-[150px]">
                <div className="text-amber-400 font-mono whitespace-pre-wrap break-all text-lg tracking-wider">
                  {morseCode || "Enter text to see the conversion..."}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-center">Morse Code Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm">
                {Object.entries(morseCodeMap).slice(0, 26).map(([letter, code]) => (
                  <div key={letter} className="bg-slate-700/30 p-2 rounded text-center">
                    <div className="font-bold text-amber-400">{letter}</div>
                    <div className="text-slate-300 font-mono">{code}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-slate-400 text-sm">
                <p>• = Dot (Short Signal) | - = Dash (Long Signal) | / = Word Space</p>
                <p className="mt-1">💡 Fun fact: SOS is ... --- ... (easy to remember!)</p>
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

export default MorseCode;
