🚀 Smart Bookmark App

A realtime bookmark manager built with Next.js 16 and Supabase.

Users can log in with Google, add bookmarks, and see changes reflected instantly across multiple tabs using Supabase Realtime.

✨ Features

🔐 Google OAuth Authentication (Supabase Auth)

⚡ Realtime bookmark sync (multi-tab support)

➕ Add bookmarks

🗑 Delete bookmarks

🎨 Clean UI with Tailwind CSS

🔒 Row Level Security (RLS) enabled

🛠 Tech Stack

Next.js 16 (App Router)

React

Supabase (Auth + Postgres + Realtime)

Tailwind CSS 3

TypeScript

🧠 Key Engineering Learnings
1️⃣ Realtime DELETE events issue

DELETE operations were not updating the UI in realtime.

Fix:
Enabled full replica identity in Postgres:

ALTER TABLE bookmarks REPLICA IDENTITY FULL;


This allows Supabase to send old row data (payload.old) for DELETE events.

2️⃣ Multi-Tab Realtime Sync

Used filtered Supabase postgres_changes subscription:

filter: `user_id=eq.${user.id}`


Ensures user-specific realtime updates.

3️⃣ Proper Subscription Cleanup

Realtime channels are cleaned up on component unmount to prevent memory leaks.

📦 Installation
git clone https://github.com/Sakthivel2002/smart-bookmark-app.git
cd smart-bookmark-app
npm install
npm run dev

🔐 Environment Variables

Create a .env.local file:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
