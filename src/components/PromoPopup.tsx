import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PromoPopupProps {
  translations: any;
}

export const PromoPopup = ({ translations }: PromoPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPromo = sessionStorage.getItem("promoSeen");
      if (!hasSeenPromo) {
        setIsVisible(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("promoSeen", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-500">
      <div className="bg-gradient-to-br from-primary to-secondary p-6 rounded-xl shadow-2xl max-w-sm relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-primary-foreground hover:bg-white/20"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="pr-8">
          <h3 className="text-xl font-bold text-primary-foreground mb-2">
            {translations.promo.title}
          </h3>
          <p className="text-primary-foreground/90 mb-4">
            {translations.promo.description}
          </p>
          <Button
            variant="secondary"
            className="w-full bg-white text-primary hover:bg-white/90"
            asChild
          >
            <a href="/rooms">{translations.nav.rooms}</a>
          </Button>
        </div>
      </div>
    </div>
  );
};
