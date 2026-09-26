"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { SignInButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { ArrowRight, Move } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import localFont from "next/font/local"
import { CanvasSimulator } from "@/components/landing/canvas-simulator"
import { GlobalScrollStroke } from "@/components/ui/svg-follow-scroll"
import { ExcalidrawStoryline } from "@/components/landing/excalidraw-storyline"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { CanvasFooter } from "@/components/landing/canvas-footer"

const comico = localFont({
  src: "../public/FontshareKit-2609002790/Comico/Fonts/WEB/fonts/Comico-Regular.woff2",
  variable: "--font-comico",
  display: "swap",
})

const zodiak = localFont({
  src: "../public/FontshareKit-2609002790/Zodiak/Fonts/WEB/fonts/Zodiak-Regular.woff2",
  variable: "--font-zodiak",
  display: "swap",
})

export function LandingPage() {
  return (
    <div className={`${comico.variable} ${zodiak.variable} relative flex flex-col min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-500 selection:text-white antialiased overflow-x-hidden`}>
      {/* Navbar */}
      <header className="sticky top-0 z-50 px-4 sm:px-8 h-20 flex items-center justify-between border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-all">
        <Link className="flex items-center gap-3 transition-opacity hover:opacity-90" href="/">
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center">
            <Image src="/logo.svg" alt="Planning Portal logo" width={28} height={28} className="brightness-0 invert" />
          </div>
          <span className="font-comico text-xl font-bold tracking-tight text-slate-900">
            Planning Portal
          </span>
        </Link>

        {/* Navigation Links (Excalidraw style) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#demo" className="hover:text-indigo-600 transition-colors">
            Demo
          </a>
          <a href="#create" className="hover:text-indigo-600 transition-colors">
            Create
          </a>
          <a href="#collaborate" className="hover:text-indigo-600 transition-colors">
            Collaborate
          </a>
          <a href="#usecases" className="hover:text-indigo-600 transition-colors">
            Use Cases
          </a>
          <a href="#features" className="hover:text-indigo-600 transition-colors">
            Features
          </a>
          <a href="#testimonials" className="hover:text-indigo-600 transition-colors">
            Testimonials
          </a>
          <a href="#faq" className="hover:text-indigo-600 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <SignInButton mode="modal">
            <Button
              variant="ghost"
              className="text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-semibold cursor-pointer text-sm"
            >
              Sign In
            </Button>
          </SignInButton>

          <SignInButton mode="modal">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full px-5 shadow-lg shadow-indigo-600/25 transition-all hover:scale-105 border-none cursor-pointer text-sm">
              Start Free
            </Button>
          </SignInButton>
        </div>
      </header>

      <main className="flex-1 relative">
        <GlobalScrollStroke />
        {/* HERO SECTION */}
        <section className="relative w-full pt-16 sm:pt-24 pb-16 sm:pb-24 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-comico text-3xl sm:text-5xl md:text-5xl font-bold tracking-tight max-w-3xl text-slate-900 leading-[1.14] mb-5"
            >
              Plan,Draw and collaborate{" "}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                on an infinite canvas
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-xl text-sm sm:text-base md:text-lg text-slate-600 mb-8 leading-relaxed font-normal"
            >
              A shared visual workspace for teams. Sketch system architectures, brainstorm on sticky notes, and build plans together in real time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12"
            >
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-base font-semibold shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 border-none cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Start Whiteboarding Free</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </SignInButton>

              <a
                href="#demo"
                className="w-full sm:w-auto h-14 px-8 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-base font-semibold transition-all shadow-sm hover:border-slate-400 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Try Live Demo</span>
                <Move className="w-4 h-4 text-indigo-600" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* INTERACTIVE CANVAS SIMULATOR */}
        <section id="demo" className="w-full px-4 sm:px-6 pb-24 scroll-mt-24">
          <CanvasSimulator />
        </section>

        {/* EXCALIDRAW-INSPIRED PRODUCT STORYLINE & CANVASES */}
        <ExcalidrawStoryline />

        {/* TESTIMONIALS SECTION */}
        <TestimonialsSection />

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section id="faq" className="w-full py-24 bg-transparent scroll-mt-20 relative">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="font-zodiak text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 text-base sm:text-lg">
                Common questions about Planning Portal and how it works.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem
                value="item-1"
                className="border border-slate-200/90 rounded-2xl px-6 bg-white shadow-xs overflow-hidden transition-colors data-[state=open]:border-indigo-200 data-[state=open]:bg-indigo-50/20"
              >
                <AccordionTrigger className="font-comico text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-600 hover:no-underline transition-colors py-5 text-left">
                  Can multiple team members collaborate on the same board in real time?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm sm:text-base leading-relaxed pb-5">
                  Yes. Planning Portal is built with live multiplayer synchronization. Every team member sees live cursors moving across the canvas, and all strokes, sticky notes, and shapes update with sub-second responsiveness.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="border border-slate-200/90 rounded-2xl px-6 bg-white shadow-xs overflow-hidden transition-colors data-[state=open]:border-indigo-200 data-[state=open]:bg-indigo-50/20"
              >
                <AccordionTrigger className="font-comico text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-600 hover:no-underline transition-colors py-5 text-left">
                  How do I manage my canvases and boards?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm sm:text-base leading-relaxed pb-5">
                  You have your own clean personal dashboard where all your boards are organized in one place. You can search, star your favourite canvases, and create new boards in one click.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="border border-slate-200/90 rounded-2xl px-6 bg-white shadow-xs overflow-hidden transition-colors data-[state=open]:border-indigo-200 data-[state=open]:bg-indigo-50/20"
              >
                <AccordionTrigger className="font-comico text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-600 hover:no-underline transition-colors py-5 text-left">
                  What drawing and planning tools are included on the canvas?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm sm:text-base leading-relaxed pb-5">
                  The canvas features a freehand drawing pen with adjustable stroke colors, color-coded sticky notes, geometric shapes (rectangles and ellipses), text elements, and multi-selection transform tools for moving and resizing items.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="border border-slate-200/90 rounded-2xl px-6 bg-white shadow-xs overflow-hidden transition-colors data-[state=open]:border-indigo-200 data-[state=open]:bg-indigo-50/20"
              >
                <AccordionTrigger className="font-comico text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-600 hover:no-underline transition-colors py-5 text-left">
                  Is my whiteboard saved automatically?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm sm:text-base leading-relaxed pb-5">
                  Yes. All board actions, drawings, notes, and layouts are continuously synced and persisted in the cloud in real time. You never need to click a manual save button.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="border border-slate-200/90 rounded-2xl px-6 bg-white shadow-xs overflow-hidden transition-colors data-[state=open]:border-indigo-200 data-[state=open]:bg-indigo-50/20"
              >
                <AccordionTrigger className="font-comico text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-600 hover:no-underline transition-colors py-5 text-left">
                  How do I collaborate with others on a board?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm sm:text-base leading-relaxed pb-5">
                  Simply share the link to any board. When others open the canvas, everyone can brainstorm, draw, plan architectures, and collaborate in real-time with live cursors.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-6"
                className="border border-slate-200/90 rounded-2xl px-6 bg-white shadow-xs overflow-hidden transition-colors data-[state=open]:border-indigo-200 data-[state=open]:bg-indigo-50/20"
              >
                <AccordionTrigger className="font-comico text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-600 hover:no-underline transition-colors py-5 text-left">
                  What makes Planning Portal unique for System Design interviews and RFCs?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm sm:text-base leading-relaxed pb-5">
                  Unlike traditional whiteboards, Planning Portal features first-class system design primitives: smart Architecture Zones (VPCs, Subnets, K8s clusters) with automatic child containment, Database ERD Schema cards with PK/FK indicators, REST API contracts, sequence step numbering, and live back-of-the-envelope capacity estimators.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-7"
                className="border border-slate-200/90 rounded-2xl px-6 bg-white shadow-xs overflow-hidden transition-colors data-[state=open]:border-indigo-200 data-[state=open]:bg-indigo-50/20"
              >
                <AccordionTrigger className="font-comico text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-600 hover:no-underline transition-colors py-5 text-left">
                  Can I export my architecture diagrams and boards?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm sm:text-base leading-relaxed pb-5">
                  Yes! You can export your canvas to ultra high-resolution lossless SVG vectors or crisp PNG images anytime. Your diagrams will look pin-sharp in engineering RFCs, Confluence pages, GitHub READMEs, and technical presentations.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      {/* UNIFIED CREATIVE CTA & FOOTER */}
      <CanvasFooter />
    </div>
  )
}
