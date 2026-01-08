import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cpu, Mail, Lock, User } from "lucide-react";
import { signupUser } from "@/lib/api";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    // Mock signup flow
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-md mx-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-8 md:p-10">
          <Link to="/" className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full" />
              <Cpu className="w-10 h-10 text-primary relative z-10" />
            </div>
            <span className="text-2xl font-bold gradient-text">Swadhyay</span>
          </Link>

          <h2 className="text-2xl font-bold text-foreground mb-2">Create Account</h2>
          <p className="text-muted-foreground mb-6">Start your journey and access the simulator.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">Full name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><User /></span>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg bg-secondary border border-border h-12 pl-12 pr-3 text-white" placeholder="Your name" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">Email</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><Mail /></span>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg bg-secondary border border-border h-12 pl-12 pr-3 text-white" placeholder="you@example.com" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><Lock /></span>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full rounded-lg bg-secondary border border-border h-12 pl-12 pr-3 text-white" placeholder="••••••••" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">Confirm Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><Lock /></span>
                <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" className="w-full rounded-lg bg-secondary border border-border h-12 pl-12 pr-3 text-white" placeholder="••••••••" />
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary">Create account</Button>
          </form>

          <div className="mt-4 text-sm text-muted-foreground">Already have an account? <Link to="/auth" className="text-primary">Sign in</Link></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
