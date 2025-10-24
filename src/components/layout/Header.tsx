import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import agripalLogo from "@/assets/agripal-logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.8; // 80vh
      setIsScrolled(scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const isActive = (path: string) => location.pathname === path;

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFooter = () => {
    const footerSection = document.getElementById('footer');
    if (footerSection) {
      footerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHero = () => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      scrollToAbout();
    }
  };

  const handleServicesClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      scrollToServices();
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      scrollToFooter();
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      scrollToHero();
    }
  };

  const navItems = [
    { title: "Home", href: "/", onClick: handleHomeClick },
    { title: "Services", href: "/", onClick: handleServicesClick },
    { title: "About", href: "/", onClick: handleAboutClick },
  ];

  const dropdownItems = [
    { title: "Books Library", href: "/books", description: "Explore our digital agricultural library" },
    { title: "Courses", href: "/courses", description: "Professional development programs" },
    { title: "Blog", href: "/blog", description: "Latest insights and agricultural news" },
  ];

  return (
    <header className={`z-40 w-full transition-all duration-300 bg-white ${
      isHomePage 
        ? (isScrolled 
            ? 'sticky top-0 border-b' 
            : 'fixed top-[52px] border-b')
        : 'sticky top-0 border-b'
    }`}>
      <div className="container flex h-24 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src={agripalLogo} 
            alt="AgriPal Logo" 
            className="h-20 w-auto transition-transform hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center space-x-6">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link
                  to={item.href}
                  onClick={item.onClick}
                  className={`px-3 py-2 text-sm font-bold transition-colors hover:text-orange-500 ${
                    isActive(item.href) ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {item.title}
                </Link>
              </NavigationMenuItem>
            ))}
            
            {/* Resources Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:text-orange-500 transition-colors data-[active]:text-primary data-[state=open]:text-primary font-bold">
                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4">
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">{item.title}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <Button variant="outline" size="sm" asChild className="hover:text-orange-500 hover:border-orange-500">
            <Link to="/courses">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>
                <img src={agripalLogo} alt="AgriPal" className="h-16 w-auto" />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-6">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  onClick={(e) => {
                    setIsOpen(false);
                    if (item.onClick) item.onClick(e);
                  }}
                  className={`px-3 py-2 text-sm font-bold transition-colors hover:text-primary ${
                    isActive(item.href) ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
              <div className="border-t pt-4">
                <p className="mb-2 text-sm font-medium text-muted-foreground">Resources</p>
                {dropdownItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-sm text-foreground/80 hover:text-primary"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <Button className="mt-4" asChild>
                <Link to="/courses">Get Started</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;