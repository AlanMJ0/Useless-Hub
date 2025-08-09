import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function Hub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
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
            🏠 The Hub
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
            Central command for all your useless needs. This is where the magic (or lack thereof) happens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardHeader>
              <CardTitle className="text-white">🎯 Mission Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80">
                To provide the most pointless yet entertaining applications 
                known to humanity. We specialize in time-wasting excellence.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardHeader>
              <CardTitle className="text-white">📊 Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-white/80">Apps Created: 11</div>
                <div className="text-white/80">Time Wasted: ∞ hours</div>
                <div className="text-white/80">Productivity Lost: 100%</div>
                <div className="text-white/80">Fun Factor: Maximum</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardHeader>
              <CardTitle className="text-white">🌟 Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-white/80 space-y-1">
                <li>• Zero practical value</li>
                <li>• Maximum entertainment</li>
                <li>• Scientifically useless</li>
                <li>• Perfectly pointless</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardHeader>
              <CardTitle className="text-white">🎮 Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20">
                <a href="/bubble-wrap">Pop Some Bubbles</a>
              </Button>
              <Button asChild className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20">
                <a href="/color-randomizer">Generate Colors</a>
              </Button>
              <Button asChild className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20">
                <a href="/click-counter">Start Clicking</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-white/70 text-lg">
            "The Hub: Where productivity comes to die" 💀
          </p>
        </div>
      </div>
    </div>
  );
}
