-- Create subscribers table
CREATE TABLE public.subscribers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  subscribed_at timestamp with time zone NOT NULL DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe
CREATE POLICY "Anyone can subscribe"
ON public.subscribers
FOR INSERT
WITH CHECK (true);

-- Only authenticated users (admins) can view subscribers
CREATE POLICY "Authenticated users can view subscribers"
ON public.subscribers
FOR SELECT
USING (auth.role() = 'authenticated');

-- Only authenticated users (admins) can delete subscribers
CREATE POLICY "Authenticated users can delete subscribers"
ON public.subscribers
FOR DELETE
USING (auth.role() = 'authenticated');