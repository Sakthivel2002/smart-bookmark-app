'use client'

import { supabase } from '@/lib/supabaseClient'

export default function BookmarkList({ bookmarks }: any) {

  const deleteBookmark = async (id: string) => {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete error:', error.message)
    }
  }

  if (!bookmarks.length) {
    return (
      <div className="text-center py-10 text-gray-400">
        No bookmarks yet. Add your first one 🚀
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark: any) => (
        <div
          key={bookmark.id}
          className="flex justify-between items-center p-4 
                     bg-white rounded-xl shadow-sm border
                     hover:shadow-md transition duration-200"
        >
          <div className="flex flex-col">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-indigo-600 hover:underline"
            >
              {bookmark.title}
            </a>
            <span className="text-sm text-gray-400 truncate max-w-md">
              {bookmark.url}
            </span>
          </div>

          <button
            onClick={() => deleteBookmark(bookmark.id)}
            className="px-3 py-1.5 text-sm text-red-500 
                       hover:bg-red-50 rounded-lg transition"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
