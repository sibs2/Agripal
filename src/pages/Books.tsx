import { useState, useEffect } from "react";
import { Search, Filter, Star, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import libraryBackground from "@/assets/library-background.jpg";

const categories = ["All", "Agriculture", "Sustainability", "Crop Science", "Soil Science", "Technology", "Organic", "Water Management"];

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data, error } = await supabase
          .from('books')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching books:', error);
          return;
        }

        setBooks(data || []);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books
    .filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(book => selectedCategory === "All" || book.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "author") return a.author.localeCompare(b.author);
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header Section */}
      <section 
        className="relative bg-primary text-primary-foreground py-16 bg-cover"
        style={{ backgroundImage: `url(${libraryBackground})`, backgroundPosition: 'center 35%' }}
      >
        <div className="absolute inset-0 bg-primary/85" />
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">
              Library
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Discover a comprehensive collection of agricultural knowledge, research, and best practices
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
                placeholder="Search books or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
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
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-12">
        <div className="container px-4">
          {loading ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">Loading books...</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-xl text-muted-foreground">No books available yet</p>
              <p className="text-sm text-muted-foreground">Books will be added by the administrator</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                      <img
                        src={book.cover_image_url || '/placeholder.svg'}
                        alt={book.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary">{book.category}</Badge>
                      <div className="flex items-center gap-3">
                        {book.price && (
                          <span className="text-lg font-bold text-primary">
                            ${book.price}
                          </span>
                        )}
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-accent text-accent" />
                          <span className="text-sm font-medium">{book.rating}</span>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2 text-lg leading-tight">
                      {book.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      by {book.author}
                    </p>
                    <p className="text-sm text-foreground/80 line-clamp-3">
                      {book.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button className="w-full group/btn" asChild>
                      <a href={book.whatsapp_link} target="_blank" rel="noopener noreferrer">
                        Buy Book
                        <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Books;