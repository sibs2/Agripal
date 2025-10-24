-- Add price column to books table
ALTER TABLE public.books 
ADD COLUMN price numeric(10,2);