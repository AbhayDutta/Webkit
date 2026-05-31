# Shipping Protection App

A production-ready MVP of a shipping protection web application (like Shipcheck) built with modern web technologies.

## 🚀 Features

- **Cart Management**: Add/remove products with dynamic protection pricing
- **Protection Pricing**: Intelligent fee calculation based on order total
- **Order System**: Complete order management with protection tracking
- **Claims Management**: Submit and track claims for protected orders
- **Admin Dashboard**: Real-time statistics and claim management
- **Modern UI**: Clean, responsive interface with Tailwind CSS

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## 📋 Protection Pricing Logic

- Orders < ₹1,000 → ₹20 protection fee
- Orders < ₹5,000 → ₹50 protection fee  
- Orders ≥ ₹5,000 → ₹100 protection fee

## 🗄 Database Schema

### Orders Table
- `id` (Primary Key)
- `userId` (Text)
- `totalAmount` (Decimal)
- `protectionEnabled` (Boolean)
- `protectionFee` (Decimal)
- `createdAt` (Timestamp)

### Claims Table
- `id` (Primary Key)
- `orderId` (Foreign Key)
- `reason` (Text)
- `imageUrl` (Text, Optional)
- `status` (Enum: pending/approved/rejected)
- `createdAt` (Timestamp)

## 🚀 Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/yourusername/shipguard.git
cd shipguard
npm install
```

### 2. Environment Setup

Copy the environment example file:

```bash
cp .env.example .env.local
```

Update `.env.local` with your actual values:

```env
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"
```

### 3. Database Setup

#### Using Neon PostgreSQL

1. Create a new Neon database at [neon.tech](https://neon.tech)
2. Copy the connection string to your `.env.local`
3. Run database migrations:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

#### Alternative: Local PostgreSQL

```bash
# Install PostgreSQL locally
# Create database
createdb shipping_protection

# Update DATABASE_URL in .env.local
DATABASE_URL="postgresql://localhost:5432/shipping_protection"

# Run migrations
npx drizzle-kit generate
npx drizzle-kit migrate
```

### 4. Run the Application

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── protect/       # Protection pricing
│   │   ├── orders/        # Order management
│   │   └── claims/        # Claims management
│   ├── cart/              # Cart page
│   ├── dashboard/         # Admin dashboard
│   └── claims/            # Claims page
├── components/
│   └── ui/                # Reusable UI components
├── lib/
│   ├── db.ts             # Database connection
│   ├── schema.ts         # Drizzle schema
│   └── utils.ts          # Utility functions
└── types/                 # TypeScript type definitions
```

## 🔗 API Endpoints

### Protection Pricing
- `POST /api/protect` - Calculate protection fee

### Orders
- `GET /api/orders` - Fetch all orders
- `POST /api/orders` - Create new order

### Claims
- `GET /api/claims` - Fetch all claims
- `POST /api/claims` - Submit new claim
- `PATCH /api/claims/[id]` - Update claim status

## 🎯 Usage Guide

### 1. Shopping Cart
- Navigate to `/cart`
- Add products to cart
- Toggle "Protect my order" to enable protection
- Protection fee is calculated automatically
- Proceed to checkout

### 2. Admin Dashboard
- Navigate to `/dashboard`
- View order statistics and revenue
- Manage claims (approve/reject)
- Monitor protection rates

### 3. Claims Management
- Navigate to `/claims`
- Submit claims for protected orders
- Upload evidence images
- Track claim status

## 🔧 Development Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database operations
npx drizzle-kit generate    # Generate migrations
npx drizzle-kit migrate     # Run migrations
npx drizzle-kit studio      # Database studio
```

## 🎨 UI Components

The application uses custom UI components built with Radix UI primitives:

- **Button**: Customizable button with variants
- **Card**: Container component for content sections
- **Switch**: Toggle for protection settings
- **Badge**: Status indicators and labels

## 🔒 Security Considerations

- Input validation on all API endpoints
- SQL injection prevention via Drizzle ORM
- CORS configuration for API routes
- Environment variable protection

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Monitoring

The application includes:
- Error logging on API endpoints
- Performance metrics in dashboard
- Real-time order and claim tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Check the [Issues](../../issues) page
- Review the documentation
- Contact the development team

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
