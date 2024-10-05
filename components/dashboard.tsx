'use client'

import { useState } from 'react'
import Navbar from './navbar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { CreditCard, DollarSign, Home, PiggyBank, TrendingUp, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'

const data = [
  { name: 'Jan', Expenses: 4000, Income: 2400 },
  { name: 'Feb', Expenses: 3000, Income: 1398 },
  { name: 'Mar', Expenses: 2000, Income: 9800 },
  { name: 'Apr', Expenses: 2780, Income: 3908 },
  { name: 'May', Expenses: 1890, Income: 4800 },
  { name: 'Jun', Expenses: 2390, Income: 3800 },
]

const stockData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
]

export function DashboardComponent() {
  const [activeChart, setActiveChart] = useState('expenses')

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.h1 
          className="text-3xl font-bold mb-6 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dashboard
        </motion.h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            { title: 'Total Balance', value: '$45,231.89', icon: DollarSign, color: 'bg-green-500' },
            { title: 'Investments', value: '$21,345.67', icon: PiggyBank, color: 'bg-blue-500' },
            { title: 'Credit Card', value: '$3,456.78', icon: CreditCard, color: 'bg-yellow-500' },
            { title: 'Mortgage', value: '$234,567.89', icon: Home, color: 'bg-purple-500' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className={`flex flex-row items-center justify-between space-y-0 ${item.color} text-white`}>
                  <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                  <item.icon className="h-4 w-4" />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold">{item.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Financial Overview</span>
                <div className="space-x-2">
                  <Button 
                    size="sm" 
                    variant={activeChart === 'expenses' ? 'default' : 'outline'}
                    onClick={() => setActiveChart('expenses')}
                  >
                    Expenses
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeChart === 'income' ? 'default' : 'outline'}
                    onClick={() => setActiveChart('income')}
                  >
                    Income
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey={activeChart === 'expenses' ? 'Expenses' : 'Income'} fill={activeChart === 'expenses' ? '#ef4444' : '#22c55e'} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Stock Performance</span>
                <Button size="sm" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  4.3%
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="bg-gray-200 dark:bg-gray-800 text-center p-4 text-gray-600 dark:text-gray-400">
        <p>&copy; 2023 CitiBank. All rights reserved.</p>
      </footer>
    </div>
  )
}