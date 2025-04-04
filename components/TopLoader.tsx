"use client"

import { useState, useEffect } from "react"

export default function Component() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 10)
    }, 100)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div className="h-full bg-primary transition-all duration-300 ease-in-out" style={{ width: `${progress}%` }} />
    </div>
  )
}