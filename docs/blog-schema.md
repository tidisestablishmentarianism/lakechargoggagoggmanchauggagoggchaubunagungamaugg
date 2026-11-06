# Blog Schema & Architecture

## Overview
This document outlines the database schema, data models, and API route structure for a fully-featured blog implemented in the Next.js application [`app/page.tsx`](app/page.tsx:1).

---

## 1. Database Schema (Prisma / PostgreSQL or MongoDB style)

### User Model
- `id`: String (UUID / Primary Key)
- `name`: String
- `email`: String (Unique)
- `image`: String (URL)
- `role`: Enum (ADMIN, AUTHOR, READER)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Post Model
- `id`: String (UUID / Primary Key)
- `title`: String
- `slug`: String (Unique, URL-friendly)
- `content`: Text (Markdown / HTML)
- `excerpt`: String (Short summary)
- `published`: Boolean (Default: false)
- `coverImage`: String (URL)
- `authorId`: String (Foreign Key -> User.id)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Category Model
- `id`: String (UUID / Primary Key)
- `name`: String (Unique)
- `slug`: String (Unique)

### PostCategory (Many-to-Many Relationship)
- `postId`: String
- `categoryId`: String

### Comment Model
- `id`: String (UUID / Primary Key)
- `content`: Text
- `postId`: String (Foreign Key -> Post.id)
- `authorId`: String (Foreign Key -> User.id)
- `createdAt`: DateTime

---

## 2. Directory Structure for the Blog
```text
app/
├── blog/
│   ├── page.tsx                  # List of all blog posts
│   ├── [slug]/
│   │   └── page.tsx              # Single blog post detail view
│   └── category/
│       └── [slug]/
│           └── page.tsx          # Posts filtered by category
├── admin/
│   └── blog/
│       ├── page.tsx              # Dashboard to manage posts
│       ├── create/
│       │   └── page.tsx          # Create new post
│       └── edit/
│           └── [id]/
│               └── page.tsx      # Edit post
```

---

## 3. API Endpoints
- `GET /api/posts` - Retrieve paginated list of published posts
- `POST /api/posts` - Create a new post (Auth required)
- `GET /api/posts/[slug]` - Retrieve a single post details
- `PUT /api/posts/[id]` - Update an existing post (Auth required)
- `DELETE /api/posts/[id]` - Delete a post (Auth required)
- `POST /api/posts/[id]/comments` - Add a comment to a post
