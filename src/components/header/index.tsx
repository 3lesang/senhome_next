import HeaderLogo from "./logo";
import HeaderNavigationMenu from "./navigation-menu";
import HeaderRight from "./right";
import HeaderSearchBar from "./search-bar";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <HeaderLogo />
          <HeaderNavigationMenu />
          <HeaderSearchBar />
          <HeaderRight />
        </div>
      </div>
    </header>
  );
}

export default Header;
