import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-8">
      <Card className="bg-white/10 backdrop-blur border-white/20 max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="text-9xl mb-4">🤷‍♂️</div>
          <CardTitle className="text-white text-6xl font-bold mb-4">404</CardTitle>
          <h2 className="text-white text-2xl">Page Not Found</h2>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <p className="text-white/80 text-lg">
            Oops! Looks like you've wandered into the digital void. 
            Even our useless apps have their limits!
          </p>
          
          <div className="space-y-4">
            <p className="text-white/70">
              The page you're looking for might have been:
            </p>
            <ul className="text-white/60 space-y-1">
              <li>• Lost in the uselessness dimension</li>
              <li>• Deleted by accident (like everything else here)</li>
              <li>• Never existed in the first place</li>
              <li>• Too useless even for this collection</li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center pt-6">
            <Button
              asChild
              size="lg"
              className="bg-white/20 hover:bg-white/30 text-white border-white/20"
            >
              <a href="/">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </a>
            </Button>
            
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              size="lg"
              className="bg-white/20 hover:bg-white/30 text-white border-white/20"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
          </div>

          <div className="pt-8">
            <p className="text-white/50 italic">
              "Not all who wander are lost... but you definitely are right now!" 🧭
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
