import { BookOpen, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const links = {
    product: ["Features", "Pricing", "Courses", "Testimonials"],
    company: ["About", "Blog", "Careers", "Contact"],
    resources: ["Help Center", "Community", "Terms", "Privacy"],
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                EduPlatform
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Empowering learners worldwide with accessible, high-quality
              education for everyone.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 capitalize">{category}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 EduPlatform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
