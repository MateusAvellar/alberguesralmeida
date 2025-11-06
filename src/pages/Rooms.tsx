import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import room4BedsImage from "@/assets/room-4-beds.jpg";
import room8BedsImage from "@/assets/room-8-beds.jpg";
import room12BedsImage from "@/assets/room-12-beds.jpg";
import roomAccessibleImage from "@/assets/room-accessible.jpg";

interface RoomsProps {
  translations: any;
}

const Rooms = ({ translations }: RoomsProps) => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  const rooms = [
    {
      id: 1,
      name: "Quarto 4 Camas",
      beds: 4,
      price: 100,
      image: room4BedsImage,
      available: true,
      hasBathroom: false,
      accessible: false,
      promo: true,
    },
    {
      id: 2,
      name: "Quarto 4 Camas",
      beds: 4,
      price: 100,
      image: room4BedsImage,
      available: true,
      hasBathroom: false,
      accessible: false,
      promo: true,
    },
    {
      id: 3,
      name: "Quarto 4 Camas Acessível",
      beds: 4,
      price: 100,
      image: roomAccessibleImage,
      available: true,
      hasBathroom: false,
      accessible: true,
      promo: true,
    },
    {
      id: 4,
      name: "Quarto 8 Camas",
      beds: 8,
      price: 120,
      image: room8BedsImage,
      available: true,
      hasBathroom: true,
      accessible: false,
    },
    {
      id: 5,
      name: "Quarto 8 Camas",
      beds: 8,
      price: 120,
      image: room8BedsImage,
      available: false,
      hasBathroom: true,
      accessible: false,
    },
    {
      id: 6,
      name: "Quarto 8 Camas Acessível",
      beds: 8,
      price: 120,
      image: roomAccessibleImage,
      available: true,
      hasBathroom: true,
      accessible: true,
    },
    {
      id: 7,
      name: "Quarto 12 Camas",
      beds: 12,
      price: 130,
      image: room12BedsImage,
      available: true,
      hasBathroom: true,
      accessible: false,
    },
    {
      id: 8,
      name: "Quarto 12 Camas",
      beds: 12,
      price: 130,
      image: room12BedsImage,
      available: true,
      hasBathroom: true,
      accessible: false,
    },
    {
      id: 9,
      name: "Quarto 12 Camas",
      beds: 12,
      price: 130,
      image: room12BedsImage,
      available: false,
      hasBathroom: true,
      accessible: false,
    },
  ];

  const handleBooking = (roomId: number) => {
    setSelectedRoom(roomId);
    navigate("/payment", { state: { roomId } });
  };

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">
          {translations.rooms.title}
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105"
            >
              <div className="relative">
                <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
                {room.promo && (
                  <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
                    Promoção
                  </Badge>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground">{room.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {room.beds} {translations.rooms.beds}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.hasBathroom && (
                    <Badge variant="secondary">{translations.rooms.withBathroom}</Badge>
                  )}
                  {room.accessible && (
                    <Badge variant="outline" className="border-primary text-primary">
                      {translations.rooms.accessible}
                    </Badge>
                  )}
                </div>
                {room.promo && room.beds === 4 && (
                  <p className="text-sm text-primary font-semibold mb-3">
                    {translations.rooms.promo4bed}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">R$ {room.price}</p>
                    <p className="text-sm text-muted-foreground">{translations.rooms.perBed}</p>
                  </div>
                  <Button
                    onClick={() => handleBooking(room.id)}
                    disabled={!room.available}
                    className={
                      room.available
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }
                  >
                    {room.available
                      ? translations.rooms.available
                      : translations.rooms.unavailable}
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-muted/50 rounded-xl border-2 border-dashed border-border p-6 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-bold mb-2 text-foreground">
              {translations.rooms.comingSoon}
            </h3>
            <p className="text-muted-foreground">{translations.rooms.comingSoonDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
