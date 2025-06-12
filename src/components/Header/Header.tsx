import { useLocation } from "react-router";
import AfterMenu from "./AfterMenu";
import Logo from "./Logo";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const location = useLocation();
  useEffect(() => {
    scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <>
      <header className="flex justify-between items-center px-4 bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark border-y-1 border-text-light dark:border-text-dark">
        <div className="flex gap-12 items-center justify-start w-10/12">
          <Logo />
          <Menu />
          <MobileMenu isOpened={mobileMenu} toggleMenu={setMobileMenu} />
        </div>
        <AfterMenu toggleMenu={setMobileMenu} />
      </header>
    </>
  );
};

export default Header;
