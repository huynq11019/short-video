# Short Video Platform – Product & Technical Plan

## 1. Goals & Vision
- Deliver a TikTok-like experience with endless vertical video feed.
- Allow rapid feature iterations through micro-frontend and microservice architecture.
- Optimize for SEO, performance, and content sharing.

## 2. Primary User Types
1. **Viewer** – browses the feed, interacts with videos, follows creators.
2. **Creator** – uploads and manages personal video content.
3. **Moderator/Admin** – reviews content, handles reports (later phase).

## 3. Core User Journeys
- **Viewer**: visit site → watch trending feed → scroll infinitely → interact → view creator profile.
- **Creator**: log in → upload or record video → add description/hashtag → publish → video appears in feed.
- **Admin**: log in → open moderation dashboard → approve/reject content.

## 4. Functional Requirements
| Feature | Description |
|---------|-------------|
| **Feed** | Infinite vertical list, auto play/pause based on viewport. |
| **Video Player** | Play/pause, mute, seek, fullscreen, show like/comment counts. |
| **Profile** | User info, avatar, list of published videos. |
| **Auth** | Register/login (email or OAuth), token management. |
| **Like & Comment** | Real‑time counts and comment lists. |
| **Upload** | Record or upload video, select thumbnail, enter description, add hashtags. |
| **Search/Discover** | Search by keyword/hashtag, trending list. |
| **Notifications/Chat** *(future)* | Notify user of interactions, direct messaging. |
| **Admin/Moderation** *(future)* | Report handling, content review dashboard. |

## 5. Non‑functional Requirements
- **SEO**: server-side rendering or pre-render; dynamic metadata; sitemaps.
- **Performance**: LCP < 2.5s, TTFB < 200ms, initial bundle < 200KB.
- **Availability**: SLA ≥ 99.5%, auto-scaling for traffic spikes.
- **Security**: HTTPS, JWT auth, protection against CSRF/XSS, rate limiting.
- **Accessibility**: WCAG 2.1 AA, captions and alt text.
- **Scalability**: microservice + micro-frontend with independent CI/CD.

## 6. Technology Stack
### 6.1 Frontend
- Angular 16 host shell using Webpack 5 Module Federation.
- Micro frontends can be written in Angular, React, Vue, or other frameworks and federated at runtime.
- Shared state via RxJS event bus or NgRx for Angular-based modules.
- TailwindCSS-based UI kit shared via `packages/ui-kit`.
- Player micro frontend leverages Tailwind CSS utility classes for layout and styling.
- SSR or pre-render using Angular Universal (or each microFE's native solution).
- Video playback using `hls.js` or `video.js`.

### 6.2 Backend
- Supabase provides managed Postgres database, authentication, storage, and real-time APIs.
- Node.js (NestJS) or Go services act as API gateway and domain logic, calling Supabase when possible.
- Redis for cache/session and CDN-backed object storage for video/thumbnail.
- Optional message broker (Kafka/RabbitMQ) and Elasticsearch/Meilisearch for advanced search and async processing.

### 6.3 DevOps & Observability
- Dockerized builds deployed to Kubernetes or serverless containers.
- CI/CD via GitHub Actions; each microFE/service built & deployed independently.
- Monitoring stack: Prometheus, Grafana, Sentry, Jaeger.

## 7. Project Structure

```
/
├─ apps/
│  ├─ host/        # Shell (Angular Universal)
│  ├─ feed/        # microFE for feed
│  ├─ player/      # microFE for video playback
│  ├─ profile/     # microFE for user profiles
│  ├─ auth/        # microFE for authentication
│  └─ ...          # other micro frontends
├─ packages/
│  ├─ ui-kit/      # shared UI components
│  ├─ shared-utils/# event bus, auth helpers
│  └─ api-client/  # SDK for backend API
├─ services/
│  ├─ gateway/     # API gateway
│  ├─ auth-service/
│  ├─ video-service/
│  ├─ feed-service/
│  └─ comment-service/
└─ docs/           # PRD, architecture, etc.
```

- **Host/Shell** – handles layout, routing, authentication context.
- **Feed** – renders infinite video list.
- **Video Player** – plays videos with controls.
- **Profile** – displays user info and their videos.
- **Auth** – login/register modals and token handling.
- **Comments/Reactions** – lists comments and handles likes.
- **Upload** – creator tools for posting videos.
- **Discover/Search** – trending content and hashtag search.
- **Notifications/Chat** – realtime updates and messaging (later).
- **Admin/Moderation** – content review (later).

Shared packages: `ui-kit`, `shared-utils`, `api-client`.

## 8. SEO Strategy
- **SSR/Pre-render** for public pages (home, feed, profiles, video detail).
- **Dynamic Metadata**: inject title, description, Open Graph, and Twitter tags.
- **Structured Data**: JSON-LD `VideoObject` with name, description, thumbnailUrl, uploadDate, contentUrl, embedUrl.
- **Sitemap & Robots**: serve `/sitemap.xml` listing video and profile URLs; `robots.txt` referencing sitemap and blocking private routes.
- **Performance**: lazy-load resources, CDN for static assets, gzip/brotli compression, track Core Web Vitals.
- **Progressive Enhancement**: basic HTML fallback when JS disabled.

## 9. Development Plan
### Phase 1 – Core Platform
- Set up monorepo with Angular host shell and Module Federation.
- Implement feed, basic video player, auth, profile.
- Integrate Supabase for authentication and data storage.
- Establish shared design system and event bus.

### Phase 2 – Interaction & SEO Enhancements
- Real-time like/comment via WebSocket or SSE.
- Video upload with basic moderation pipeline.
- SSR with dynamic metadata, sitemap generation, structured data.
- Performance tracking and tuning.

### Phase 3 – Expansion
- Search/discover with hashtag support.
- Notifications and chat.
- Admin dashboard and advanced moderation tools.
- Core Web Vitals optimization and A/B testing.

## 10. Next Steps
1. Finalize tech stack choices (confirm Angular host and Supabase backend).
2. Scaffold monorepo structure (`apps/`, `packages/`, `services/`, `docs/`).
3. Begin Phase 1 implementation starting with host shell and feed microFE.

