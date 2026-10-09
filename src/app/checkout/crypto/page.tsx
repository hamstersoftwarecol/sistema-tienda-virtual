'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESSES, ERC20_ABI, MERCHANT_WALLET_ADDRESS } from '@/lib/web3/config'
import { Wallet, Loader2, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

// Define window.ethereum for TypeScript
declare global {
  interface Window {
    ethereum?: any
  }
}

export default function CryptoCheckoutPage() {
  const { items, getTotal } = useCartStore()
  const router = useRouter()

  const [account, setAccount] = useState<string>('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string>('')
  const [selectedToken, setSelectedToken] = useState<'USDT' | 'USDC'>('USDT')

  const totalAmount = getTotal()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setError('You must be logged in to checkout.')
        setTimeout(() => router.push('/auth/login'), 2000)
        return
      }
      if (items.length === 0) {
        router.push('/cart')
      }
    }
    checkAuth()
  }, [items, router])

  const connectWallet = async () => {
    setIsConnecting(true)
    setError('')
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", [])
        setAccount(accounts[0])
      } else {
        setError("Please install MetaMask or another Web3 wallet.")
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet.")
    } finally {
      setIsConnecting(false)
    }
  }

  const handlePayment = async () => {
    if (!account) return
    setIsProcessing(true)
    setError('')

    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      const tokenAddress = CONTRACT_ADDRESSES[selectedToken]
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer)

      const decimals = await contract.decimals()
      const amountInWei = ethers.parseUnits(totalAmount.toString(), decimals)

      const tx = await contract.transfer(MERCHANT_WALLET_ADDRESS, amountInWei)
      await tx.wait()

      // Payment successful
      router.push('/checkout/success?method=crypto')

    } catch (err: any) {
      console.error(err)
      setError(err.message || "Transaction failed or was rejected.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) return null

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crypto Checkout
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Total Amount: <span className="font-bold text-lg">${totalAmount.toFixed(2)}</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {!account ? (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isConnecting ? (
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
              ) : (
                <Wallet className="h-5 w-5 mr-2" />
              )}
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          ) : (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Connected Wallet:</p>
                <div className="p-3 bg-gray-100 rounded-md truncate text-xs text-gray-600 font-mono">
                  {account}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Token</label>
                <select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value as 'USDT' | 'USDC')}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="USDT">USDT</option>
                  <option value="USDC">USDC</option>
                </select>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {isProcessing ? (
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                ) : null}
                {isProcessing ? 'Processing Payment...' : `Pay ${totalAmount.toFixed(2)} ${selectedToken}`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
