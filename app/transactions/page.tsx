'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Transaction {
  'Transaction ID': string;
  'Transaction Date Time': string;
  'Transaction Amount': number;
  'Payment Method': string;
  'Account Number': string;
  'Account Name': string;
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/bank_transactions.csv')
      .then(response => response.text())
      .then(data => {
        const parsedData = parseCSV(data);
        setTransactions(parsedData);
        setChartData(generateChartData(parsedData));
      });
  }, []);

  const parseCSV = (csvData: string): Transaction[] => {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).filter(line => line.trim() !== '').map(line => {
      const values = line.split(',');
      return headers.reduce((obj: any, header, index) => {
        if (header === 'Transaction Amount') {
          obj[header] = parseFloat(values[index]) || 0;
        } else {
          obj[header] = values[index] || '';
        }
        return obj;
      }, {});
    });
  };

  const generateChartData = (data: Transaction[]) => {
    const aggregatedData: { [key: string]: number } = {};
    data.forEach(transaction => {
      const date = transaction['Transaction Date Time'].split(' ')[0];
      aggregatedData[date] = (aggregatedData[date] || 0) + transaction['Transaction Amount'];
    });
    return Object.entries(aggregatedData).map(([date, amount]) => ({ date, amount }));
  };

  const filteredTransactions = transactions.filter(transaction =>
    Object.values(transaction).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
          Transaction List
        </motion.h1>
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex gap-4">
                  <Input 
                    placeholder="Search transactions" 
                    className="max-w-sm dark:bg-gray-700 dark:text-white" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button className="dark:bg-blue-600 dark:text-white">Search</Button>
                </div>
                <div className="overflow-x-auto max-h-[400px]">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b dark:border-gray-700">
                        <th className="text-left p-2 dark:text-white">Date</th>
                        <th className="text-left p-2 dark:text-white">Description</th>
                        <th className="text-right p-2 dark:text-white">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((transaction) => (
                        <tr key={transaction['Transaction ID']} className="border-b dark:border-gray-700">
                          <td className="p-2 dark:text-gray-300">
                            {transaction['Transaction Date Time'] 
                              ? transaction['Transaction Date Time'].split(' ')[0] 
                              : 'N/A'}
                          </td>
                          <td className="p-2 dark:text-gray-300">{transaction['Payment Method'] || 'N/A'}</td>
                          <td className={`text-right p-2 ${transaction['Transaction Amount'] < 0 ? 'text-red-500' : 'text-green-500'}`}>
                            ₹{Math.abs(transaction['Transaction Amount'] || 0).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                <CardTitle className="dark:text-white">Transaction Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                      <XAxis dataKey="date" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
                      <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <footer className="bg-gray-200 dark:bg-gray-800 text-center p-4 text-gray-600 dark:text-gray-400">
        <p>&copy; 2025 CitiBank. All rights reserved.</p>
      </footer>
    </div>
  )
}