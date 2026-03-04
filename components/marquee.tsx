"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  speed?: number;
}

export function Marquee({
  children,
  direction = "left",
  pauseOnHover = true,
  className,
  speed = 40,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)]",
        className,
      )}
      {...props}
    >
      <motion.div
        className="flex shrink-0 justify-around [gap:var(--gap)]"
        animate={{
          x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
        style={
          {
            // pause on hover via css if preferred, but motion handles animation
            // we can just use CSS animation instead for safer tailwind usage
            // but since we want premium, motion works well.
          }
        }
      >
        {children}
      </motion.div>
      <motion.div
        className="flex shrink-0 justify-around [gap:var(--gap)]"
        aria-hidden="true"
        animate={{
          x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
