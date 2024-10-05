'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Edit2, Check, X } from 'lucide-react'

interface Goal {
  id: string;
  name: string;
  current: number;
  target: number;
  date: string;
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<Omit<Goal, 'id'>>({ name: '', current: 0, target: 0, date: '' });
  const [editingGoal, setEditingGoal] = useState<string | null>(null);

  useEffect(() => {
    const storedGoals = localStorage.getItem('goals');
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGoal(prev => ({ ...prev, [name]: name === 'current' || name === 'target' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 9);
    setGoals(prev => [...prev, { ...newGoal, id }]);
    setNewGoal({ name: '', current: 0, target: 0, date: '' });
  };

  const handleComplete = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleEdit = (id: string) => {
    setEditingGoal(id);
  };

  const handleSaveEdit = (id: string) => {
    setEditingGoal(null);
  };

  const handleCancelEdit = () => {
    setEditingGoal(null);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { name, value } = e.target;
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, [name]: Number(value) } : goal
    ));
  };

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
          Goal Manager
        </motion.h1>
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Your Financial Goals</CardTitle>
              </CardHeader>
              <CardContent className="max-h-[500px] overflow-y-auto">
                <AnimatePresence>
                  {goals.map((goal) => (
                    <motion.div 
                      key={goal.id}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium dark:text-white">{goal.name}</span>
                        {editingGoal === goal.id ? (
                          <div className="flex items-center space-x-2">
                            <Input 
                              type="number"
                              name="current"
                              value={goal.current}
                              onChange={(e) => handleEditInputChange(e, goal.id)}
                              className="w-24 dark:bg-gray-700 dark:text-white"
                            />
                            <span className="dark:text-gray-300">/</span>
                            <Input 
                              type="number"
                              name="target"
                              value={goal.target}
                              onChange={(e) => handleEditInputChange(e, goal.id)}
                              className="w-24 dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                        ) : (
                          <span className="dark:text-gray-300">₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}</span>
                        )}
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-2">
                        <div 
                          className="bg-green-500 h-2.5 rounded-full" 
                          style={{ 
                            width: `${Math.min((goal.current / goal.target) * 100, 100)}%`,
                            maxWidth: '100%'
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Target Date: {goal.date}</span>
                        <div className="space-x-2">
                          {editingGoal === goal.id ? (
                            <>
                              <Button 
                                size="sm"
                                onClick={() => handleSaveEdit(goal.id)}
                                className="bg-green-500 hover:bg-green-600 text-white"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm"
                                onClick={handleCancelEdit}
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button 
                                size="sm"
                                onClick={() => handleEdit(goal.id)}
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleComplete(goal.id)}
                                className="bg-green-500 hover:bg-green-600 text-white"
                              >
                                Completed
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Add New Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Goal Name</label>
                    <Input 
                      id="name" 
                      name="name"
                      value={newGoal.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Home Down Payment" 
                      className="dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="current" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Amount</label>
                    <Input 
                      id="current" 
                      name="current"
                      type="number" 
                      value={newGoal.current}
                      onChange={handleInputChange}
                      placeholder="e.g., 10000" 
                      className="dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="target" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Amount</label>
                    <Input 
                      id="target" 
                      name="target"
                      type="number" 
                      value={newGoal.target}
                      onChange={handleInputChange}
                      placeholder="e.g., 50000" 
                      className="dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Date</label>
                    <Input 
                      id="date" 
                      name="date"
                      type="date" 
                      value={newGoal.date}
                      onChange={handleInputChange}
                      className="dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <Button type="submit" className="w-full">Add Goal</Button>
                </form>
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