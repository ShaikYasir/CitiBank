'use client'

import Navbar from './navbar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const transactions = [
  { id: 1, description: 'Grocery Store', amount: -120.50, date: '2023-07-01' },
  { id: 2, description: 'Salary Deposit', amount: 3000, date: '2023-07-02' },
  { id: 3, description: 'Electric Bill', amount: -85.20, date: '2023-07-03' },
  { id: 4, description: 'Restaurant', amount: -45.75, date: '2023-07-04' },
  { id: 5, description: 'Gas Station', amount: -40.00, date: '2023-07-05' },
]

export function TransactionsComponent() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Transaction List</h1>
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex gap-4">
              <Input placeholder="Search transactions" className="max-w-sm" />
              <Button>Search</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Description</th>
                    <th className="text-right p-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b">
                      <td className="p-2">{transaction.date}</td>
                      <td className="p-2">{transaction.description}</td>
                      <td className={`text-right p-2 ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="bg-gray-200 text-center p-4">
        <p>&copy; 2023 CitiBank. All rights reserved.</p>
      </footer>
    </div>
  )
}