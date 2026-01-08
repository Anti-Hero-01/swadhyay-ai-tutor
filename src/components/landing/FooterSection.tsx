import { motion } from "framer-motion";
import { Cpu, Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="relative py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
              <Cpu className="w-8 h-8 text-primary relative z-10" />
            </div>
            <span className="text-xl font-bold">
              <span className="gradient-text">Swadhyay</span>
            </span>
          </motion.div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/hub" className="hover:text-primary transition-colors">Learn</Link>
            <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {[Github, Twitter, Linkedin].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© 2024 Swadhyay. Built for learners, by learners.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
