'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function BookmarkForm({ user }: any) {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const addBookmark = async (e: any) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)

    const { error } = await supabase
      .from('bookmarks')
      .insert([
        {
          url,
          title,
          user_id: user.id,
        },
      ])

    if (!error) {
      setUrl('')
      setTitle('')
    } else {
      console.error('Insert error:', error.message)
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={addBookmark}
      className="mb-6 bg-gray-50 p-5 rounded-xl shadow-sm border"
    >
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Bookmark title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     transition"
          required
        />

        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     transition"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg 
                     hover:bg-indigo-700 transition duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Bookmark'}
        </button>
      </div>
    </form>
  )
}
