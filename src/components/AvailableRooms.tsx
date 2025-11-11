import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Bath, Accessibility } from "lucide-react";
import { toast } from "sonner";

interface Room {
  id: string;
  room_number: number;
  bed_count: number;
  base_price: number;
  has_private_bathroom: boolean;
  is_accessible: boolean;
  available_beds: number;
}

interface AvailableRoomsProps {
  translations: any;
  checkIn?: Date;
  checkOut?: Date;
  onAddToCart: (room: Room, beds: number) => void;
}

export const AvailableRooms = ({ translations, checkIn, checkOut, onAddToCart }: AvailableRoomsProps) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (checkIn && checkOut) {
      fetchAvailableRooms();
    } else {
      setRooms([]);
    }
  }, [checkIn, checkOut]);

  const fetchAvailableRooms = async () => {
    if (!checkIn || !checkOut) return;

    setLoading(true);
    try {
      // Get all rooms
      const { data: roomsData, error: roomsError } = await supabase
        .from("rooms")
        .select("*");

      if (roomsError) throw roomsError;

      // Get all bookings that overlap with selected dates
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .select("bed_id")
        .gte("check_out", checkIn.toISOString().split("T")[0])
        .lte("check_in", checkOut.toISOString().split("T")[0]);

      if (bookingsError) throw bookingsError;

      const bookedBedIds = new Set(bookingsData.map((b) => b.bed_id));

      // Get all beds
      const { data: bedsData, error: bedsError } = await supabase
        .from("beds")
        .select("*");

      if (bedsError) throw bedsError;

      // Calculate available beds per room
      const roomsWithAvailability = roomsData.map((room) => {
        const roomBeds = bedsData.filter((bed) => bed.room_id === room.id);
        const availableBeds = roomBeds.filter((bed) => !bookedBedIds.has(bed.id)).length;

        return {
          ...room,
          available_beds: availableBeds,
        };
      }).filter((room) => room.available_beds > 0);

      setRooms(roomsWithAvailability);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast.error("Erro ao carregar quartos disponíveis");
    } finally {
      setLoading(false);
    }
  };

  if (!checkIn || !checkOut) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">{translations.home.selectDatesFirst}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">Nenhum quarto disponível para estas datas</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardTitle className="flex items-center justify-between">
              <span>{translations.home.room} {room.room_number}</span>
              <Badge variant="secondary">
                <Users className="w-4 h-4 mr-1" />
                {room.bed_count}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{room.available_beds} {translations.home.bedsAvailable}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {room.has_private_bathroom && (
                <Badge variant="outline" className="gap-1">
                  <Bath className="w-3 h-3" />
                  {translations.home.privateBathroom}
                </Badge>
              )}
              {room.is_accessible && (
                <Badge variant="outline" className="gap-1">
                  <Accessibility className="w-3 h-3" />
                  {translations.home.accessible}
                </Badge>
              )}
            </div>

            <div className="pt-4 border-t">
              <div className="text-2xl font-bold text-primary mb-2">
                R$ {room.base_price.toFixed(2)}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  {translations.home.perBed}
                </span>
              </div>
              <Button 
                className="w-full" 
                onClick={() => onAddToCart(room, 1)}
              >
                {translations.home.addToCart}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
