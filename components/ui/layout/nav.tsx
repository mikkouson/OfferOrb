import { ModeToggle } from "../theme/theme-toggle";

const Nav = () => {
  return (
    <header className="flex h-16 items-center bg-accent-foreground/5">
      <div className="mx-auto flex w-full max-w-7xl justify-between">
        <h4>OfferOrb</h4>
        <div className="flex gap-4 items-center">
          <h4>AI-Powered Career Decision Assistant</h4>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Nav;
