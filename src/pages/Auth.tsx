import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Cpu,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  Zap,
  Eye,
  EyeOff,
  User,
} from "lucide-react";

const Auth = () => {
  const isLogin = true;
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!identifier) return;
    if (!password) return;

    // Mock auth - navigate to hub (skip onboarding)
    navigate("/hub");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Circuit Background */}
      <div className="absolute inset-0 circuit-pattern opacity-10" />
      
      {/* Animated Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <motion.path
          d="M0 200 Q 400 100, 800 200 T 1600 200"
          stroke="hsl(168, 100%, 50%)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M0 400 Q 300 300, 600 400 T 1200 400 T 1800 400"
          stroke="hsl(120, 100%, 62%)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />
      </svg>

      {/* Glowing Orbs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl"
      />

      {/* Auth Card */}
      <div className="w-full">
        <div className="min-h-screen flex flex-row">
          {/* Left marketing pane - hidden on small screens */}
          <div className="hidden md:flex md:w-1/2 lg:w-[60%] flex-col justify-center bg-[#0b1618] overflow-hidden group/visual relative">
            <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDB1hvy7AVdzq7_MnXoMyWpeTs7lLjC4kaR87S1gJtdJ_SVszaAVqm5Ps-1k193Rlbe8XEATE8WH6vbRdvBNz7X6FuAUPpSWhcXgTKdVPvDPLoviuMgWkUbqwB7RfE2_3O9DlSYDjskUiw4jacYJDiyTO8GJQzm_teHf-1XQKdqhQ87JOJKypljpu0o-woa4E5kdVsWT0VP8-MklIy54cvJZAVrnl2U-NKPJ44iLjsxrjCBv_Uwqr3lnNB1AOzbYX6XUYZ2bUBR8wo')"}} />
            <div className="absolute inset-0 opacity-20" style={{backgroundImage: "radial-gradient(#0ddff2 1px, transparent 1px)", backgroundSize: "30px 30px"}} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102123] via-[#102123]/80 to-transparent" />
            <div className="relative z-10 p-12 lg:p-16 flex flex-col gap-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#224649]/50 border border-primary/30 text-primary w-fit backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-xs font-mono font-bold tracking-wider uppercase">System Online v2.4</span>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-[-0.02em] text-white">Learn microcontrollers<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">the way engineers do.</span></h1>
                <h2 className="text-lg text-text-muted font-medium max-w-lg leading-relaxed">Build circuits. Write code. Simulate. Level up. Master embedded systems through gamified challenges.</h2>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-[#102123] bg-[#183234] flex items-center justify-center overflow-hidden">
                    <User className="text-text-muted" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#102123] bg-[#183234] flex items-center justify-center overflow-hidden">
                    <Cpu className="text-text-muted" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#102123] bg-[#183234] flex items-center justify-center overflow-hidden">
                    <Mail className="text-text-muted" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">Join 12,000+ Makers</span>
                  <span className="text-xs text-primary font-mono">Current Challenge: Level 0</span>
                </div>
              </div>
            </div>
            {/* Floating electronics components */}
            <motion.div
              className="absolute left-8 top-12 w-20 h-8"
              animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Resistor (realistic bands) */}
              <svg viewBox="0 0 100 30" className="w-full h-full opacity-95">
                <line x1="0" y1="15" x2="18" y2="15" stroke="#6eead6" strokeWidth="3" strokeLinecap="round" />
                <rect x="18" y="6" width="64" height="18" rx="4" fill="#e7b07b" stroke="#0b1618" strokeWidth="1" />
                <rect x="30" y="6" width="6" height="18" fill="#1f6f64" />
                <rect x="40" y="6" width="6" height="18" fill="#ffffff" />
                <rect x="50" y="6" width="6" height="18" fill="#1f6f64" />
                <line x1="82" y1="15" x2="100" y2="15" stroke="#6eead6" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute right-12 top-20 w-16 h-16"
              animate={{ y: [0, -10, 0], rotate: [-6, 6, -6] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Electrolytic capacitor */}
              <svg viewBox="0 0 64 64" className="w-full h-full opacity-95">
                <rect x="20" y="12" width="24" height="36" rx="6" fill="#0b2a2a" stroke="#0ddff2" strokeWidth="2" />
                <rect x="28" y="6" width="8" height="6" fill="#0ddff2" />
                <line x1="32" y1="48" x2="32" y2="60" stroke="#6eead6" strokeWidth="3" strokeLinecap="round" />
                <line x1="26" y1="48" x2="26" y2="60" stroke="#6eead6" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute left-20 bottom-24 w-20 h-12 hidden lg:block"
              animate={{ y: [0, -8, 0], rotate: [0, -6, 0] }}
              transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Microcontroller / IC (DIP-like) */}
              <svg viewBox="0 0 120 60" className="w-full h-full opacity-95">
                <rect x="10" y="10" width="100" height="40" rx="4" fill="#081818" stroke="#0ddff2" strokeWidth="2" />
                {/* pins top */}
                {Array.from({ length: 6 }).map((_, i) => (
                  // placeholder JSX not allowed in SVG; render static pins instead
                  null
                ))}
                <rect x="6" y="6" width="6" height="6" rx="1" fill="#0ddff2" />
                <rect x="18" y="6" width="6" height="6" rx="1" fill="#0ddff2" />
                <rect x="30" y="6" width="6" height="6" rx="1" fill="#0ddff2" />
                <rect x="84" y="6" width="6" height="6" rx="1" fill="#0ddff2" />
                <rect x="96" y="6" width="6" height="6" rx="1" fill="#0ddff2" />
                <rect x="108" y="6" width="6" height="6" rx="1" fill="#0ddff2" />
                {/* bottom pins */}
                <rect x="6" y="48" width="6" height="6" rx="1" fill="#0ddff2" />
                <rect x="18" y="48" width="6" height="6" rx="1" fill="#0ddff2" />
                <rect x="30" y="48" width="6" height="6" rx="1" fill="#0ddff2" />
                <rect x="84" y="48" width="6" height="6" rx="1" fill="#0ddff2" />
                <rect x="96" y="48" width="6" height="6" rx="1" fill="#0ddff2" />
                <rect x="108" y="48" width="6" height="6" rx="1" fill="#0ddff2" />
              </svg>
            </motion.div>
          </div>

          {/* Right auth pane */}
          <div className="w-full md:w-1/2 lg:w-[40%] bg-background-dark flex flex-col relative z-20 shadow-2xl">
            <div className="md:hidden absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0b1618] to-transparent -z-10" />
            <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 overflow-y-auto">
              <div className="w-full max-w-md mx-auto flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <div className="size-8 text-primary">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"/></svg>
                  </div>
                  <h2 className="text-white text-2xl font-bold tracking-tight">Swadhyay</h2>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{isLogin ? 'Welcome Back' : 'Initialize Session'}</h3>
                  <p className="text-text-muted text-sm">{isLogin ? 'Continue your learning journey' : 'Enter your details to create an account'}</p>
                </div>

                {/* Single Login tab (signup removed) */}
                <div className="w-full">
                  <div className="flex border-b border-[#316368] gap-8">
                    <div className={`group flex flex-col items-center justify-center border-b-[3px] border-primary pb-3 px-2 outline-none rounded-t`}>
                      <span className={`text-white text-sm font-bold`}>Login</span>
                    </div>
                  </div>
                </div>

                {/* Form (login only) */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-white text-sm font-medium" htmlFor="identifier">Email Address</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"><Mail /></span>
                      <input
                        id="identifier"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="engineer@example.com"
                        type="email"
                        className="w-full rounded-lg bg-[#183234] border border-[#316368] placeholder:text-text-muted text-white h-12 pl-12 pr-4 focus:outline-none focus:border-primary"
                        style={{ WebkitBoxShadow: '0 0 0 1000px #183234 inset', WebkitTextFillColor: '#fff' }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-white text-sm font-medium" htmlFor="password">Password</label>
                      <a className="text-xs text-primary hover:text-white transition-colors" href="#">Forgot Password?</a>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"><Lock /></span>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-lg bg-[#183234] border border-[#316368] placeholder:text-text-muted text-white h-12 pl-12 pr-12 focus:outline-none focus:border-primary"
                        style={{ WebkitBoxShadow: '0 0 0 1000px #183234 inset', WebkitTextFillColor: '#fff' }}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
                        {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="mt-2 flex w-full items-center justify-center rounded-lg bg-primary h-12 px-4 text-[#102123] text-sm font-bold tracking-[0.015em] hover:bg-[#6ef0fa] hover:shadow-[0_0_20px_rgba(13,223,242,0.4)] active:scale-[0.98] transition-all duration-200">
                    Login to Console
                  </Button>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-[#316368]"></div>
                    <span className="flex-shrink-0 mx-4 text-text-muted text-xs uppercase tracking-wider">Or connect with</span>
                    <div className="flex-grow border-t border-[#316368]"></div>
                  </div>

                  <button type="button" className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#316368] bg-[#183234] h-12 px-4 text-white text-sm font-medium hover:bg-[#224649] transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
                    Continue with Google
                  </button>

                  <div className="text-center mt-2 text-text-muted text-xs">
                    Don't have an account? <Link to="/signup" className="text-primary hover:underline font-medium">Create one.</Link>
                  </div>
                </form>

                <div className="text-center mt-auto">
                  <div className="mt-6 flex justify-center gap-6 text-xs text-[#5a7f84]">
                    <a className="hover:text-text-muted" href="#">Privacy Policy</a>
                    <a className="hover:text-text-muted" href="#">Terms of Service</a>
                    <a className="hover:text-text-muted" href="#">Help</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
