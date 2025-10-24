-- Add date and classification fields to courses table
ALTER TABLE public.courses 
ADD COLUMN course_date DATE,
ADD COLUMN classification TEXT CHECK (classification IN ('online', 'physical'));