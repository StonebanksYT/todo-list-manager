'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function Settings() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="bg-card shadow-sm rounded-lg p-6 space-y-6 border border-border">
      <h1 className="text-3xl font-bold text-foreground mb-6">Settings</h1>
      <div className="bg-card shadow-sm rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <span className="font-medium text-foreground">Dark Mode</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium text-foreground">Enable Notifications</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  )
}

