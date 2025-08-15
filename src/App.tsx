import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import PreEvent from "./pages/PreEvent";
import LiveEvent from "./pages/LiveEvent";
import PostEvent from "./pages/PostEvent";
import Audience from "./pages/Audience";
import Venues from "./pages/Venues";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen w-full bg-gradient-dashboard">
            <DashboardSidebar />
            <main className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/pre-event" element={<PreEvent />} />
                <Route path="/live" element={<LiveEvent />} />
                <Route path="/post-event" element={<PostEvent />} />
                <Route path="/audience" element={<Audience />} />
                <Route path="/venues" element={<Venues />} />
                <Route path="/sentiment" element={<Index />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
