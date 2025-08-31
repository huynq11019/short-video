# Short Video Platform

This repository contains planning and documentation for building a TikTok-like short video web application using an Angular-based micro-frontend architecture powered by Supabase on the backend.

The documentation covers the product requirements, development plan, proposed technology stack, and monorepo project structure.

## Monorepo Structure

- `apps/host` – Angular host application configured with Webpack 5 Module Federation and Angular Router to load remote modules.
- `packages/ui-kit` – Shared Angular UI component library exposing a styled `Button` component.

## Documentation
- [Product Requirements and Technical Plan](docs/PRD.md)

## Status
Initial workspace setup with an Angular host and shared UI kit.
