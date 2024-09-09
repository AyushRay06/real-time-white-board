"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PenLine, Users, Zap, Check, Layers, Lock, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { SignInButton } from "@clerk/nextjs"

export function LandingPage() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email submission here
    console.log("Email submitted:", email)
    setEmail("")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-7xl font-bold tracking-tighter   pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-500/80 bg-clip-text text-center  leading-none text-transparent  ">
                  Collaborate in Real-Time with Our Free Digital Whiteboard
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Boost your team&apos;s creativity and productivity with our
                  intuitive, feature-rich whiteboard platform. Now completely
                  free to use!
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <SignInButton>
                  <Button type="submit">Get Started</Button>
                </SignInButton>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Sign up now and start collaborating for free. No credit card
                  required.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <CardHeader>
                  <PenLine className="h-8 w-8 mb-2" />
                  <CardTitle>Intuitive Drawing Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  Effortlessly sketch ideas with our user-friendly interface and
                  versatile drawing tools.
                </CardContent>
              </Card>
              <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <CardHeader>
                  <Users className="h-8 w-8 mb-2" />
                  <CardTitle>Real-Time Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  Work together seamlessly with your team, no matter where they
                  are in the world.
                </CardContent>
              </Card>
              <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <CardHeader>
                  <Zap className="h-8 w-8 mb-2" />
                  <CardTitle>Instant Sync</CardTitle>
                </CardHeader>
                <CardContent>
                  Your work is saved and synced in real-time, accessible from
                  any device, anytime.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Features Showcase
            </h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Advanced Drawing Tools</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our whiteboard comes with a wide range of drawing tools,
                  including pens, shapes, text boxes, and more. Express your
                  ideas with precision and creativity.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" /> Multiple
                    brush types and sizes
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" /> Shape
                    recognition for clean diagrams
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" /> Text
                    formatting options
                  </li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Advanced Drawing Tools Showcase"
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-2 bg-primary text-primary-foreground rounded-full">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Create a Board</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Start a new whiteboard or choose from our templates to
                  kickstart your project.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-2 bg-primary text-primary-foreground rounded-full">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. Invite Your Team</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Share your board with team members and collaborate in
                  real-time, no matter where they are.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-2 bg-primary text-primary-foreground rounded-full">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  3. Collaborate and Create
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Use our intuitive tools to brainstorm, plan, and bring your
                  ideas to life together.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Amazing Tool!</CardTitle>
                </CardHeader>
                <CardContent>
                  &quot;This whiteboard has revolutionized our brainstorming
                  sessions. It&apos;s like we&apos;re all in the same
                  room!&quot;
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">
                    - Sarah J., Product Manager
                  </p>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Boosts Productivity</CardTitle>
                </CardHeader>
                <CardContent>
                  &quot;We&apos;ve seen a 30% increase in project efficiency
                  since we started using this platform. Highly
                  recommended!&quot;
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">- Mike T., Team Lead</p>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>User-Friendly Interface</CardTitle>
                </CardHeader>
                <CardContent>
                  &quot;Even our less tech-savvy team members found it easy to
                  use. The learning curve is minimal.&quot;
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">
                    - Emily R., Graphic Designer
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full max-w-3xl mx-auto"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it really free?</AccordionTrigger>
                <AccordionContent>
                  Yes, our digital whiteboard is completely free to use. We
                  believe in providing value to our users and building a
                  community of collaborators.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  How many team members can I invite?
                </AccordionTrigger>
                <AccordionContent>
                  You can invite an unlimited number of team members to
                  collaborate on your whiteboards. There are no restrictions on
                  team size.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Can I use it on my mobile device?
                </AccordionTrigger>
                <AccordionContent>
                  Our whiteboard is fully responsive and works on desktop,
                  tablet, and mobile devices. You can access and edit your
                  boards from anywhere.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Is my data secure?</AccordionTrigger>
                <AccordionContent>
                  We take data security very seriously. All your data is
                  encrypted in transit and at rest. We use industry-standard
                  security measures to protect your information.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Start Collaborating Today
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our digital whiteboard is completely free to use. Sign up now
                  and experience the power of real-time collaboration!
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit">Get Started</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No credit card required. Start using our whiteboard for free
                  today!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 Acme Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Cookie Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
