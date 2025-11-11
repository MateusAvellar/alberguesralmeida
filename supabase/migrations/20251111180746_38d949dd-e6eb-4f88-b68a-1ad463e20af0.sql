-- Create rooms table
CREATE TABLE public.rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_number INTEGER NOT NULL UNIQUE,
  bed_count INTEGER NOT NULL,
  base_price DECIMAL(10,2) NOT NULL,
  has_private_bathroom BOOLEAN DEFAULT false,
  is_accessible BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create beds table
CREATE TABLE public.beds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  bed_number INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(room_id, bed_number)
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bed_id UUID NOT NULL REFERENCES public.beds(id) ON DELETE CASCADE,
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255) NOT NULL,
  guest_document VARCHAR(50) NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for rooms (public read)
CREATE POLICY "Anyone can view rooms"
ON public.rooms
FOR SELECT
USING (true);

-- Create policies for beds (public read)
CREATE POLICY "Anyone can view beds"
ON public.beds
FOR SELECT
USING (true);

-- Create policies for bookings (public read for availability check)
CREATE POLICY "Anyone can view bookings"
ON public.bookings
FOR SELECT
USING (true);

-- Create policies for bookings insert (anyone can create)
CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_rooms_updated_at
BEFORE UPDATE ON public.rooms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_beds_updated_at
BEFORE UPDATE ON public.beds
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial room data (9 rooms total)
-- 3 rooms with 4 beds
INSERT INTO public.rooms (room_number, bed_count, base_price, has_private_bathroom, is_accessible) VALUES
(101, 4, 100.00, false, false),
(102, 4, 100.00, false, false),
(103, 4, 100.00, false, true);

-- 3 rooms with 8 beds
INSERT INTO public.rooms (room_number, bed_count, base_price, has_private_bathroom, is_accessible) VALUES
(201, 8, 130.00, true, false),
(202, 8, 130.00, true, false),
(203, 8, 130.00, true, false);

-- 3 rooms with 12 beds
INSERT INTO public.rooms (room_number, bed_count, base_price, has_private_bathroom, is_accessible) VALUES
(301, 12, 100.00, true, false),
(302, 12, 100.00, true, false),
(303, 12, 100.00, true, false);

-- Insert beds for each room
DO $$
DECLARE
  room_record RECORD;
  i INTEGER;
BEGIN
  FOR room_record IN SELECT id, bed_count, base_price FROM public.rooms LOOP
    FOR i IN 1..room_record.bed_count LOOP
      INSERT INTO public.beds (room_id, bed_number, price)
      VALUES (room_record.id, i, room_record.base_price);
    END LOOP;
  END LOOP;
END $$;