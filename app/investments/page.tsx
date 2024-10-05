'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { motion } from 'framer-motion'

const portfolioData = [
  { name: 'Stocks', value: 60 },
  { name: 'Bonds', value: 30 },
  { name: 'Cash', value: 10 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

export default function Investments() {
  const [selectedRecommendation, setSelectedRecommendation] = useState<number | null>(null)

  const recommendations = [
    { id: 1, title: 'Increase Tech Allocation', description: 'Consider increasing your allocation to technology sector ETFs by 5%.' },
    { id: 2, title: 'Explore Emerging Markets', description: 'Look into opportunities in emerging markets for potential high growth.' },
    { id: 3, title: 'Add Renewable Energy', description: 'Consider adding exposure to renewable energy stocks for long-term growth.' },
  ]

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
          Investment Insights
        </motion.h1>
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Portfolio Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={portfolioData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {portfolioData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px'
                        }} 
                        itemStyle={{ color: '#fff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2 dark:text-white">
                  {portfolioData.map((item, index) => (
                    <div key={item.name} className="flex items-center">
                      <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                      <span>{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-blue-50 dark:bg-blue-900">
              <CardHeader>
                <CardTitle className="text-blue-700 dark:text-blue-300">AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec) => (
                    <Button
                      key={rec.id}
                      variant={selectedRecommendation === rec.id ? "default" : "outline"}
                      className="w-full justify-start dark:text-white dark:border-white hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
                      onClick={() => setSelectedRecommendation(rec.id)}
                    >
                      {rec.title}
                    </Button>
                  ))}
                </div>
                {selectedRecommendation && (
                  <motion.div
                    className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-bold mb-2 dark:text-white">
                      {recommendations.find(r => r.id === selectedRecommendation)?.title}
                    </h3>
                    <p className="dark:text-gray-300">
                      {recommendations.find(r => r.id === selectedRecommendation)?.description}
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <footer className="bg-gray-200 dark:bg-gray-800 text-center p-4 text-gray-600 dark:text-gray-400">
        <p>&copy; 2023 CitiBank. All rights reserved.</p>
      </footer>
    </div>
  )
}