import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Copy, CheckCircle } from "lucide-react";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("hunter2");
  const [length, setLength] = useState(12);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">🔐 Password Generator</h1>
          <p className="text-slate-300">Generate secure passwords you'll immediately forget</p>
        </div>

        <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Your New Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600/50">
              <div className="font-mono text-lg text-green-400 break-all">
                {password}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password Length: {length}
                </label>
                <input
                  type="range"
                  min="4"
                  max="32"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={generatePassword}
                  className="flex-1 bg-purple-600 hover:bg-purple-500 text-white"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate New Password
                </Button>
                
                <Button
                  onClick={copyToClipboard}
                  className={`px-4 ${copied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-500'} text-white`}
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="text-center text-slate-400 text-sm">
              <p>⚠️ Warning: You will definitely forget this password</p>
              <p className="mt-2">💡 Tip: Write it down on a sticky note for maximum security</p>
            </div>
          </CardContent>
        </Card>

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

export default PasswordGenerator;
