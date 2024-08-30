"use client"

import { connectionIdToColor } from "@/lib/utils"
import { memo } from "react"
import { MousePointer2, MousePointer2Icon } from "lucide-react"
import { useOther } from "@liveblocks/react/suspense"

interface CursorProps {
  connectionId: number
}

export const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, (user) => user?.info)
  const cursor = useOther(connectionId, (user) => user.presence.cursor)
  const name = info?.name || "Teammate"

  if (!cursor) {
    return null
  }

  const { x, y } = cursor

  return (
    //foregien pbject is used to render a icon inside a SVG
    <foreignObject
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      height={50}
      width={name.length * 10 + 24}
      className="relative drop-shadow-md"
    >
      <MousePointer2Icon
        className="h-5 w-5"
        style={{
          fill: connectionIdToColor(connectionId),
          color: connectionIdToColor(connectionId),
        }}
      />
      <div
        className="absolute left-5 px-1.5 py-0.5 rounded-md text-sm text-white font-semibold"
        style={{ backgroundColor: connectionIdToColor(connectionId) }}
      >
        {name}
      </div>
    </foreignObject>
  )
})

Cursor.displayName = "Cursor"
// import React from "react"

// type Props = {
//   color: string
//   x: number
//   y: number
// }

// export default function Cursor({ color, x, y }: Props) {
//   return (
//     <svg
//       style={{
//         position: "absolute",
//         left: 0,
//         top: 0,
//         transform: `translateX(${x}px) translateY(${y}px)`,
//       }}
//       width="24"
//       height="36"
//       viewBox="0 0 24 36"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
//         fill={color}
//       />
//     </svg>
//   )
// }
