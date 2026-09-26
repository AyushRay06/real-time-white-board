"use client"

import React from "react"
import { motion } from "framer-motion"
import { TestimonialsColumn, Testimonial } from "@/components/ui/testimonials-columns-1"

const testimonials: Testimonial[] = [
  {
    text: "We replaced our bloated Miro subscription last week. Being able to sketch microservices and immediately export Mermaid markdown straight into GitHub PRs made our entire backend team happy.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    name: "Marcus Vance",
    role: "Founding Engineer @ Pulse",
  },
  {
    text: "I use it daily for low-fidelity wireframing before touching Figma. The hotkeys feel so instinctive that I can map out user journeys in 30 seconds during live calls.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    name: "Elena Rostova",
    role: "Product Design Lead @ North",
  },
  {
    text: "Most collaborative canvas tools choke when you have 40+ microservice nodes and arrows. This stays silky smooth at 60fps even with multiple engineers editing simultaneously.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    name: "Tariq Mansoor",
    role: "Staff Cloud Architect @ StackOps",
  },
  {
    text: "The real-time sync is genuinely impressive. We ran a 35-person incident postmortem with everyone adding sticky notes, logs, and timelines all at once—zero lag or desync.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    name: "Sarah Chen",
    role: "Staff Engineer @ Hyperline",
  },
  {
    text: "Version history and cloud auto-save saved our RFC review when someone accidentally deleted a full VPC subnet container. One-click rollback and we were back in business.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    name: "Alex Rivera",
    role: "Tech Lead @ Lattice",
  },
  {
    text: "Mapping out relational database schemas and visualizing foreign key constraints directly on the whiteboard cut down our API onboarding time from days to hours.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    name: "Amina Diallo",
    role: "Senior Backend Dev @ FinScale",
  },
  {
    text: "Sprint retrospectives actually feel collaborative now. Engineers drop quick sticky notes, draw sequence traces, and connect blockers without fighting clumsy menus.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    name: "Chloe Nguyen",
    role: "Engineering Manager @ Velo",
  },
  {
    text: "The sequence flow simulation is brilliant for team RFC walkthroughs. Walking through request hops visually before writing code prevents countless production bugs.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    name: "David Park",
    role: "Principal Systems Architect",
  },
  {
    text: "Minimalist design done right. Zero distracting toolbars or AI clutter—just an infinite, tactile canvas that stays completely out of your way.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    name: "Priya Sharma",
    role: "Frontend Systems Engineer",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative w-full py-24 bg-transparent overflow-hidden scroll-mt-20">
      <div className="container z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[620px] mx-auto text-center"
        >
          <h2 className="font-zodiak text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Loved by modern teams
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed font-normal">
            How engineering, product, and design teams move from messy brainstorms to production architectures.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[680px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={20} />
        </div>
      </div>
    </section>
  )
}
