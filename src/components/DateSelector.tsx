import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DateSelectorProps {
  translations: any;
  onDatesSelected: (checkIn: Date | undefined, checkOut: Date | undefined) => void;
}

export const DateSelector = ({ translations, onDatesSelected }: DateSelectorProps) => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();

  const handleCheckInChange = (date: Date | undefined) => {
    setCheckIn(date);
    if (date && checkOut && date > checkOut) {
      setCheckOut(undefined);
    }
    onDatesSelected(date, checkOut);
  };

  const handleCheckOutChange = (date: Date | undefined) => {
    setCheckOut(date);
    onDatesSelected(checkIn, date);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full sm:w-[240px] justify-start text-left font-normal bg-card hover:bg-accent",
              !checkIn && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {checkIn ? format(checkIn, "PPP") : <span>{translations.home.checkIn}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={checkIn}
            onSelect={handleCheckInChange}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full sm:w-[240px] justify-start text-left font-normal bg-card hover:bg-accent",
              !checkOut && "text-muted-foreground"
            )}
            disabled={!checkIn}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {checkOut ? format(checkOut, "PPP") : <span>{translations.home.checkOut}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={checkOut}
            onSelect={handleCheckOutChange}
            disabled={(date) => !checkIn || date <= checkIn}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
