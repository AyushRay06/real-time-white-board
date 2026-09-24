"use client"

import React from "react"
import { motion } from "framer-motion"
import { TestimonialsColumn, Testimonial } from "@/components/ui/testimonials-columns-1"

const testimonials: Testimonial[] = [
  {
    text: "Planning Portal replaced three different diagramming tools for us. Our distributed team maps out Kubernetes microservices with live multi-player cursors and zero latency.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    name: "Briana Patton",
    role: "VP of Engineering, FinScale",
  },
  {
    text: "The dynamic connecting arrows and infinite canvas make system architecture reviews a breeze. Engineers love sketching out distributed schemas on the fly.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    name: "Bilal Ahmed",
    role: "Staff Systems Architect, CloudNative",
  },
  {
    text: "Running sprint retrospectives on color-coded sticky notes has completely energized our team standups. The live presence indicators make remote feel in-person.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    name: "Saman Malik",
    role: "Head of Product, Horizon",
  },
  {
    text: "The keyboard shortcuts, shape transforms, and freehand drawing are so snappy. It's the only whiteboard tool that doesn't lag when dozens of team members edit at once.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    name: "Omar Raza",
    role: "Founding Engineer, ShipFast",
  },
  {
    text: "Our sprint planning sessions dropped from 2 hours to 45 minutes. The team drops user stories directly onto the canvas and links them with dependencies visually.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    name: "Zainab Hussain",
    role: "Lead Agile Coach, SprintWorks",
  },
  {
    text: "The canvas feels alive. Being able to sketch wireframes, attach sticky notes, and connect workflows seamlessly in real-time has transformed our design sprints.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    name: "Aliza Khan",
    role: "Senior Product Designer, CraftUI",
  },
  {
    text: "Instant cloud sync is bulletproof. We never worry about lost work or branch conflicts during cross-functional roadmap planning sessions.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    name: "Farhan Siddiqui",
    role: "CTO, ScaleOps",
  },
  {
    text: "The organization workspaces make managing multi-project boards effortless. Permissions and invites are clean, fast, and simple.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    name: "Sana Sheikh",
    role: "Technical Program Manager, DevMatrix",
  },
  {
    text: "Sub-40ms sync latency with live cursor tracking is unmatched. It feels as responsive and fluid as an offline native desktop app.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    name: "Hassan Ali",
    role: "Principal Frontend Engineer, NextVibe",
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
            See how engineering, product, and design teams move from brainstorms to production architectures on Planning Portal.
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
