import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import heroImageLight from "@/assets/santa-teresa-tram-hero.jpg";
import heroImageDark from "@/assets/lapa-nightlife-hero.jpg";
import cristoRedentorDark from "@/assets/cristo-redentor-dark.jpg";
import { DateSelector } from "@/components/DateSelector";
import { AvailableRooms } from "@/components/AvailableRooms";
import { toast } from "sonner";

interface HomeProps {
  translations: any;
}

const Home = ({ translations }: HomeProps) => {
  const [isDark, setIsDark] = useState(false);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [cart, setCart] = useState<Array<{ room: any; beds: number }>>([]);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    
    return () => observer.disconnect();
  }, []);

  const heroImage = isDark ? heroImageDark : heroImageLight;

  const handleDatesSelected = (newCheckIn: Date | undefined, newCheckOut: Date | undefined) => {
    setCheckIn(newCheckIn);
    setCheckOut(newCheckOut);
  };

  const handleAddToCart = (room: any, beds: number) => {
    setCart([...cart, { room, beds }]);
    toast.success(`${beds} cama(s) adicionada(s) ao carrinho!`);
  };

  return (
    <div className="min-h-screen" style={isDark ? { backgroundImage: `url(${cristoRedentorDark})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' } : {}}>
      <section
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {translations.home.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
            {translations.home.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white text-primary hover:bg-white/90 shadow-2xl text-lg px-8 py-6 border-2 border-white"
            >
              <Link to="#dates">{translations.home.selectDates}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-2xl text-lg px-8 py-6"
            >
              <Link to="/rooms">{translations.home.cta}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="dates" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            {translations.home.selectDates}
          </h2>
          <DateSelector translations={translations} onDatesSelected={handleDatesSelected} />
        </div>
      </section>

      {(checkIn && checkOut) && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">
              {translations.home.availableRooms}
            </h2>
            <AvailableRooms 
              translations={translations} 
              checkIn={checkIn} 
              checkOut={checkOut}
              onAddToCart={handleAddToCart}
            />
          </div>
        </section>
      )}

      <section className="py-20">
        <footer className="py-6 px-4 text-left text-sm text-muted-foreground">
          <p>Criado e desenvolvido por Mateus Mendes, Kayke Piccoli e Samuel Gonçalves</p>
        </footer>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-primary mb-4">{translations.spaces.leisure}</h3>
              <p className="text-muted-foreground">{translations.spaces.leisureDesc}</p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-secondary mb-4">{translations.benefits.discounts}</h3>
              <p className="text-muted-foreground">{translations.benefits.discountsDesc}</p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-primary mb-4">{translations.benefits.bedding}</h3>
              <p className="text-muted-foreground">{translations.benefits.beddingDesc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
