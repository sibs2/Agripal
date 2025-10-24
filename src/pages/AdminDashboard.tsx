import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { BookOpen, GraduationCap, PenTool, Upload, LogOut, Trash2, Star, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Form types
interface BookFormData {
  title: string;
  author: string;
  description: string;
  category: string;
  isbn?: string;
  publicationDate: string;
  coverImage?: File;
  whatsappLink: string;
  rating: number;
  price?: string;
}

interface CourseFormData {
  title: string;
  description: string;
  instructor: string;
  durationDays: string;
  durationHours: string;
  level: string;
  category: string;
  price?: string;
  coverImage?: File;
  prerequisites: string;
  whatsappLink: string;
  courseDate?: string;
  classification?: string;
}

interface BlogFormData {
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string;
  featuredImage?: File;
  metaDescription: string;
  status: string;
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("library");
  const [books, setBooks] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

  const bookForm = useForm<BookFormData>();
  const courseForm = useForm<CourseFormData>();
  const blogForm = useForm<BlogFormData>();

  // Fetch books, courses, blog posts, and subscribers on component mount
  useEffect(() => {
    fetchBooks();
    fetchCourses();
    fetchBlogPosts();
    fetchSubscribers();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBooks(data || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      toast({
        title: "Error",
        description: "Failed to fetch books",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      navigate("/", { replace: true });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const uploadBookCover = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('book-covers')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('book-covers')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading book cover:', error);
      return null;
    }
  };

  const onSubmitBook = async (data: BookFormData) => {
    setLoading(true);
    try {
      let coverImageUrl = null;
      
      // Upload cover image if provided
      if (data.coverImage) {
        coverImageUrl = await uploadBookCover(data.coverImage);
        if (!coverImageUrl) {
          throw new Error("Failed to upload cover image");
        }
      }

      // Extract year from publication date
      const publicationYear = data.publicationDate ? 
        new Date(data.publicationDate).getFullYear() : null;

      // Insert book into database
      const { error } = await supabase
        .from('books')
        .insert({
          title: data.title,
          author: data.author,
          description: data.description,
          category: data.category,
          isbn: data.isbn || null,
          publication_year: publicationYear,
          cover_image_url: coverImageUrl,
          whatsapp_link: data.whatsappLink,
          rating: data.rating,
          price: data.price ? parseFloat(data.price) : null,
        });

      if (error) throw error;

      toast({
        title: "Book Added",
        description: "The book has been successfully added to the library.",
      });
      
      bookForm.reset();
      fetchBooks(); // Refresh the books list
    } catch (error) {
      console.error('Error adding book:', error);
      toast({
        title: "Error",
        description: "Failed to add book. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: "Error",
        description: "Failed to fetch courses",
        variant: "destructive",
      });
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive",
      });
    }
  };

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch subscribers",
        variant: "destructive",
      });
    }
  };

  const deleteSubscriber = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return;

    try {
      const { error } = await supabase
        .from('subscribers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Subscriber deleted",
        description: "Subscriber removed successfully",
      });

      fetchSubscribers();
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      toast({
        title: "Error",
        description: "Failed to delete subscriber",
        variant: "destructive",
      });
    }
  };

  const deleteCourse = async (courseId: string, coverImageUrl?: string) => {
    try {
      // Delete cover image from storage if it exists
      if (coverImageUrl) {
        const urlParts = coverImageUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        await supabase.storage.from('book-covers').remove([fileName]);
      }

      // Delete course from database
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);

      if (error) throw error;

      toast({
        title: "Course Deleted",
        description: "The course has been successfully deleted.",
      });
      
      fetchCourses(); // Refresh the courses list
    } catch (error) {
      console.error('Error deleting course:', error);
      toast({
        title: "Error",
        description: "Failed to delete course. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteBook = async (bookId: string, coverImageUrl?: string) => {
    try {
      // Delete cover image from storage if it exists
      if (coverImageUrl) {
        const urlParts = coverImageUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        await supabase.storage.from('book-covers').remove([fileName]);
      }

      // Delete book from database
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', bookId);

      if (error) throw error;

      toast({
        title: "Book Deleted",
        description: "The book has been successfully deleted.",
      });
      
      fetchBooks(); // Refresh the books list
    } catch (error) {
      console.error('Error deleting book:', error);
      toast({
        title: "Error",
        description: "Failed to delete book. Please try again.",
        variant: "destructive",
      });
    }
  };

  const editCourse = (course: any) => {
    setEditingCourseId(course.id);
    courseForm.reset({
      title: course.title,
      description: course.description || '',
      instructor: course.instructor,
      durationDays: course.duration_days?.toString() || '',
      durationHours: course.duration_hours?.toString() || '',
      level: course.difficulty_level,
      category: course.category,
      price: course.price?.toString() || '',
      courseDate: course.course_date || '',
      classification: course.classification || '',
      prerequisites: course.prerequisites || '',
      whatsappLink: course.whatsapp_link || ''
    });
    // Scroll to the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmitCourse = async (data: CourseFormData) => {
    try {
      setLoading(true);
      
      let coverImageUrl = null;
      
      // Upload cover image if provided
      if (data.coverImage) {
        coverImageUrl = await uploadBookCover(data.coverImage);
      }
      
      const courseData = {
        title: data.title,
        description: data.description,
        instructor: data.instructor,
        duration_days: data.durationDays ? parseInt(data.durationDays) : null,
        duration_hours: data.durationHours ? parseInt(data.durationHours) : null,
        difficulty_level: data.level,
        category: data.category,
        price: data.price ? parseFloat(data.price) : null,
        course_date: data.courseDate || null,
        classification: data.classification || null,
        prerequisites: data.prerequisites || null,
        whatsapp_link: data.whatsappLink,
        ...(coverImageUrl && { cover_image_url: coverImageUrl })
      };

      if (editingCourseId) {
        // Update existing course
        const { error } = await supabase
          .from('courses')
          .update(courseData)
          .eq('id', editingCourseId);

        if (error) throw error;

        toast({
          title: "Course Updated",
          description: "The course has been successfully updated.",
        });
      } else {
        // Insert new course
        const { error } = await supabase
          .from('courses')
          .insert([courseData]);

        if (error) throw error;

        toast({
          title: "Course Created",
          description: "The course has been successfully created.",
        });
      }
      
      courseForm.reset();
      setEditingCourseId(null);
      fetchCourses(); // Refresh the courses list
    } catch (error) {
      console.error('Error with course:', error);
      toast({
        title: "Error",
        description: `Failed to ${editingCourseId ? 'update' : 'create'} course. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadBlogCover = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `blog-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('book-covers')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('book-covers')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading blog cover:', error);
      return null;
    }
  };

  const onSubmitBlog = async (data: BlogFormData) => {
    try {
      setLoading(true);
      
      // Upload cover image if provided
      let coverImageUrl = null;
      if (data.featuredImage) {
        coverImageUrl = await uploadBlogCover(data.featuredImage);
      }
      
      // Create slug from title
      const slug = data.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();

      const { error } = await supabase
        .from('blog_posts')
        .insert([{
          title: data.title,
          content: data.content,
          excerpt: data.metaDescription,
          author: data.author,
          category: data.category,
          slug: slug,
          cover_image_url: coverImageUrl,
          published: data.status === 'published'
        }]);

      if (error) throw error;

      toast({
        title: "Blog Post Published",
        description: "The blog post has been successfully published.",
      });
      
      blogForm.reset();
      fetchBlogPosts(); // Refresh the blog posts list
    } catch (error) {
      console.error('Error creating blog post:', error);
      toast({
        title: "Error",
        description: "Failed to publish blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteBlogPost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      toast({
        title: "Blog Post Deleted",
        description: "Blog post has been successfully deleted.",
      });
      
      fetchBlogPosts(); // Refresh the blog posts list
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your agricultural content and resources
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {user && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Signed in as</p>
                <p className="font-medium">{user.email}</p>
              </div>
            )}
            <Button 
              onClick={handleSignOut} 
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="library" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Library
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <PenTool className="h-4 w-4" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Subscribers
            </TabsTrigger>
          </TabsList>

          {/* Library Tab */}
          <TabsContent value="library">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Add New Book
                </CardTitle>
                <CardDescription>
                  Upload books and agricultural resources to the library
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...bookForm}>
                  <form onSubmit={bookForm.handleSubmit(onSubmitBook)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={bookForm.control}
                        name="title"
                        rules={{ required: "Title is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter book title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bookForm.control}
                        name="author"
                        rules={{ required: "Author is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Author</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter author name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bookForm.control}
                        name="category"
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter category" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bookForm.control}
                        name="isbn"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ISBN (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter ISBN" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bookForm.control}
                        name="publicationDate"
                        rules={{ required: "Publication date is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Publication Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bookForm.control}
                        name="whatsappLink"
                        rules={{ required: "WhatsApp link is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>WhatsApp Link</FormLabel>
                            <FormControl>
                              <Input placeholder="https://wa.me/1234567890?text=..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bookForm.control}
                        name="rating"
                        rules={{ required: "Rating is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Star Rating</FormLabel>
                            <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select rating" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">1 Star</SelectItem>
                                <SelectItem value="2">2 Stars</SelectItem>
                                <SelectItem value="3">3 Stars</SelectItem>
                                <SelectItem value="4">4 Stars</SelectItem>
                                <SelectItem value="5">5 Stars</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bookForm.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.01" 
                                min="0"
                                placeholder="Enter price" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={bookForm.control}
                      name="description"
                      rules={{ required: "Description is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter book description"
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <Label htmlFor="coverImage">Cover Image</Label>
                      <Input
                        id="coverImage"
                        type="file"
                        accept="image/*"
                        className="mt-2"
                        onChange={(e) => bookForm.setValue('coverImage', e.target.files?.[0])}
                      />
                    </div>

                    <Button type="submit" className="w-full md:w-auto" variant="default" disabled={loading}>
                      <Upload className="h-4 w-4 mr-2" />
                      {loading ? "Adding Book..." : "Add Book to Library"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Existing Books List */}
            <Card className="shadow-medium mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Manage Books
                </CardTitle>
                <CardDescription>
                  View and manage existing books in the library
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {books.map((book) => (
                    <Card key={book.id} className="relative">
                      <CardContent className="p-4">
                        {book.cover_image_url && (
                          <img 
                            src={book.cover_image_url} 
                            alt={book.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-32 object-cover rounded mb-3"
                          />
                        )}
                        <h3 className="font-semibold text-sm mb-1">{book.title}</h3>
                        <p className="text-xs text-muted-foreground mb-1">by {book.author}</p>
                        <p className="text-xs text-muted-foreground mb-2">{book.category}</p>
                        {book.rating && (
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < book.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => deleteBook(book.id, book.cover_image_url)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {books.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No books added yet. Add your first book above!
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Create New Course
                </CardTitle>
                <CardDescription>
                  Design and upload agricultural courses and training materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...courseForm}>
                  <form onSubmit={courseForm.handleSubmit(onSubmitCourse)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={courseForm.control}
                        name="title"
                        rules={{ required: "Title is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Course Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter course title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={courseForm.control}
                        name="instructor"
                        rules={{ required: "Instructor is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Instructor</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter instructor name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={courseForm.control}
                        name="durationDays"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (Days)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" placeholder="Enter number of days" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={courseForm.control}
                        name="durationHours"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (Hours)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" placeholder="Enter number of hours" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={courseForm.control}
                        name="level"
                        rules={{ required: "Level is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={courseForm.control}
                        name="category"
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter category" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={courseForm.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter price or leave empty for free" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={courseForm.control}
                        name="courseDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Course Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={courseForm.control}
                        name="classification"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Classification</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select classification" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="online">Online</SelectItem>
                                <SelectItem value="physical">Physical</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={courseForm.control}
                      name="description"
                      rules={{ required: "Description is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter course description"
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={courseForm.control}
                      name="prerequisites"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prerequisites</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter course prerequisites"
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={courseForm.control}
                      name="whatsappLink"
                      rules={{ required: "WhatsApp link is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>WhatsApp Enrollment Link</FormLabel>
                          <FormControl>
                            <Input placeholder="https://wa.me/1234567890?text=I want to enroll in..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <Label htmlFor="courseCoverImage">Course Cover Image</Label>
                      <Input
                        id="courseCoverImage"
                        type="file"
                        accept="image/*"
                        className="mt-2"
                        onChange={(e) => courseForm.setValue('coverImage', e.target.files?.[0])}
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button type="submit" className="w-full md:w-auto" variant="default" disabled={loading}>
                        <Upload className="h-4 w-4 mr-2" />
                        {loading ? (editingCourseId ? "Updating..." : "Creating...") : (editingCourseId ? "Update Course" : "Create Course")}
                      </Button>
                      {editingCourseId && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            courseForm.reset();
                            setEditingCourseId(null);
                          }}
                        >
                          Cancel Edit
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Existing Courses List */}
            <Card className="shadow-medium mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Manage Courses
                </CardTitle>
                <CardDescription>
                  View and manage existing courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map((course) => (
                    <Card key={course.id} className="relative">
                      <CardContent className="p-4">
                        {course.cover_image_url && (
                          <img 
                            src={course.cover_image_url} 
                            alt={course.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-32 object-cover rounded mb-3"
                          />
                        )}
                        <h3 className="font-semibold text-sm mb-1">{course.title}</h3>
                        <p className="text-xs text-muted-foreground mb-1">by {course.instructor}</p>
                        <p className="text-xs text-muted-foreground mb-1">{course.category}</p>
                        <p className="text-xs text-muted-foreground mb-2">{course.difficulty_level}</p>
                        {course.price && (
                          <p className="text-xs font-semibold text-green-600 mb-2">${course.price}</p>
                        )}
                        {course.duration_hours && (
                          <p className="text-xs text-muted-foreground mb-2">{course.duration_hours} hours</p>
                        )}
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => editCourse(course)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex-1"
                            onClick={() => deleteCourse(course.id, course.cover_image_url)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {courses.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No courses added yet. Add your first course above!
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenTool className="h-5 w-5 text-primary" />
                  Create Blog Post
                </CardTitle>
                <CardDescription>
                  Write and publish agricultural insights and news
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...blogForm}>
                  <form onSubmit={blogForm.handleSubmit(onSubmitBlog)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={blogForm.control}
                        name="title"
                        rules={{ required: "Title is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Blog Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter blog post title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={blogForm.control}
                        name="author"
                        rules={{ required: "Author is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Author</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter author name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={blogForm.control}
                        name="category"
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="news">Agricultural News</SelectItem>
                                <SelectItem value="tips">Farming Tips</SelectItem>
                                <SelectItem value="technology">Technology Updates</SelectItem>
                                <SelectItem value="sustainability">Sustainability</SelectItem>
                                <SelectItem value="market-insights">Market Insights</SelectItem>
                                <SelectItem value="research">Research & Studies</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={blogForm.control}
                        name="status"
                        rules={{ required: "Status is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={blogForm.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter tags separated by commas" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={blogForm.control}
                      name="metaDescription"
                      rules={{ required: "Meta description is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter SEO meta description (max 160 characters)"
                              className="min-h-[60px]"
                              maxLength={160}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={blogForm.control}
                      name="content"
                      rules={{ required: "Content is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blog Content</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter blog post content"
                              className="min-h-[200px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <Label htmlFor="featuredImage">Featured Image</Label>
                      <Input
                        id="featuredImage"
                        type="file"
                        accept="image/*"
                        className="mt-2"
                        onChange={(e) => blogForm.setValue('featuredImage', e.target.files?.[0])}
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button type="submit" variant="default">
                        <Upload className="h-4 w-4 mr-2" />
                        Publish Post
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          blogForm.setValue('status', 'draft');
                          blogForm.handleSubmit(onSubmitBlog)();
                        }}
                      >
                        Save as Draft
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Manage Posts Section */}
            <Card className="shadow-medium mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenTool className="h-5 w-5 text-primary" />
                  Manage Posts
                </CardTitle>
                <CardDescription>
                  View and manage your published blog posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogPosts.length > 0 ? (
                    blogPosts.map((post) => (
                      <Card key={post.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                <span>By {post.author}</span>
                                <span>•</span>
                                <span>{post.category}</span>
                                <span>•</span>
                                <span>{post.published ? 'Published' : 'Draft'}</span>
                              </div>
                              {post.excerpt && (
                                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                  {post.excerpt}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground">
                                Created: {new Date(post.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteBlogPost(post.id)}
                              className="ml-4"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No blog posts yet.</p>
                      <p className="text-sm text-muted-foreground">Create your first post above!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscribers Tab */}
          <TabsContent value="subscribers">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Newsletter Subscribers
                </CardTitle>
                <CardDescription>
                  Manage your newsletter subscribers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscribers.length > 0 ? (
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="p-4 text-left font-medium">Email</th>
                            <th className="p-4 text-left font-medium">Subscribed At</th>
                            <th className="p-4 text-left font-medium">Status</th>
                            <th className="p-4 text-right font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subscribers.map((subscriber) => (
                            <tr key={subscriber.id} className="border-b">
                              <td className="p-4">{subscriber.email}</td>
                              <td className="p-4">
                                {new Date(subscriber.subscribed_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </td>
                              <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  subscriber.is_active 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                                }`}>
                                  {subscriber.is_active ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteSubscriber(subscriber.id)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No subscribers yet.</p>
                      <p className="text-sm text-muted-foreground">Subscribers will appear here when they sign up!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}