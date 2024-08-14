"use client"

import { ClerkProvider, SignInButton, useAuth } from "@clerk/nextjs"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import {
  AuthLoading,
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react"
import { Loading } from "@/components/auth/loading"

interface ConvexClientProviderProps {
  children: React.ReactNode
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!

const convex = new ConvexReactClient(convexUrl)

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
    //need to add <Authenticated></Authenticated> on {childeren} for now having an erroe so removed
    <ClerkProvider publishableKey="pk_test_ZXBpYy1sZW11ci04My5jbGVyay5hY2NvdW50cy5kZXYk">
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Unauthenticated>
          <SignInButton />
        </Unauthenticated>
        <Authenticated>{children}</Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
