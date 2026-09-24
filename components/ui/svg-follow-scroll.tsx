"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import React, { useRef } from "react";

interface Skiper19Props {
  title?: React.ReactNode;
  subtitle?: string;
  tagline?: string;
  footerTitle?: string;
  strokeColor?: string;
  badgeLeftTitle?: string;
  badgeLeftSub?: string;
  badgeRightTitle?: string;
  badgeRightSub?: string;
}

const Skiper19 = ({
  title = (
    <>
      Every stroke <br /> connects into your <br />
      team&apos;s master plan
    </>
  ),
  subtitle = "Scroll through the infinite canvas to see ideas take shape",
  strokeColor = "#C084FC",
  footerTitle = "PLANNING PORTAL",
  badgeLeftTitle = "Real-Time Collaboration",
  badgeLeftSub = "Multiplayer Whiteboard",
  badgeRightTitle = "Infinite Precision",
  badgeRightSub = "Free & Unbounded",
}: Skiper19Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  return (
    <section
      ref={ref}
      className="mx-auto flex h-[280vh] sm:h-[320vh] w-full flex-col items-center overflow-hidden bg-[#FAFBFD] px-4 text-slate-900 relative"
    >
      <div className="mt-28 sm:mt-36 relative flex w-fit flex-col items-center justify-center gap-6 text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs sm:text-sm font-semibold">
          Interactive Canvas Flow
        </div>

        <h2 className="font-comico relative z-10 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 max-w-4xl leading-[1.1]">
          {title}
        </h2>

        <p className="font-sans relative z-10 max-w-2xl text-base sm:text-xl font-normal text-slate-600">
          {subtitle}
        </p>

        <LinePath
          className="absolute -right-[30%] sm:-right-[40%] top-6 z-0 opacity-80 pointer-events-none"
          scrollYProgress={scrollYProgress}
          strokeColor={strokeColor}
        />
      </div>

      <div className="rounded-3xl sm:rounded-[2.5rem] font-sans w-full max-w-6xl translate-y-[130vh] sm:translate-y-[160vh] bg-slate-900 border border-slate-800 p-8 sm:p-12 text-slate-100 shadow-2xl relative z-10">
        <div className="w-12 h-1.5 bg-purple-400 rounded-full mx-auto mb-8" />
        
        <h3 className="font-comico text-center text-[10vw] sm:text-[7vw] font-bold leading-[0.9] tracking-tight text-white mb-12">
          {footerTitle}
        </h3>

        <div className="flex w-full flex-col items-start gap-6 font-medium sm:flex-row sm:justify-between border-t border-slate-800 pt-8">
          <div className="flex w-full items-center justify-between gap-12 sm:w-fit sm:justify-center">
            <div>
              <p className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-1">Workflow</p>
              <p className="text-sm sm:text-base text-slate-200">
                {badgeLeftTitle} <br />
                <span className="text-slate-400 text-xs">{badgeLeftSub}</span>
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-1">Architecture</p>
              <p className="text-sm sm:text-base text-slate-200">
                Live Cloud Sync <br />
                <span className="text-slate-400 text-xs">Zero Manual Saves</span>
              </p>
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center justify-between gap-12 sm:w-fit sm:justify-center">
            <div>
              <p className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-1">Access</p>
              <p className="text-sm sm:text-base text-slate-200">
                {badgeRightTitle} <br />
                <span className="text-slate-400 text-xs">{badgeRightSub}</span>
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-1">Canvas</p>
              <p className="text-sm sm:text-base text-slate-200">
                Infinite Surface <br />
                <span className="text-slate-400 text-xs">Vector Precision</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Skiper19 };

export const GlobalScrollStroke = () => {
  const { scrollYProgress } = useScroll();
  // Starts emerging behind the canvas simulator as the user begins scrolling
  const pathLength = useTransform(scrollYProgress, [0.04, 0.98], [0.01, 1]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <svg
        viewBox="0 0 1440 7200"
        fill="none"
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-90 sm:opacity-95"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="vibrantPastelPurple" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="20%" stopColor="#8B5CF6" />
            <stop offset="40%" stopColor="#A855F7" />
            <stop offset="60%" stopColor="#8B5CF6" />
            <stop offset="80%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <filter id="softGlow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#8B5CF6" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Starts behind the canvas simulator (around Y=850), avoiding hero text, then weaves across every section */}
        <motion.path
          d="M 240 850 
             C 180 980, 220 1150, 420 1280 
             C 620 1400, 1080 1320, 1220 1480 
             C 1340 1620, 1260 1850, 1040 1980 
             C 820 2100, 360 2050, 220 2250 
             C 100 2420, 240 2640, 520 2740 
             C 800 2840, 1220 2750, 1280 2980 
             C 1340 3180, 1160 3400, 940 3520 
             C 720 3640, 320 3580, 200 3780 
             C 80 3980, 260 4200, 580 4300 
             C 900 4400, 1260 4350, 1240 4580 
             C 1220 4800, 1060 5020, 840 5140 
             C 620 5260, 280 5220, 180 5450 
             C 80 5680, 280 5900, 620 6000 
             C 960 6100, 1280 6050, 1250 6300 
             C 1220 6520, 1040 6720, 780 6820 
             C 520 6920, 280 7050, 450 7180 
             C 600 7260, 880 7220, 1120 7180"
          stroke="url(#vibrantPastelPurple)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#softGlow)"
          style={{
            pathLength,
            strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
          }}
        />
      </svg>
    </div>
  );
};

const LinePath = ({
  className,
  scrollYProgress,
  strokeColor = "#C084FC",
}: {
  className: string;
  scrollYProgress: MotionValue<number>;
  strokeColor?: string;
}) => {
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <svg
      width="1278"
      height="2319"
      viewBox="0 0 1278 2319"
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
        stroke={strokeColor}
        strokeWidth="16"
        strokeLinecap="round"
        style={{
          pathLength,
          strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
        }}
      />
    </svg>
  );
};
