# Supabase Setup

The project uses [Supabase](https://supabase.com) for authentication, database access, storage and real-time updates.  Below are the SQL commands and steps to configure a project.

## Database schema

```sql
-- Table for additional profile information.
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text,
  avatar_url text,
  created_at timestamp default now()
);

-- Videos uploaded by users.  `file_path` points to a file in the `videos` storage bucket.
create table videos (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  file_path text not null,
  created_at timestamp default now()
);

-- Comments on a video.
create table comments (
  id bigint generated always as identity primary key,
  video_id bigint references videos(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamp default now()
);

-- Likes for a video.  Duplicate likes are prevented with a unique constraint.
create table likes (
  id bigint generated always as identity primary key,
  video_id bigint references videos(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamp default now(),
  unique(video_id, user_id)
);
```

Enable the tables for real‑time features:

```sql
alter publication supabase_realtime add table likes;
alter publication supabase_realtime add table comments;
```

## Storage bucket

Create a bucket to store uploaded video files and make it public so videos can be served directly.

```bash
supabase storage buckets create videos --public
```

## Environment variables

Expose your project keys to the applications via environment variables:

```bash
export SUPABASE_URL=your-project-url
export SUPABASE_ANON_KEY=your-anon-key
```

These values are read by the shared `supabase` client in the front‑end apps.
