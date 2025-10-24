import { useState, useEffect } from "react";
import { Search, Calendar, User, ArrowRight, Tag, MessageCircle, Heart, Share2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import ArticleDialog from "@/components/ArticleDialog";
import blogBackground from "@/assets/blog-background.jpg";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setBlogPosts(data || []);
        
        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(data?.map(post => post.category) || [])];
        setCategories(uniqueCategories);

        // Fetch comment counts for all posts
        if (data && data.length > 0) {
          const postIds = data.map(post => post.id);
          const { data: comments, error: commentsError } = await supabase
            .from('blog_comments')
            .select('blog_post_id')
            .in('blog_post_id', postIds);

          if (!commentsError && comments) {
            const counts: Record<string, number> = {};
            comments.forEach(comment => {
              counts[comment.blog_post_id] = (counts[comment.blog_post_id] || 0) + 1;
            });
            setCommentCounts(counts);
          }
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        toast({
          title: "Error",
          description: "Failed to fetch blog posts",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const filteredPosts = blogPosts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return a.author.localeCompare(b.author);
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleReadArticle = (article: any) => {
    setSelectedArticle(article);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedArticle(null);
  };

  const handleLike = async (postId: string) => {
    const isLiked = likedPosts.has(postId);
    const userIdentifier = localStorage.getItem('userIdentifier') || `user_${Date.now()}`;
    
    if (!localStorage.getItem('userIdentifier')) {
      localStorage.setItem('userIdentifier', userIdentifier);
    }

    try {
      if (isLiked) {
        // Unlike - delete the like record
        const { error } = await supabase
          .from('blog_likes')
          .delete()
          .eq('blog_post_id', postId)
          .eq('user_identifier', userIdentifier);

        if (error) throw error;

        setLikedPosts(prev => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });

        // Update local count immediately
        setBlogPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, likes_count: Math.max((post.likes_count || 0) - 1, 0) }
            : post
        ));
      } else {
        // Like - insert a like record
        const { error } = await supabase
          .from('blog_likes')
          .insert({ blog_post_id: postId, user_identifier: userIdentifier });

        if (error) throw error;

        setLikedPosts(prev => {
          const newSet = new Set(prev);
          newSet.add(postId);
          return newSet;
        });

        // Update local count immediately
        setBlogPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, likes_count: (post.likes_count || 0) + 1 }
            : post
        ));
      }
    } catch (error) {
      console.error('Error updating like:', error);
      toast({
        title: "Error",
        description: "Failed to update like",
        variant: "destructive",
      });
    }
  };

  const handleShare = async (post: any) => {
    try {
      // Increment share count in database
      const { error } = await supabase
        .from('blog_posts')
        .update({ shares_count: (post.shares_count || 0) + 1 })
        .eq('id', post.id);

      if (error) throw error;

      // Update local state
      setBlogPosts(prev => prev.map(p => 
        p.id === post.id 
          ? { ...p, shares_count: (p.shares_count || 0) + 1 }
          : p
      ));

      // Perform the actual share action
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt || post.content.substring(0, 100),
          url: window.location.href,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Article link copied to clipboard",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Error",
        description: "Failed to share article",
        variant: "destructive",
      });
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribing(true);

    try {
      const { error } = await supabase
        .from('subscribers')
        .insert({ email: subscribeEmail });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Subscribed!",
          description: "Thank you for subscribing to our newsletter",
        });
        setSubscribeEmail("");
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubscribing(false);
    }
  };

  const handleComment = (post: any) => {
    handleReadArticle(post);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header Section */}
      <section 
        className="relative bg-primary text-primary-foreground py-16 bg-cover bg-center"
        style={{ backgroundImage: `url(${blogBackground})` }}
      >
        <div className="absolute inset-0 bg-primary/85" />
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">
              Agricultural Insights
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Stay informed with the latest trends, research, and innovations shaping the future of agriculture
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-4 sm:py-8 bg-background/50 backdrop-blur-sm sticky top-16 z-40 border-b">
        <div className="container px-4">
          <div className="flex flex-col gap-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Tag className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Latest</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      {filteredPosts.length > 0 ? (
        <>
          {/* Featured Post */}
          <section className="py-12">
            <div className="container px-4">
              <h2 className="text-2xl font-bold mb-8 text-center">Latest Article</h2>
              <Card className="overflow-hidden hover:shadow-strong transition-all duration-300 max-w-4xl mx-auto">
                <div className="md:flex">
                  <div className="md:w-1/2 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
                    {filteredPosts[0].cover_image_url ? (
                      <img 
                        src={filteredPosts[0].cover_image_url} 
                        alt={filteredPosts[0].title}
                        loading="eager"
                        fetchPriority="high"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-6xl text-primary/30">📰</div>
                      </div>
                    )}
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary">{filteredPosts[0].category}</Badge>
                      <span className="text-sm text-muted-foreground">By {filteredPosts[0].author}</span>
                    </div>
                    <CardTitle className="text-2xl mb-4 leading-tight">
                      {filteredPosts[0].title}
                    </CardTitle>
                    <p className="text-foreground/80 mb-6 line-clamp-4">
                      {filteredPosts[0].excerpt || filteredPosts[0].content.substring(0, 200) + '...'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Published {formatDate(filteredPosts[0].created_at)}
                      </div>
                      <Button onClick={() => handleReadArticle(filteredPosts[0])}>
                        Read Article
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="py-12">
            <div className="container px-4">
              <h2 className="text-2xl font-bold mb-8 text-center">All Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                        {post.cover_image_url ? (
                          <img 
                            src={post.cover_image_url} 
                            alt={post.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-4xl text-primary/30">📄</div>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-sm text-muted-foreground">By {post.author}</span>
                      </div>
                      <CardTitle className="line-clamp-2 text-lg leading-tight">
                        {post.title}
                      </CardTitle>
                      <p className="text-sm text-foreground/80 line-clamp-3">
                        {post.excerpt || post.content.substring(0, 150) + '...'}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Published</span>
                        <span>{formatDate(post.created_at)}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="w-full group"
                        onClick={() => handleReadArticle(post)}
                      >
                        Read Article
                      </Button>
                      
                      {/* Interactive Actions */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => handleComment(post)}
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{commentCounts[post.id] || 0}</span>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`flex items-center gap-2 ${likedPosts.has(post.id) ? 'text-red-500' : ''}`}
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart className={`h-4 w-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                          <span className="text-sm">{post.likes_count || 0}</span>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => handleShare(post)}
                        >
                          <Share2 className="h-4 w-4" />
                          <span className="text-sm">{post.shares_count || 0}</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="py-12">
          <div className="container px-4">
            <div className="text-center py-16 space-y-4">
              <div className="text-6xl text-muted-foreground/30 mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedCategory !== "All" 
                  ? "Try adjusting your search criteria."
                  : "No blog posts have been published yet."
                }
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Subscription */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Stay Updated</h2>
            <p className="text-primary-foreground/90">
              Subscribe to our newsletter and never miss the latest agricultural insights and innovations
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                placeholder="Enter your email" 
                className="bg-primary-foreground text-primary border-primary-foreground"
                required
              />
              <Button type="submit" variant="secondary" disabled={subscribing}>
                {subscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <ArticleDialog 
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        article={selectedArticle}
      />
    </div>
  );
};

export default Blog;