-- Permitir UPDATE e DELETE em rooms
CREATE POLICY "Anyone can update rooms"
ON public.rooms
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can insert rooms"
ON public.rooms
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can delete rooms"
ON public.rooms
FOR DELETE
USING (true);

-- Permitir UPDATE e DELETE em beds
CREATE POLICY "Anyone can update beds"
ON public.beds
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can insert beds"
ON public.beds
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can delete beds"
ON public.beds
FOR DELETE
USING (true);