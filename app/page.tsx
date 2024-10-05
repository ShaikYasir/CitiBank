'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, PiggyBank, Home, Briefcase } from 'lucide-react'
import Navbar from '@/components/navbar'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-100 dark:bg-gray-800 py-12">
          <div className="container mx-auto px-4 flex flex-wrap md:flex-nowrap">
            <div className="w-full md:w-2/3 pr-0 md:pr-8">
              <h1 className="text-4xl font-bold mb-4">Choose the right Citi® credit card for you</h1>
              <p className="mb-4">Whether you want Cash Back, Great Airline Miles, Rewards for Costco Members, or a Low Intro Rate, the choice is all yours.</p>
              <Button>Learn More</Button>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <Image src="/C1.png" alt="Citi Custom Cash Card" width={250} height={150} className="rounded-lg shadow-md" />
                <Image src="/C2.png" alt="Citi Double Cash Card" width={250} height={150} className="rounded-lg shadow-md" />
                <Image src="/C3.png" alt="Citi Rewards Card" width={250} height={150} className="rounded-lg shadow-md" />
                <Image src="/C4.png" alt="Citi Diamond Preferred Card" width={250} height={150} className="rounded-lg shadow-md" />
              </div>
            </div>
            <div className="w-full md:w-1/3 mt-8 md:mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Sign On</CardTitle>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="user-id" className="block text-sm font-medium text-gray-700">User ID</label>
                        <Input id="user-id" placeholder="User ID" />
                      </div>
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <Input id="password" type="password" placeholder="Password" />
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="remember-me" />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember user ID</label>
                      </div>
                      <Button className="w-full">Sign On</Button>
                    </div>
                  </form>
                  <div className="mt-4 text-sm">
                    <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
                    {' / '}
                    <Link href="/activate" className="text-blue-600 hover:underline">Activate</Link>
                    {' | '}
                    <Link href="/forgot-password" className="text-blue-600 hover:underline">Forgot User ID or Password</Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Banking Services */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                { icon: CreditCard, label: 'Credit Cards' },
                { icon: PiggyBank, label: 'Checking Solutions' },
                { icon: Home, label: 'Mortgage' },
                { icon: Briefcase, label: 'Personal Loans' },
                { icon: CreditCard, label: 'Investing Options' },
                { icon: Briefcase, label: 'Small Business' },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <item.icon className="w-12 h-12 text-blue-600 mb-2" />
                  <span className="text-sm text-center">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Promotional Cards */}
        <section className="py-12 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'CITI® CHECKING ACCOUNTS', image: '/C5.png' },
                { title: 'CITI® SAVINGS ACCOUNTS', image: '/C6.png' },
                { title: 'CITI® / AADVANTAGE® CREDIT CARDS', image: '/C9.png' },
              ].map((card, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-500">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image src={card.image} alt={card.title} width={400} height={200} className="w-full h-48 object-cover rounded-lg" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Citi Shop Banner */}
        <section className="bg-blue-100 dark:bg-blue-900 py-12">
          <div className="container mx-auto px-4 flex flex-wrap md:flex-nowrap items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <Image src="/C10.png" alt="Citi Shop" width={500} height={300} className="rounded-lg shadow-md" />
            </div>
            <div className="w-full md:w-1/2 md:pl-8">
              <h2 className="text-2xl font-bold mb-4">Shop, Save and Make a Splash</h2>
              <p className="mb-4">Add the new, free Citi Shop browser extension that finds offers and coupons at over 5,000 online merchants</p>
              <Button>Discover Citi Shop</Button>
            </div>
          </div>
        </section>

        {/* Checking Accounts */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 flex flex-wrap md:flex-nowrap items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Unlock checking that grows with you</h2>
              <p className="mb-4">The higher your balances, the more benefits and services you can enjoy from Citi Relationship Tiers.</p>
              <Button>Learn More</Button>
            </div>
            <div className="w-full md:w-1/2 md:pl-8">
              <Image src="/C11.png" alt="Checking Accounts" width={500} height={300} className="rounded-lg shadow-md" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8">
            {[
              'Why Citi',
              'Wealth Management',
              'Business Banking',
              'Rates',
              'Help & Support'
            ].map((category, index) => (
              <div key={index}>
                <h3 className="font-bold mb-4">{category}</h3>
                <ul className="space-y-2">
                  {['Link 1', 'Link 2', 'Link 3'].map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href="#" className="text-gray-400 hover:text-white">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-sm text-gray-400">&copy; 2024 Citigroup Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}