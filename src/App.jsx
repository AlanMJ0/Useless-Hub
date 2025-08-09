import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Hub from "./pages/Hub";
import ClickCounter from "./pages/ClickCounter";
import ColorRandomizer from "./pages/ColorRandomizer";
import NumberGenerator from "./pages/NumberGenerator";
import UselessFacts from "./pages/UselessFacts";
import BubbleWrap from "./pages/BubbleWrap";
import PetRock from "./pages/PetRock";
import FakeLoading from "./pages/FakeLoading";
import ComplimentGenerator from "./pages/ComplimentGenerator";
import CoinFlipper from "./pages/CoinFlipper";
import PointlessTimer from "./pages/PointlessTimer";
import PasswordGenerator from "./pages/PasswordGenerator";
import ProgressBar from "./pages/ProgressBar";
import TextReverser from "./pages/TextReverser";
import MorseCode from "./pages/MorseCode";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hub" element={<Hub />} />
          <Route path="/click-counter" element={<ClickCounter />} />
          <Route path="/color-randomizer" element={<ColorRandomizer />} />
          <Route path="/number-generator" element={<NumberGenerator />} />
          <Route path="/useless-facts" element={<UselessFacts />} />
          <Route path="/bubble-wrap" element={<BubbleWrap />} />
          <Route path="/pet-rock" element={<PetRock />} />
          <Route path="/fake-loading" element={<FakeLoading />} />
          <Route path="/compliment-generator" element={<ComplimentGenerator />} />
          <Route path="/coin-flipper" element={<CoinFlipper />} />
          <Route path="/pointless-timer" element={<PointlessTimer />} />
          <Route path="/password-generator" element={<PasswordGenerator />} />
          <Route path="/progress-bar" element={<ProgressBar />} />
          <Route path="/text-reverser" element={<TextReverser />} />
          <Route path="/morse-code" element={<MorseCode />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
