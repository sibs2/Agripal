import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Video } from "lucide-react";
import agripalLogo from "@/assets/agripal-logo.png";

const Footer = () => {
  return (
    <footer id="footer" className="bg-primary text-primary-foreground">
      <div className="container px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={agripalLogo} 
                alt="AgriPal Logo" 
                className="h-12 sm:h-16 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-primary-foreground/80">
              Leading agricultural innovation through sustainable practices, cutting-edge technology, 
              and expert knowledge sharing for a better tomorrow.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.facebook.com/profile.php?id=100076165500607&mibextid=ZbWKwL" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 hover:bg-white hover:text-primary transition-all duration-300"
                style={{ borderColor: '#e16600', color: '#e16600' }}
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a 
                href="https://x.com/Agripalpvt?s=09" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 hover:bg-white hover:text-primary transition-all duration-300"
                style={{ borderColor: '#e16600', color: '#e16600' }}
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a 
                href="https://www.instagram.com/agripalpbc?igsh=MXRidnpuZm5neDRzbg==" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 hover:bg-white hover:text-primary transition-all duration-300"
                style={{ borderColor: '#e16600', color: '#e16600' }}
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@agripal_apiaries?_t=ZM-8zwfDBtAwRP&_r=1" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 hover:bg-white hover:text-primary transition-all duration-300"
                style={{ borderColor: '#e16600', color: '#e16600' }}
                aria-label="TikTok"
              >
                <Video className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/agripal-pbc/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 hover:bg-white hover:text-primary transition-all duration-300"
                style={{ borderColor: '#e16600', color: '#e16600' }}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Resources</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link to="/books" className="text-sm hover:text-accent transition-colors">
                  Books Library
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-sm hover:text-accent transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1">
            {/* Contact Details */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-sm sm:text-base font-semibold text-white border-b border-white/30 pb-2">Get In Touch</h4>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-primary-foreground">Address</p>
                    <p className="text-xs sm:text-sm text-primary-foreground/80">
                      Wessex Road<br />
                      Malbereign, Harare.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-primary-foreground">Phone</p>
                    <a href="tel:+263771043062" className="text-xs sm:text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                      +263 771 043 062
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-primary-foreground">Email & Website</p>
                    <div className="space-y-1">
                      <a href="mailto:info@agripal.co.zw" className="text-xs sm:text-sm text-primary-foreground/80 hover:text-accent transition-colors block">
                        info@agripal.co.zw
                      </a>
                      <a href="http://www.agripal.co.zw" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-primary-foreground/80 hover:text-accent transition-colors block">
                        www.agripal.co.zw
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-primary-foreground/60">
              © 2024 AgriPal. All rights reserved<Link to="/admin" className="hover:text-accent">.</Link>
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;