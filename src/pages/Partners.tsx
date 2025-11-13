import { MapPin, Car, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PartnersProps {
  translations: any;
}

const Partners = ({ translations }: PartnersProps) => {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">
          {translations.partners.title}
        </h1>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-card p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              {translations.partners.tourism}
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              {translations.partners.tourismDesc}
            </p>
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <a href="/partner/turistar" target="_blank" rel="noopener noreferrer">
                Ver mais
              </a>
            </Button>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all">
            <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Car className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              {translations.partners.transfer}
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              {translations.partners.transferDesc}
            </p>
            <Button asChild className="w-full bg-secondary hover:bg-secondary/90">
              <a href="/partner/transfer" target="_blank" rel="noopener noreferrer">
                Ver mais
              </a>
            </Button>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all">
            <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Utensils className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Comida de Casa
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Restaurante com comida caseira e ambiente acolhedor. Desconto de 20% para hóspedes!
            </p>
            <div className="mb-4 p-3 bg-accent/10 rounded-lg border-2 border-accent/20">
              <p className="text-sm text-muted-foreground mb-1">Cupom de Desconto</p>
              <p className="text-xl font-bold text-accent">PARCEIROS20</p>
              <p className="text-xs text-muted-foreground mt-1">20% de desconto</p>
            </div>
            <Button asChild className="w-full bg-accent hover:bg-accent/90">
              <a href="/partner/comida-de-casa" target="_blank" rel="noopener noreferrer">
                Ver mais
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
