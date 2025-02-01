# ExiliDraw - Real-time Collaborative Whiteboard

ExiliDraw is a modern, real-time collaborative whiteboard application designed for seamless team collaboration. It allows users to create, edit, and manage content simultaneously, making it ideal for brainstorming, project management, and team coordination.

The application features a minimalistic UI, real-time interactions using Liveblocks, and user management with Clerk. It is highly responsive and accessible across various devices, including mobile phones and tablets.

## Key Features

- **Real-time collaboration**: Multiple users can interact and update the whiteboard in real time.
- **User authentication**: Sign up and log in using Google, email, or phone number through Clerk.
- **Board management**: Create, join, and manage boards; assign roles to users.
- **Drawing tools**: Use predefined shapes, colors, text, and note attachments to annotate the board.
- **Mobile responsive**: The application is fully optimized for mobile and tablet devices.
- **Organizational structure**: Manage teams, assign roles, and track tasks based on user permissions.
- **User-friendly UI**: A clean and minimalistic design powered by TailwindCSS and Shadcn UI.

## Tech Stack

- **Frontend**: 
  - React
  - Next.js
  - TypeScript
  - TailwindCSS
  - Shadcn UI
- **Backend**: 
  - Convex (Real-time Database & Backend Functions)
  - Liveblocks (Real-time collaboration features)
  - Clerk (Authentication & User Management)
- **Payment Integration**:
  - Stripe (for premium features or board access)

## Setup Instructions

### Prerequisites
1. Node.js v16 or above
2. Yarn or npm
3. An account on Clerk (for authentication)
4. Liveblocks credentials (for real-time functionality)
5. Convex setup (for database and real-time features)
6. Stripe account (if integrating payments)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/exilidraw.git
   cd exilidraw
2. Install dependencies:
  ```bash
  npm install
  # or
  yarn install
```
3. Create a .env.local file in the root directory and add the following environment variables:
  ```bash
NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api
CLERK_API_KEY=your-clerk-api-key
LIVEBLOCKS_PUBLIC_KEY=your-liveblocks-public-key
CONVEX_API_KEY=your-convex-api-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```
4.Run the application locally:
```bash
npm run dev
# or
yarn dev
