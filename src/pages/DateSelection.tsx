import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateSelectionProps {
  translations: any;
}

const DateSelection = ({ translations }: DateSelectionProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();

  const roomId = location.state?.roomId;

  if (!roomId) {
    navigate("/rooms");
    return null;
  }

  const rooms = [
    { id: 1, beds: 4, price: 100 },
    { id: 2, beds: 4, price: 100 },
    { id: 3, beds: 4, price: 100 },
    { id: 4, beds: 8, price: 150 },
    { id: 5, beds: 8, price: 120 },
    { id: 6, beds: 8, price: 120 },
    { id: 7, beds: 12, price: 130 },
    { id: 8, beds: 12, price: 130 },
    { id: 9, beds: 12, price: 130 },
  ];

  const room = rooms.find((r) => r.id === roomId);
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const totalPrice = room && nights > 0 ? room.price * nights : 0;

  const handleContinue = () => {
    if (!checkIn || !checkOut) {
      toast.error(translations.dateSelection?.selectDates || "Selecione as datas de check-in e check-out");
      return;
    }

    if (checkOut <= checkIn) {
      toast.error(translations.dateSelection?.invalidDates || "A data de check-out deve ser após o check-in");
      return;
    }

    navigate("/payment", {
      state: {
        roomId,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        nights,
        totalPrice,
      },
    });
  };

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">
            {translations.dateSelection?.title || "Selecione as Datas"}
          </h1>

          <div className="bg-card p-8 rounded-xl shadow-xl space-y-6">
            <div>
              <Label className="text-lg font-semibold mb-4 block">
                {translations.dateSelection?.checkIn || "Check-in"}
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !checkIn && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "PPP") : <span>{translations.dateSelection?.pickCheckIn || "Escolha a data de entrada"}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-lg font-semibold mb-4 block">
                {translations.dateSelection?.checkOut || "Check-out"}
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !checkOut && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "PPP") : <span>{translations.dateSelection?.pickCheckOut || "Escolha a data de saída"}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    disabled={(date) => !checkIn || date <= checkIn}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {nights > 0 && (
              <div className="bg-muted p-6 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">
                    {translations.dateSelection?.nights || "Noites"}:
                  </span>
                  <span className="font-semibold">{nights}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">
                    {translations.dateSelection?.pricePerNight || "Preço por noite"}:
                  </span>
                  <span className="font-semibold">R$ {room?.price}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold text-primary pt-2 border-t border-border mt-2">
                  <span>{translations.dateSelection?.total || "Total"}:</span>
                  <span>R$ {totalPrice}</span>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate("/rooms")}
              >
                {translations.dateSelection?.cancel || "Cancelar"}
              </Button>
              <Button
                type="button"
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={handleContinue}
              >
                {translations.dateSelection?.continue || "Continuar"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateSelection;
