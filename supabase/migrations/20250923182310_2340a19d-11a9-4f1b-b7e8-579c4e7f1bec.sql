-- Fix the difficulty_level constraint to match the form values
ALTER TABLE courses DROP CONSTRAINT IF EXISTS courses_difficulty_level_check;

-- Add the correct constraint with proper values
ALTER TABLE courses ADD CONSTRAINT courses_difficulty_level_check 
CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced'));

-- Also fix the category constraint to match form values
ALTER TABLE courses DROP CONSTRAINT IF EXISTS courses_category_check;

-- Add category constraint with form values
ALTER TABLE courses ADD CONSTRAINT courses_category_check 
CHECK (category IN ('technology', 'sustainability', 'soil-science', 'plant-health', 'business', 'organic'));