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
import {
  PenLine,
  Users,
  Zap,
  Check,
  Layers,
  Lock,
  Globe,
  Briefcase,
  Cpu,
  Box,
  LineChart,
  Github,
} from "lucide-react"
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200 bg-white">
        <Link className="flex items-center justify-center" href="#">
          <Image src="/logo.svg" alt="logo" width={40} height={40} />
          <span className="ml-2 text-xl font-bold text-gray-900">
            Planning Portal
          </span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-blue-200 via-blue-100 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-8">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-blue-800">
                  Collaborate in Real-Time with Our
                  <span className="text-blue-600">
                    {" "}
                    Free Digital Whiteboard
                  </span>
                </h1>
                <p className="mx-auto max-w-[900px] text-xl text-gray-600 md:text-2xl pb-8">
                  Boost your team&apos;s creativity and productivity with our
                  intuitive, feature-rich whiteboard platform. Now completely
                  free to use!
                </p>
              </div>
              <div className="w-full max-w-sm space-y-8">
                <SignInButton>
                  <Button
                    size="lg"
                    type="submit"
                    className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </Button>
                </SignInButton>

                <p className="text-sm text-gray-600">
                  Sign up now and start collaborating for free. No credit card
                  required.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-purple-300">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900">
              Key Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-b from-purple-300 to-white">
                <CardHeader>
                  <PenLine className="h-8 w-8 mb-2 text-blue-600" />
                  <CardTitle>Intuitive Drawing Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  Effortlessly sketch ideas with our user-friendly interface and
                  versatile drawing tools.
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-b from-purple-300 to-white ">
                <CardHeader>
                  <Users className="h-8 w-8 mb-2 text-blue-600" />
                  <CardTitle>Real-Time Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  Work together seamlessly with your team, no matter where they
                  are in the world.
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-b from-purple-300 to-white">
                <CardHeader>
                  <Zap className="h-8 w-8 mb-2 text-blue-600" />
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-purple-300 to-pink-200">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-6xl text-center mb-12 text-gray-900">
              Features Showcase
            </h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h3 className="text-5xl font-bold text-gray-900">
                  Advanced Drawing Tools
                </h3>
                <p className="text-gray-900 text-xl font-semibold">
                  Our whiteboard comes with a wide range of drawing tools,
                  including pens, shapes, text boxes, and more. Express your
                  ideas with precision and creativity.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-800 text-lg">
                    <Check className="h-5 w-5 mr-2 text-green-500" /> Multiple
                    brush types and sizes
                  </li>
                  <li className="flex items-center text-gray-800 text-lg">
                    <Check className="h-5 w-5 mr-2 text-green-500" /> Shape
                    recognition for clean diagrams
                  </li>
                  <li className="flex items-center text-gray-800 text-lg">
                    <Check className="h-5 w-5 mr-2 text-green-500" /> Text
                    formatting options
                  </li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden border border-gray-200 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <Image
                  src="/display.png?"
                  alt="Advanced Drawing Tools Showcase"
                  width={700}
                  height={500}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-pink-200 to-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900">
              How It Works
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4 p-2 bg-blue-100 text-blue-600 rounded-full transition-colors hover:bg-blue-200">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  1. Create a Board
                </h3>
                <p className="text-gray-600">
                  Start a new whiteboard or choose from our templates to
                  kickstart your project.
                </p>
              </div>
              <div className="flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4 p-2 bg-blue-100 text-blue-600 rounded-full transition-colors hover:bg-blue-200">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  2. Invite Your Team
                </h3>
                <p className="text-gray-600">
                  Share your board with team members and collaborate in
                  real-time, no matter where they are.
                </p>
              </div>
              <div className="flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4 p-2 bg-blue-100 text-blue-600 rounded-full transition-colors hover:bg-blue-200">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  3. Collaborate and Create
                </h3>
                <p className="text-gray-600">
                  Use our intuitive tools to brainstorm, plan, and bring your
                  ideas to life together.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-yellow-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900">
              Use Cases
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-b from-yellow-100 to-white">
                <CardHeader>
                  <Briefcase className="h-8 w-8 mb-2 text-blue-600" />
                  <CardTitle>Consulting</CardTitle>
                </CardHeader>
                <CardContent>
                  Facilitate client workshops, create strategy maps, and
                  visualize complex business processes with ease.
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-b from-yellow-100 to-white">
                <CardHeader>
                  <Cpu className="h-8 w-8 mb-2 text-blue-600" />
                  <CardTitle>Technology</CardTitle>
                </CardHeader>
                <CardContent>
                  Collaborate on system architectures, design user interfaces,
                  and plan sprints with distributed teams.
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-b from-yellow-100 to-white">
                <CardHeader>
                  <Box className="h-8 w-8 mb-2 text-blue-600" />
                  <CardTitle>Product Development</CardTitle>
                </CardHeader>
                <CardContent>
                  Brainstorm product features, create user journey maps, and
                  iterate on designs in real-time.
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-b from-yellow-100 to-white">
                <CardHeader>
                  <LineChart className="h-8 w-8 mb-2 text-blue-600" />
                  <CardTitle>Data Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  Visualize data trends, create collaborative dashboards, and
                  explain complex insights to stakeholders.
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-b from-yellow-100 to-white">
                <CardHeader>
                  <Users className="h-8 w-8 mb-2 text-blue-600" />
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  Engage students with interactive lessons, facilitate group
                  projects, and provide visual feedback on assignments.
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-b from-yellow-100 to-white">
                <CardHeader>
                  <Globe className="h-8 w-8 mb-2 text-blue-600" />
                  <CardTitle>Remote Work</CardTitle>
                </CardHeader>
                <CardContent>
                  Host virtual team meetings, conduct remote brainstorming
                  sessions, and maintain a shared workspace for distributed
                  teams.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-yellow-100 to-green-200">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl  text-center mb-12 text-gray-900">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full max-w-3xl mx-auto"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="hover:text-blue-600 text-lg font-semibold  transition-colors">
                  Is it really free?
                </AccordionTrigger>
                <AccordionContent className="text-pretty">
                  Yes, our digital whiteboard is completely free to use. We
                  believe in providing value to our users and building a
                  community of collaborators.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="hover:text-blue-600 text-lg font-semibold transition-colors">
                  How many team members can I invite?
                </AccordionTrigger>
                <AccordionContent className="text-pretty">
                  You can invite an unlimited number of team members to
                  collaborate on your whiteboards. There are no restrictions on
                  team size.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="hover:text-blue-600 text-lg font-semibold transition-colors">
                  Can I use it on my mobile device?
                </AccordionTrigger>
                <AccordionContent className="text-pretty">
                  Our whiteboard is fully responsive and works on desktop,
                  tablet, and mobile devices. You can access and edit your
                  boards from anywhere.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="hover:text-blue-600 text-lg font-semibold  transition-colors">
                  Is my data secure?
                </AccordionTrigger>
                <AccordionContent className="text-pretty">
                  We take data security very seriously. All your data is
                  encrypted in transit and at rest. We use industry-standard
                  security measures to protect your information.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-200 to-blue-300">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                  Start Collaborating Today
                </h2>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <SignInButton>
                  <Button
                    size="lg"
                    type="submit"
                    className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </Button>
                </SignInButton>

                <p className="text-sm text-gray-600">
                  No credit card required. Start using our whiteboard for free
                  today!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 bg-white">
        <p className="text-sm text-gray-600">
          Planning Portal developed by{" "}
          <Link
            className="hover:text-blue-500"
            href="https://portfolio-website-nu-lyart.vercel.app/"
          >
            Ayush
          </Link>
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-600 hover:text-blue-600 transition-colors"
            href="https://github.com/AyushRay06/real-time-white-board"
          >
            <Github />
          </Link>
        </nav>
      </footer>
    </div>
  )
}
