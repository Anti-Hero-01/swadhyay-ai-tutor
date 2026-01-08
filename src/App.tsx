import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Hub from "./pages/Hub";
import Dashboard from "./pages/Dashboard";
import MicrocontrollerDetail from "./pages/MicrocontrollerDetail";
import LevelSelect from "./pages/LevelSelect";
import Modules from "./pages/Modules";
import ModuleLearning from "./pages/ModuleLearning";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";
import Chatbot from "./components/Chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/hub" element={<Hub />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/microcontroller/:id" element={<MicrocontrollerDetail />} />
          <Route path="/level-select/:mcId/:topicId" element={<LevelSelect />} />
          <Route path="/modules/:mcId/:topicId/:levelId" element={<Modules />} />
          <Route path="/learn/:mcId/:topicId/:moduleId" element={<ModuleLearning />} />
          <Route path="/quiz/:mcId/:topicId/:moduleId" element={<Quiz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
