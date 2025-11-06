import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { PromoPopup } from "@/components/PromoPopup";
import { translations } from "@/lib/translations";
import Home from "./pages/Home";
import About from "./pages/About";
import Rules from "./pages/Rules";
import Spaces from "./pages/Spaces";
import Login from "./pages/Login";
import Benefits from "./pages/Benefits";
import Partners from "./pages/Partners";
import Rooms from "./pages/Rooms";
import Payment from "./pages/Payment";
import PartnerPage from "./pages/PartnerPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [language, setLanguage] = useState("pt");
  const t = translations[language as keyof typeof translations];

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation language={language} setLanguage={setLanguage} translations={t} />
          <Routes>
            <Route path="/" element={<Home translations={t} />} />
            <Route path="/about" element={<About translations={t} />} />
            <Route path="/rules" element={<Rules translations={t} />} />
            <Route path="/spaces" element={<Spaces translations={t} />} />
            <Route path="/login" element={<Login translations={t} />} />
            <Route path="/benefits" element={<Benefits translations={t} />} />
            <Route path="/partners" element={<Partners translations={t} />} />
            <Route path="/rooms" element={<Rooms translations={t} />} />
            <Route path="/payment" element={<Payment translations={t} />} />
            <Route path="/partner/:partner" element={<PartnerPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <PromoPopup translations={t} />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
