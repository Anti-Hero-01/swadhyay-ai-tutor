import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <motion.nav
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background/70 border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <Logo size="md" />
          <span className="text-lg font-semibold tracking-tight">Swadhyay</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/modules">
            <Button variant="ghost" size="sm">Explore</Button>
          </Link>

          <Link to="/auth">
            <Button variant="hero" size="sm">Start Learning</Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
