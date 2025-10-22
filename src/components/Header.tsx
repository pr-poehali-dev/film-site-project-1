import Icon from "@/components/ui/icon";

const Header = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/90">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Film" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold text-foreground">КиноМир</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              О нас
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Новинки
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Топ 100
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Icon name="Search" size={20} className="text-foreground" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Icon name="User" size={20} className="text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
