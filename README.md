# Athathi (أثاثي) - RFQ Marketplace MVP

## Tech Stack
- **Frontend**: Next.js 15, TailwindCSS, Zod
- **Backend**: NestJS, Prisma, PostgreSQL, WebSocket
- **Payments**: Stripe

## Local Setup

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Environment Variables**
   - Copy `apps/api/.env.example` to `apps/api/.env` and fill in:
     - `DATABASE_URL` (Postgres connection string)
     - `JWT_SECRET`
     - `STRIPE_SECRET_KEY`
     - `STRIPE_WEBHOOK_SECRET`
   - Copy `apps/web/.env.example` to `apps/web/.env` and fill in:
     - `NEXT_PUBLIC_API_URL`

3. **Database**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

4. **Running the App**
   ```bash
   # Start all (Requires Docker)
   docker-compose up
   
   # Or run locally
   npm run api:dev
   npm run web:dev
   ```

## Key Workflows
- **Create RFQ**: Go to `/requests/create` (Client Role)
- **Browse Requests**: Go to `/dashboard` (Provider Role)
- **Chat**: Real-time chat enabled on Request Details page
- **Accept Offer**: Triggers Stripe Checkout

## Implementation Details
- **RBAC**: Handled via NestJS Guards (`@Roles(Role.CLIENT)`)
- **Validation**: Shared Zod schemas for DTO and Frontend forms
- **Storage**: Local adapter used by default, S3 compatible for production
