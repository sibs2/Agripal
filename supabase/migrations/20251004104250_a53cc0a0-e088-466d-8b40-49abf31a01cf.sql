-- Remove the check constraint on category to allow any text value
ALTER TABLE public.courses DROP CONSTRAINT IF EXISTS courses_category_check;