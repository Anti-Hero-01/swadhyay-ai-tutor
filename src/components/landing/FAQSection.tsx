import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What makes Swadhyay different?",
    answer: "Swadhyay focuses on mastery — guided modules, live simulations, and an AI tutor that provides contextual, code-aware feedback so you learn by doing, not by memorizing.",
  },
  {
    question: "Is this beginner friendly?",
    answer: "Yes. Onboarding places you at the right level, and each module scaffolds concepts with videos, articles, simulations, and quizzes so beginners progress confidently.",
  },
  {
    question: "How does the AI tutor help?",
    answer: "The AI tutor analyzes your code and simulation results, offers hints, explains mistakes, and suggests next steps — all tailored to your current module and progress.",
  },
  {
    question: "Is it free?",
    answer: "Swadhyay offers a generous free tier with core modules and simulations. Premium plans unlock advanced modules, assessments, and priority AI guidance.",
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
