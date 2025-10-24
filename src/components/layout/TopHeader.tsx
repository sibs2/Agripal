import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Video } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TopHeader = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  if (!isHomePage) {
    return (
      <div className="w-full bg-muted/30 border-b py-2 text-sm">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Contact Info */}
          <div className="flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm font-bold">
            <a 
              href="mailto:info@agripal.co.zw" 
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" style={{color: '#e16600'}} />
              <span className="hidden sm:inline font-semibold">info@agripal.co.zw</span>
              <span className="sm:hidden font-semibold">Email</span>
            </a>
            <a 
              href="tel:+263771043062" 
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" style={{color: '#e16600'}} />
              <span className="hidden sm:inline font-semibold">+263 771 043 062</span>
              <span className="sm:hidden font-semibold">Call</span>
            </a>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 sm:h-8 sm:w-8 rounded-full text-white hover:opacity-80"
              style={{backgroundColor: '#e16600'}}
              asChild
            >
              <a 
                href="https://www.facebook.com/profile.php?id=100076165500607&mibextid=ZbWKwL" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 sm:h-8 sm:w-8 rounded-full text-white hover:opacity-80"
              style={{backgroundColor: '#e16600'}}
              asChild
            >
              <a 
                href="https://x.com/Agripalpvt?s=09" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 sm:h-8 sm:w-8 rounded-full text-white hover:opacity-80"
              style={{backgroundColor: '#e16600'}}
              asChild
            >
              <a 
                href="https://www.instagram.com/agripalpbc?igsh=MXRidnpuZm5neDRzbg==" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 sm:h-8 sm:w-8 rounded-full text-white hover:opacity-80"
              style={{backgroundColor: '#e16600'}}
              asChild
            >
              <a 
                href="https://www.tiktok.com/@agripal_apiaries?_t=ZM-8zwfDBtAwRP&_r=1" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <Video className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 sm:h-8 sm:w-8 rounded-full text-white hover:opacity-80"
              style={{backgroundColor: '#e16600'}}
              asChild
            >
              <a 
                href="https://www.linkedin.com/company/agripal-pbc/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 right-0 z-50 w-full py-1 sm:py-2 text-xs sm:text-sm bg-transparent">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-0">
        {/* Contact Info */}
        <div className="flex items-center space-x-3 sm:space-x-6 font-bold">
          <a 
            href="mailto:info@agripal.co.zw" 
            className="flex items-center space-x-2 text-white hover:text-white transition-colors"
          >
            <Mail className="h-4 w-4 sm:h-5 sm:w-5 drop-shadow-lg" style={{color: '#e16600'}} />
            <span className="hidden sm:inline font-bold text-white drop-shadow-lg">info@agripal.co.zw</span>
            <span className="sm:hidden font-bold text-white drop-shadow-lg">Email</span>
          </a>
          <a 
            href="tel:+263771043062" 
            className="flex items-center space-x-2 text-white hover:text-white transition-colors"
          >
            <Phone className="h-4 w-4 sm:h-5 sm:w-5 drop-shadow-lg" style={{color: '#e16600'}} />
            <span className="hidden sm:inline font-bold text-white drop-shadow-lg">+263 771 043 062</span>
            <span className="sm:hidden font-bold text-white drop-shadow-lg">Call</span>
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 sm:h-8 sm:w-8 rounded-full text-white hover:opacity-80"
            style={{backgroundColor: '#e16600'}}
            asChild
          >
            <a 
              href="https://www.facebook.com/profile.php?id=100076165500607&mibextid=ZbWKwL" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 sm:h-8 sm:w-8 rounded-full text-white hover:opacity-80"
            style={{backgroundColor: '#e16600'}}
            asChild
          >
            <a 
              href="https://x.com/Agripalpvt?s=09" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Twitter className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 sm:h-8 sm:w-8 rounded-full text-white hover:opacity-80"
            style={{backgroundColor: '#e16600'}}
            asChild
          >
            <a 
              href="https://www.instagram.com/agripalpbc?igsh=MXRidnpuZm5neDRzbg==" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 sm:h-8 sm:w-8 rounded-full text-white hover:opacity-80"
            style={{backgroundColor: '#e16600'}}
            asChild
          >
            <a 
              href="https://www.tiktok.com/@agripal_apiaries?_t=ZM-8zwfDBtAwRP&_r=1" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <Video className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 sm:h-8 sm:w-8 rounded-full text-white hover:opacity-80"
            style={{backgroundColor: '#e16600'}}
            asChild
          >
            <a 
              href="https://www.linkedin.com/company/agripal-pbc/" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;