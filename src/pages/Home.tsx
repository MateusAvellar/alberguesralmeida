import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/santa-teresa-tram-hero.jpg";

interface HomeProps {
  translations: any;
}

const Home = ({ translations }: HomeProps) => {
  return (
    <div className="min-h-screen">
      <section
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {translations.home.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
            {translations.home.subtitle}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90 shadow-2xl text-lg px-8 py-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300"
          >
            <Link to="/rooms">{translations.home.cta}</Link>
          </Button>
        </div>
      </section>

      <section className="py-20 bg-muted">
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
