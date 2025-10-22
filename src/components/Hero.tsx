import { Button } from "@/components/ui/button";

interface HeroProps {
  activeSection: "movies" | "series" | "cartoons";
  setActiveSection: (section: "movies" | "series" | "cartoons") => void;
}

const Hero = ({ activeSection, setActiveSection }: HeroProps) => {
  const sections = [
    { id: "movies" as const, label: "Фильмы", image: "https://cdn.poehali.dev/projects/5d2edc96-5904-4055-b300-86b6caa1dcaa/files/a3635d72-91ce-43d5-8700-00719b28e110.jpg" },
    { id: "series" as const, label: "Сериалы", image: "https://cdn.poehali.dev/projects/5d2edc96-5904-4055-b300-86b6caa1dcaa/files/14345e6b-8743-43de-9676-d3870fa5fe49.jpg" },
    { id: "cartoons" as const, label: "Мультфильмы", image: "https://cdn.poehali.dev/projects/5d2edc96-5904-4055-b300-86b6caa1dcaa/files/d32e3a6b-3d59-49b0-b2d4-f5168a14c087.jpg" }
  ];

  const activeImage = sections.find(s => s.id === activeSection)?.image;

  return (
    <div className="relative h-[400px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${activeImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 max-w-2xl">
          Откройте мир кино вместе с нами
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl">
          Тысячи фильмов, сериалов и мультфильмов в удобном каталоге
        </p>
        
        <div className="flex flex-wrap gap-3">
          {sections.map((section) => (
            <Button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              variant={activeSection === section.id ? "default" : "secondary"}
              size="lg"
              className="text-base"
            >
              {section.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
