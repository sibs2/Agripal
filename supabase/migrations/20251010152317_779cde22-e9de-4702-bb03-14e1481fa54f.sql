-- Create comments table for blog posts
CREATE TABLE public.blog_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read comments
CREATE POLICY "Comments are viewable by everyone" 
ON public.blog_comments 
FOR SELECT 
USING (true);

-- Allow anyone to insert comments (for public blog)
CREATE POLICY "Anyone can create comments" 
ON public.blog_comments 
FOR INSERT 
WITH CHECK (true);

-- Allow authenticated users to delete/update all comments (for moderation)
CREATE POLICY "Authenticated users can manage comments" 
ON public.blog_comments 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Create index for faster queries
CREATE INDEX idx_blog_comments_post_id ON public.blog_comments(blog_post_id);

-- Add trigger for updated_at
CREATE TRIGGER update_blog_comments_updated_at
BEFORE UPDATE ON public.blog_comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();