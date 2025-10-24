-- Add like and share counts to blog_posts
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS likes_count INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS shares_count INTEGER NOT NULL DEFAULT 0;

-- Create a table to track individual likes (to prevent duplicate likes)
CREATE TABLE IF NOT EXISTS public.blog_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  user_identifier TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(blog_post_id, user_identifier)
);

-- Enable RLS on blog_likes
ALTER TABLE public.blog_likes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view likes
CREATE POLICY "Likes are viewable by everyone" 
ON public.blog_likes 
FOR SELECT 
USING (true);

-- Allow anyone to insert likes
CREATE POLICY "Anyone can like posts" 
ON public.blog_likes 
FOR INSERT 
WITH CHECK (true);

-- Allow users to delete their own likes (unlike)
CREATE POLICY "Users can unlike posts" 
ON public.blog_likes 
FOR DELETE 
USING (true);

-- Create index for faster queries
CREATE INDEX idx_blog_likes_post_id ON public.blog_likes(blog_post_id);

-- Function to update likes_count when a like is added
CREATE OR REPLACE FUNCTION update_blog_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.blog_posts 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.blog_post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.blog_posts 
    SET likes_count = GREATEST(likes_count - 1, 0) 
    WHERE id = OLD.blog_post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update likes_count
CREATE TRIGGER update_likes_count_trigger
AFTER INSERT OR DELETE ON public.blog_likes
FOR EACH ROW
EXECUTE FUNCTION update_blog_post_likes_count();