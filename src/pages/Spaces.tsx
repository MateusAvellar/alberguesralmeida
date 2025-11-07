import { Sofa, Gamepad2, Coffee, Sparkles } from "lucide-react";
import commonAreaImage from "@/assets/common-area.jpg";
import commonLoungeImage from "@/assets/common-lounge.jpg";
import gameRoomImage from "@/assets/game-room.jpg";
import kitchenAreaImage from "@/assets/kitchen-area.jpg";

interface SpacesProps {
  translations: any;
}

const Spaces = ({ translations }: SpacesProps) => {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">
          {translations.spaces.title}
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
            <img src={commonAreaImage} alt="Área comum com jardim" className="w-full h-64 object-cover" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold">{translations.spaces.leisure}</h3>
              </div>
              <p className="text-muted-foreground">{translations.spaces.leisureDesc}</p>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
            <img src={commonLoungeImage} alt="Sala de estar aconchegante" className="w-full h-64 object-cover" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Sofa className="h-8 w-8 text-secondary" />
                <h3 className="text-2xl font-bold">{translations.spaces.living}</h3>
              </div>
              <p className="text-muted-foreground">{translations.spaces.livingDesc}</p>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
            <img src={gameRoomImage} alt="Sala de jogos" className="w-full h-64 object-cover" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Gamepad2 className="h-8 w-8 text-accent" />
                <h3 className="text-2xl font-bold">{translations.spaces.gameRoom || "Sala de Jogos"}</h3>
              </div>
              <p className="text-muted-foreground">{translations.spaces.gameRoomDesc || "Mesa de ping pong e jogos de tabuleiro em ambiente descontraído."}</p>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
            <img src={kitchenAreaImage} alt="Copa equipada" className="w-full h-64 object-cover" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Coffee className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold">{translations.spaces.kitchen}</h3>
              </div>
              <p className="text-muted-foreground">{translations.spaces.kitchenDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spaces;
