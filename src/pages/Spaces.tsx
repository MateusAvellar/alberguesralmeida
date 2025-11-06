import { Palmtree, UtensilsCrossed, WashingMachine, Bath, Tv } from "lucide-react";
import commonAreaImage from "@/assets/common-area.jpg";

interface SpacesProps {
  translations: any;
}

const Spaces = ({ translations }: SpacesProps) => {
  const spaces = [
    {
      icon: Palmtree,
      title: translations.spaces.leisure,
      description: translations.spaces.leisureDesc,
      color: "text-primary",
    },
    {
      icon: UtensilsCrossed,
      title: translations.spaces.kitchen,
      description: translations.spaces.kitchenDesc,
      color: "text-secondary",
    },
    {
      icon: WashingMachine,
      title: translations.spaces.laundry,
      description: translations.spaces.laundryDesc,
      color: "text-primary",
    },
    {
      icon: Bath,
      title: translations.spaces.bathroom,
      description: translations.spaces.bathroomDesc,
      color: "text-secondary",
    },
    {
      icon: Tv,
      title: translations.spaces.living,
      description: translations.spaces.livingDesc,
      color: "text-primary",
    },
  ];

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">
          {translations.spaces.title}
        </h1>
        
        <div className="max-w-5xl mx-auto mb-12">
          <img
            src={commonAreaImage}
            alt="Áreas comuns"
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {spaces.map((space, index) => {
            const Icon = space.icon;
            return (
              <div
                key={index}
                className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className={`${space.color}`}>
                    <Icon className="h-10 w-10" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-foreground">{space.title}</h3>
                    <p className="text-muted-foreground">{space.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Spaces;
