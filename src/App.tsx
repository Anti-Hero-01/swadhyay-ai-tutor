import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

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
import ProtectedRoute from "@/components/ProtectedRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Protected */}
        <Route
          path="/hub"
          element={
            <ProtectedRoute>
              <Hub />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/microcontroller/:id"
          element={
            <ProtectedRoute>
              <MicrocontrollerDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/level-select/:mcId/:topicId"
          element={
            <ProtectedRoute>
              <LevelSelect />
            </ProtectedRoute>
          }
        />

        <Route
          path="/modules/:mcId/:topicId/:levelId"
          element={
            <ProtectedRoute>
              <Modules />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learn/:mcId/:topicId/:moduleId"
          element={
            <ProtectedRoute>
              <ModuleLearning />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz/:mcId/:topicId/:moduleId"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Global chatbot */}
      <Chatbot />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
