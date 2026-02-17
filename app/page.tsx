'use client'

import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data } = await supabase.auth.getSession()
    if (data.session) {
      router.push('/dashboard')
    }
  }

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/dashboard`
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Bookmark Manager
        </h1>

        <button
          onClick={loginWithGoogle}
          className="w-full py-3 rounded-lg bg-black text-white font-medium 
                     hover:bg-gray-800 transition duration-300"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
