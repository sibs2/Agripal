-- Add duration_days column to courses table
ALTER TABLE public.courses
ADD COLUMN duration_days integer;