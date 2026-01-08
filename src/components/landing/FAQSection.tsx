import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What microcontrollers are covered?",
    answer: "Swadhyay currently covers ATmega328p (Arduino), 8051, 8085, and PIC18F. Each comes with comprehensive modules covering everything from basic I/O to advanced communication protocols.",
  },
  {
    question: "Do I need any hardware to get started?",
    answer: "No hardware required! All simulations run in your browser using Wokwi's powerful embedded simulator. You can build circuits, write code, and see real-time results without purchasing any physical components.",
  },
  {
    question: "How does the gamification system work?",
    answer: "You earn XP by completing videos, articles, simulations, and quizzes. Maintain daily streaks for bonus points, compete on leaderboards, and unlock new modules as you progress. The more attempts you save on quizzes, the more XP you earn!",
  },
  {
    question: "What if I fail a quiz?",
    answer: "You get 3 attempts per quiz with 24 hours between each. First-attempt passes earn maximum XP, while subsequent attempts earn progressively less. If you fail all 3, the quiz locks for 24 hours to encourage proper review.",
  },
  {
    question: "Can I skip to advanced topics?",
    answer: "Yes! During onboarding, you'll take diagnostic tests that can unlock advanced modules directly. However, prerequisites must be completed to ensure you have the foundational knowledge needed for success.",
  },
  {
    question: "Is there an AI assistant available?",
    answer: "Absolutely! Our context-aware AI chatbot is available on every page to help with platform navigation, explain concepts, and provide learning guidance. It understands your current progress and adapts its responses accordingly.",
  },
];

const FAQSection = () => {
  return (
    <section className="relative py-32">
      <div className="max-w-3xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Frequently Asked</span>{" "}
            <span className="text-foreground">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about getting started with Swadhyay.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl border-0 px-6 data-[state=open]:glow-cyan transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
