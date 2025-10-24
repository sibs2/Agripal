import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import agripalLogo from "@/assets/agripal-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const { toast } = useToast();
  const { signIn, signOut, user } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SignInFormData>();

  // Handle already authenticated users
  useEffect(() => {
    if (user) {
      // Don't auto-redirect, let user choose what to do
      console.log('User already authenticated:', user.email);
    }
  }, [user, navigate]);

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message === "Invalid login credentials" 
            ? "Invalid email or password. Please check your credentials and try again."
            : error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sign In Successful",
          description: "Welcome back to AgriPal!",
        });
        navigate('/admin', { replace: true });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home Link */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary-foreground hover:text-accent-light transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="shadow-strong border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            {/* Logo */}
            <div className="mx-auto mb-4">
              <img 
                src={agripalLogo} 
                alt="AgriPal Logo" 
                className="h-16 w-auto mx-auto"
              />
            </div>
            <CardTitle className="text-2xl font-heading text-foreground">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to access your AgriPal account
            </CardDescription>
          </CardHeader>

          <CardContent>
            {user ? (
              // Already authenticated - show options
              <div className="space-y-4 text-center">
                <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-sm text-muted-foreground mb-2">Already signed in as:</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button 
                    onClick={() => navigate('/admin')} 
                    className="w-full"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Continue to Admin Dashboard
                  </Button>
                  
                  <Button 
                    onClick={async () => {
                      await signOut();
                      toast({
                        title: "Signed Out",
                        description: "You have been signed out successfully.",
                      });
                    }} 
                    variant="outline" 
                    className="w-full"
                  >
                    Sign Out & Login as Different User
                  </Button>
                </div>
              </div>
            ) : (
              // Not authenticated - show login form
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{ 
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email address"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Enter your email"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    rules={{ 
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              {...field} 
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-input" />
                      <span className="text-muted-foreground">Remember me</span>
                    </label>
                    <Link 
                      to="/forgot-password" 
                      className="text-primary hover:text-primary-light transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full" variant="default" disabled={isLoading}>
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <LogIn className="h-4 w-4 mr-2" />
                    )}
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </Form>
            )}

          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-primary-foreground/80">
          <p>Secure access to your agricultural resources and tools</p>
        </div>
      </div>
    </div>
  );
}