import { useState, useEffect } from "react";
import { Search, Clock, DollarSign, Users, Star, ExternalLink, Calendar, MapPin } from "lucide-react";
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
import coursesBackground from "@/assets/courses-background.jpg";

const categories = ["All", "Technology", "Sustainability", "Soil Science", "Plant Health", "Business", "Organic"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching courses:', error);
          return;
        }

        setCourses(data || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses
    .filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header Section */}
      <section 
        className="relative bg-primary text-primary-foreground py-16 bg-cover bg-center"
        style={{ backgroundImage: `url(${coursesBackground})` }}
      >
        <div className="absolute inset-0 bg-primary/85" />
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">
              Professional Courses
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Advance your agricultural expertise with our comprehensive professional development programs
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-4 sm:py-8 bg-background/50 backdrop-blur-sm sticky top-16 z-40 border-b">
        <div className="container px-4">
          <div className="relative w-full max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="container px-4">
          {loading ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">Loading courses...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-xl text-muted-foreground">No courses available yet</p>
              <p className="text-sm text-muted-foreground">Courses will be added by the administrator</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:gap-8">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <div className="w-full h-64 md:h-full overflow-hidden bg-muted">
                        <img
                          src={course.cover_image_url || '/placeholder.svg'}
                          alt={course.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3 flex flex-col">
                      <CardHeader className="pb-3 sm:pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">{course.category}</Badge>
                            <Badge variant="outline">{course.difficulty_level}</Badge>
                            {course.classification && (
                              <Badge variant="default" className="capitalize">
                                {course.classification}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <CardTitle className="line-clamp-2 text-lg sm:text-xl leading-tight">
                          {course.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          by {course.instructor}
                        </p>
                      </CardHeader>
                      
                      <CardContent className="pb-3 sm:pb-4 flex-1">
                        <p className="text-sm text-foreground/80 line-clamp-3 mb-3 sm:mb-4">
                          {course.description}
                        </p>

                        {course.prerequisites && (
                          <div className="mb-3 sm:mb-4 p-3 bg-muted/50 rounded-md">
                            <p className="text-xs font-semibold text-muted-foreground mb-1">Prerequisites:</p>
                            <p className="text-sm text-foreground/80">
                              {course.prerequisites}
                            </p>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {course.duration_days || course.duration_hours ? (
                              <>
                                {course.duration_days && `${course.duration_days} day${course.duration_days !== 1 ? 's' : ''}`}
                                {course.duration_days && course.duration_hours && ', '}
                                {course.duration_hours && `${course.duration_hours} hour${course.duration_hours !== 1 ? 's' : ''}`}
                              </>
                            ) : 'Duration TBD'}
                          </div>
                          {course.course_date && (
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(course.course_date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </div>
                          )}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-0">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-0">
                          <div className="flex items-center">
                            <DollarSign className="h-5 w-5 text-accent" />
                            <span className="text-xl sm:text-2xl font-bold text-accent">
                              {course.price ? `$${course.price}` : 'Free'}
                            </span>
                          </div>
                          <Button className="w-full sm:w-auto" asChild>
                            <a 
                              href={course.whatsapp_link || "https://wa.me/?text=Hi, I'm interested in enrolling for a course."} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              Contact for Enrollment
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Courses;