-- Add missing columns to books table
ALTER TABLE public.books 
ADD COLUMN whatsapp_link TEXT,
ADD COLUMN rating INTEGER CHECK (rating >= 1 AND rating <= 5);

-- Create storage bucket for book covers
INSERT INTO storage.buckets (id, name, public) 
VALUES ('book-covers', 'book-covers', true);

-- Create RLS policies for book covers storage
CREATE POLICY "Allow public read access to book covers" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'book-covers');

CREATE POLICY "Allow authenticated users to upload book covers" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'book-covers' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update book covers" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'book-covers' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete book covers" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'book-covers' AND auth.role() = 'authenticated');