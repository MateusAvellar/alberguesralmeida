import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoImage from "@/assets/logo-bed.png";

interface NavigationProps {
  language: string;
  setLanguage: (lang: string) => void;
  translations: any;
}

export const Navigation = ({ language, setLanguage, translations }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/about", label: translations.nav.about },
    { href: "/rules", label: translations.nav.rules },
    { href: "/spaces", label: translations.nav.spaces },
    { href: "/login", label: translations.nav.login },
    { href: "/benefits", label: translations.nav.benefits },
    { href: "/partners", label: translations.nav.partners },
    { href: "/rooms", label: translations.nav.rooms },
  ];

  const languages = [
    { code: "pt", label: "🇧🇷 PT", flag: "🇧🇷" },
    { code: "en", label: "🇺🇸 EN", flag: "🇺🇸" },
    { code: "es", label: "🇪🇸 ES", flag: "🇪🇸" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logoImage} alt="Albergue Almeida" className="h-12 w-12 transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary-foreground">Albergue</span>
              <span className="text-xl font-semibold text-primary-foreground/90">Almeida</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-primary-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-primary">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={language === lang.code ? "bg-accent" : ""}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />

            <Button asChild variant="default" className="bg-primary hover:bg-primary/90 shadow-md">
              <Link to="/rooms">{translations.nav.reserve}</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-primary-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-secondary/98 backdrop-blur-sm border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-primary-foreground hover:text-primary transition-colors py-2 font-medium"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    language === lang.code
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/20"
                  }`}
                >
                  {lang.flag}
                </button>
              ))}
              <ThemeToggle />
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90 mt-2">
              <Link to="/rooms" onClick={() => setMobileMenuOpen(false)}>
                {translations.nav.reserve}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
