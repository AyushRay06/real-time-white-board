import React from "react"

interface ToolIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  className?: string
  showBadge?: boolean
  badgeClassName?: string
}

// ── 1. AWS LAMBDA (Compute) ──
export function AwsLambdaIcon({ size = 28, className = "", showBadge = true, badgeClassName = "", ...props }: ToolIconProps) {
  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Lambda λ Greek Letter */}
      <path
        d="M9.5 7.5L13.8 14.8L7.5 25H11.5L15.8 18L19.5 25H24.5L17.8 12.8L14.2 7.5H9.5Z"
        fill="currentColor"
      />
    </svg>
  )

  if (!showBadge) return icon

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-none bg-[#FF9900] text-white flex items-center justify-center shadow-xs shrink-0 select-none ${badgeClassName}`}
    >
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 32" fill="none">
        <path
          d="M9.5 7.5L13.8 14.8L7.5 25H11.5L15.8 18L19.5 25H24.5L17.8 12.8L14.2 7.5H9.5Z"
          fill="white"
        />
      </svg>
    </div>
  )
}

// ── 2. AMAZON S3 (Simple Storage Service) ──
export function AmazonS3Icon({ size = 28, className = "", showBadge = true, badgeClassName = "", ...props }: ToolIconProps) {
  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Bucket body */}
      <path
        d="M8.5 13.5L10.5 24.5C10.8 26 12.5 27 16 27C19.5 27 21.2 26 21.5 24.5L23.5 13.5H8.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Bucket rim ellipse */}
      <ellipse cx="16" cy="13.5" rx="7.5" ry="2.5" stroke="currentColor" strokeWidth="2" fill="none" />
      {/* Bucket handle arc */}
      <path d="M10 13C10 8.5 22 8.5 22 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )

  if (!showBadge) return icon

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-none bg-[#3F8624] text-white flex items-center justify-center shadow-xs shrink-0 select-none ${badgeClassName}`}
    >
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 32" fill="none">
        <path
          d="M8.5 13.5L10.5 24.5C10.8 26 12.5 27 16 27C19.5 27 21.2 26 21.5 24.5L23.5 13.5H8.5Z"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <ellipse cx="16" cy="13.5" rx="7.5" ry="2.5" stroke="white" strokeWidth="2" />
        <path d="M10 13C10 8.5 22 8.5 22 13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  )
}

// ── 3. AMAZON DYNAMODB (NoSQL Database) ──
export function AmazonDynamoDBIcon({ size = 28, className = "", showBadge = true, badgeClassName = "", ...props }: ToolIconProps) {
  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Cylinder top */}
      <ellipse cx="16" cy="9" rx="8" ry="3" stroke="currentColor" strokeWidth="1.8" />
      {/* Cylinder layer 1 */}
      <path d="M8 9V14C8 15.6 11.6 17 16 17C20.4 17 24 15.6 24 14V9" stroke="currentColor" strokeWidth="1.8" />
      {/* Cylinder layer 2 */}
      <path d="M8 15V20C8 21.6 11.6 23 16 23C20.4 23 24 21.6 24 20V15" stroke="currentColor" strokeWidth="1.8" />
      {/* Central lightning pulse */}
      <path d="M17 10L13.5 16H17.5L15 22L20 15H16L17 10Z" fill="currentColor" />
    </svg>
  )

  if (!showBadge) return icon

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-none bg-[#2E73B8] text-white flex items-center justify-center shadow-xs shrink-0 select-none ${badgeClassName}`}
    >
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 32" fill="none">
        <ellipse cx="16" cy="9" rx="8" ry="3" stroke="white" strokeWidth="1.8" />
        <path d="M8 9V14C8 15.6 11.6 17 16 17C20.4 17 24 15.6 24 14V9" stroke="white" strokeWidth="1.8" />
        <path d="M8 15V20C8 21.6 11.6 23 16 23C20.4 23 24 21.6 24 20V15" stroke="white" strokeWidth="1.8" />
        <path d="M17 10L13.5 16H17.5L15 22L20 15H16L17 10Z" fill="#FDE047" />
      </svg>
    </div>
  )
}

// ── 4. AMAZON API GATEWAY (Networking & Edge) ──
export function AmazonApiGatewayIcon({ size = 28, className = "", showBadge = true, badgeClassName = "", ...props }: ToolIconProps) {
  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Left bracket */}
      <path d="M10 8H7V24H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Right bracket */}
      <path d="M22 8H25V24H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Code bracket < / > */}
      <path d="M12.5 13.5L10.5 16L12.5 18.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.5 13.5L21.5 16L19.5 18.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 12.5L15 19.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )

  if (!showBadge) return icon

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-none bg-[#8C4FFF] text-white flex items-center justify-center shadow-xs shrink-0 select-none ${badgeClassName}`}
    >
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 32" fill="none">
        <path d="M10 8H7V24H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 8H25V24H22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12.5 13.5L10.5 16L12.5 18.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19.5 13.5L21.5 16L19.5 18.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 12.5L15 19.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  )
}

// ── 5. AMAZON CLOUDWATCH (Monitoring & Observability) ──
export function AmazonCloudWatchIcon({ size = 28, className = "", showBadge = true, badgeClassName = "", ...props }: ToolIconProps) {
  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Cloud outline */}
      <path
        d="M9 20C7.3 20 6 18.7 6 17C6 15.5 7.1 14.2 8.5 14C9.1 11.7 11.2 10 13.8 10C16.8 10 19.3 12.2 19.7 15.1C20.1 15 20.6 15 21 15C23.2 15 25 16.8 25 19C25 21.2 23.2 23 21 23H9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Magnifying lens */}
      <circle cx="17.5" cy="18.5" rx="3.5" ry="3.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M20 21L23.5 24.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )

  if (!showBadge) return icon

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-none bg-[#E7157B] text-white flex items-center justify-center shadow-xs shrink-0 select-none ${badgeClassName}`}
    >
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 32" fill="none">
        <path
          d="M9 20C7.3 20 6 18.7 6 17C6 15.5 7.1 14.2 8.5 14C9.1 11.7 11.2 10 13.8 10C16.8 10 19.3 12.2 19.7 15.1C20.1 15 20.6 15 21 15C23.2 15 25 16.8 25 19C25 21.2 23.2 23 21 23H9"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="17.5" cy="18.5" r="3.5" stroke="white" strokeWidth="1.8" />
        <path d="M20 21L23.5 24.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}

// ── 6. AMAZON COGNITO / IAM (Security & Auth) ──
export function AmazonCognitoIcon({ size = 28, className = "", showBadge = true, badgeClassName = "", ...props }: ToolIconProps) {
  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Badge ID outline */}
      <rect x="7" y="7" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
      {/* User head & shoulders */}
      <circle cx="13" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 20C9.5 18 11.5 17.5 13 17.5C14.5 17.5 16.5 18 16.5 20" stroke="currentColor" strokeWidth="1.5" />
      {/* Verified checkmark badge */}
      <circle cx="20.5" cy="19.5" r="3" fill="currentColor" />
      <path d="M19.2 19.5L20.2 20.5L21.8 18.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )

  if (!showBadge) return icon

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-none bg-[#DD344C] text-white flex items-center justify-center shadow-xs shrink-0 select-none ${badgeClassName}`}
    >
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 32" fill="none">
        <rect x="7" y="7" width="18" height="18" rx="0" stroke="white" strokeWidth="1.8" />
        <circle cx="13" cy="14" r="2.5" stroke="white" strokeWidth="1.5" />
        <path d="M9.5 20C9.5 18 11.5 17.5 13 17.5C14.5 17.5 16.5 18 16.5 20" stroke="white" strokeWidth="1.5" />
        <circle cx="20.5" cy="19.5" r="3.2" fill="#22C55E" />
        <path d="M19.3 19.5L20.2 20.4L21.7 18.6" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  )
}

// ── 7. POSTGRESQL (Relational Database) ──
export function PostgresIcon({ size = 28, className = "", showBadge = true, badgeClassName = "", ...props }: ToolIconProps) {
  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <ellipse cx="16" cy="9" rx="7.5" ry="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 9V16C8.5 17.6 11.8 19 16 19C20.2 19 23.5 17.6 23.5 16V9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 16V23C8.5 24.6 11.8 26 16 26C20.2 26 23.5 24.6 23.5 23V16" stroke="currentColor" strokeWidth="1.8" />
      {/* Relational SQL Key / Elephant Trunk mark */}
      <path d="M14 13H18M16 13V22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )

  if (!showBadge) return icon

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-none bg-[#336791] text-white flex items-center justify-center shadow-xs shrink-0 select-none ${badgeClassName}`}
    >
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 32" fill="none">
        <ellipse cx="16" cy="9" rx="7.5" ry="3" stroke="white" strokeWidth="1.8" />
        <path d="M8.5 9V16C8.5 17.6 11.8 19 16 19C20.2 19 23.5 17.6 23.5 16V9" stroke="white" strokeWidth="1.8" />
        <path d="M8.5 16V23C8.5 24.6 11.8 26 16 26C20.2 26 23.5 24.6 23.5 23V16" stroke="white" strokeWidth="1.8" />
        <path d="M14 13H18M16 13V22" stroke="#67E8F9" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </div>
  )
}

// ── 8. REDIS (In-Memory Cache) ──
export function RedisIcon({ size = 28, className = "", showBadge = true, badgeClassName = "", ...props }: ToolIconProps) {
  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Isometric 3D Cache block */}
      <path d="M16 6L24 10.5L16 15L8 10.5L16 6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 11.5L16 16L24 11.5V16L16 20.5L8 16V11.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 17L16 21.5L24 17V21.5L16 26L8 21.5V17Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )

  if (!showBadge) return icon

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-none bg-[#DC382D] text-white flex items-center justify-center shadow-xs shrink-0 select-none ${badgeClassName}`}
    >
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 32" fill="none">
        <path d="M16 6L24 10.5L16 15L8 10.5L16 6Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" fill="rgba(255,255,255,0.2)" />
        <path d="M8 11.5L16 16L24 11.5V16L16 20.5L8 16V11.5Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M8 17L16 21.5L24 17V21.5L16 26L8 21.5V17Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

// ── 9. APACHE KAFKA (Event Streaming) ──
export function KafkaIcon({ size = 28, className = "", showBadge = true, badgeClassName = "", ...props }: ToolIconProps) {
  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="10" cy="16" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="22" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="22" cy="22" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M13.2 14.5L18.8 11.5M13.2 17.5L18.8 20.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )

  if (!showBadge) return icon

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-none bg-[#231F20] text-white flex items-center justify-center shadow-xs shrink-0 select-none ${badgeClassName}`}
    >
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 32" fill="none">
        <circle cx="10" cy="16" r="3.5" stroke="white" strokeWidth="1.8" />
        <circle cx="22" cy="10" r="3.5" stroke="white" strokeWidth="1.8" />
        <circle cx="22" cy="22" r="3.5" stroke="white" strokeWidth="1.8" />
        <path d="M13.2 14.5L18.8 11.5M13.2 17.5L18.8 20.5" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  )
}

// ── 10. DOCKER (Containers) ──
export function DockerIcon({ size = 28, className = "", showBadge = true, badgeClassName = "", ...props }: ToolIconProps) {
  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Container blocks */}
      <rect x="7" y="14" width="3" height="3" fill="currentColor" />
      <rect x="11" y="14" width="3" height="3" fill="currentColor" />
      <rect x="15" y="14" width="3" height="3" fill="currentColor" />
      <rect x="11" y="10" width="3" height="3" fill="currentColor" />
      <rect x="15" y="10" width="3" height="3" fill="currentColor" />
      <rect x="15" y="6" width="3" height="3" fill="currentColor" />
      {/* Whale body */}
      <path
        d="M26.5 16C26 15.5 24.5 15.5 23.5 16.5C22.5 17.5 21 18 19 18H5C4.5 21.5 7.5 25 13 25C19.5 25 24.5 21.5 25.5 17.5C26 17.5 27 16.5 26.5 16Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )

  if (!showBadge) return icon

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-none bg-[#2496ED] text-white flex items-center justify-center shadow-xs shrink-0 select-none ${badgeClassName}`}
    >
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 32" fill="none">
        <rect x="7" y="14" width="3" height="3" fill="white" />
        <rect x="11" y="14" width="3" height="3" fill="white" />
        <rect x="15" y="14" width="3" height="3" fill="white" />
        <rect x="11" y="10" width="3" height="3" fill="white" />
        <rect x="15" y="10" width="3" height="3" fill="white" />
        <rect x="15" y="6" width="3" height="3" fill="white" />
        <path
          d="M26.5 16C26 15.5 24.5 15.5 23.5 16.5C22.5 17.5 21 18 19 18H5C4.5 21.5 7.5 25 13 25C19.5 25 24.5 21.5 25.5 17.5C26 17.5 27 16.5 26.5 16Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  )
}
