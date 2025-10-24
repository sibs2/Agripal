import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, User, X, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ArticleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    id: string;
    title: string;
    content: string;
    author: string;
    category: string;
    created_at: string;
    cover_image_url?: string;
    excerpt?: string;
  } | null;
}

const ArticleDialog = ({ isOpen, onClose, article }: ArticleDialogProps) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState({ name: "", email: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (article?.id) {
      fetchComments();
    }
  }, [article?.id]);

  const fetchComments = async () => {
    if (!article) return;
    
    const { data, error } = await supabase
      .from('blog_comments')
      .select('*')
      .eq('blog_post_id', article.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data || []);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.name || !newComment.email || !newComment.text) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase
      .from('blog_comments')
      .insert({
        blog_post_id: article!.id,
        user_name: newComment.name,
        user_email: newComment.email,
        comment_text: newComment.text,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to post comment",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Your comment has been posted",
      });
      setNewComment({ name: "", email: "", text: "" });
      fetchComments();
    }

    setIsSubmitting(false);
  };

  if (!article) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl md:text-3xl font-bold leading-tight pr-8">
                {article.title}
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>By {article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(article.created_at)}</span>
            </div>
            <Badge variant="secondary">{article.category}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {article.cover_image_url && (
            <div className="aspect-video overflow-hidden rounded-lg">
              <img 
                src={article.cover_image_url} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-gray max-w-none dark:prose-invert">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {article.content}
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-6 pt-8 border-t">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium">Leave a Comment</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Your name"
                  value={newComment.name}
                  onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={newComment.email}
                  onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                  required
                />
              </div>
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment.text}
                onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                rows={4}
                required
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No comments yet. Be the first to share your thoughts!
                </p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-muted/30 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.user_name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-foreground/80">{comment.comment_text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleDialog;