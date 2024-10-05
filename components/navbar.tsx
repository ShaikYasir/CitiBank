'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { MenuIcon, X, Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <motion.header 
      className="bg-white dark:bg-gray-100 text-gray-800 dark:text-gray-800"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Image src="/citi.png" alt="Citi Bank Logo" width={100} height={40} priority />
            </motion.div>
          </Link>
          <nav className="hidden md:flex space-x-4">
            {['Home', 'Dashboard', 'Investments', 'Goals', 'Transactions'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
              >
                <Link 
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                  className="hover:text-blue-600 dark:hover:text-blue-800 transition-colors"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-800 dark:text-gray-800 hover:text-blue-600 dark:hover:text-blue-800"
            >
              {isDarkMode ? <Sun /> : <Moon />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-800 dark:text-gray-800 hover:text-blue-600 dark:hover:text-blue-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <MenuIcon />}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <motion.div
            className="md:hidden py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-2">
              {['Home', 'Dashboard', 'Investments', 'Goals', 'Transactions'].map((item) => (
                <Link 
                  key={item} 
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                  className="hover:text-blue-600 dark:hover:text-blue-800 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}