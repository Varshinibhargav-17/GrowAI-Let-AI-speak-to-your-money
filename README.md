# GrowAI - AI-Powered Financial Advisor

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.18.0-green)](https://www.mongodb.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-2.0--flash--lite-orange)](https://ai.google.dev/)

A comprehensive AI-powered financial management platform that provides personalized financial insights, tax planning, and intelligent nudges based on user profiles and bank account data.

## 🚀 Features

### Core Functionality
- **Personalized Financial Profiles**: Create detailed financial profiles for different life stages (Young Professional, Established Investor, Retirement Focused)
- **Bank Account Integration**: Simulate secure connection to multiple Indian banks (HDFC, ICICI, SBI, Axis)
- **Dynamic Data Generation**: AI-generated realistic financial data based on user inputs and profile types
- **Real-time Dashboard**: Comprehensive financial overview with interactive charts and metrics

### AI-Powered Features
- **Intelligent Chat Assistant**: Conversational AI using Google Gemini 2.0 Flash-Lite for personalized financial advice
- **Smart Nudges**: Rule-based and AI-generated recommendations for financial optimization
- **Tax Planning**: Automated tax estimation based on Indian tax slabs with quarterly payment tracking
- **Expense Analysis**: Detailed breakdown of spending patterns with actionable insights

> **Note**: The application uses Gemini 2.0 Flash-Lite (free tier) which has rate limits and response length restrictions. For enhanced functionality, consider upgrading to a paid Gemini model for better performance and higher limits.

### Security & Privacy
- **Secure Authentication**: NextAuth.js integration with multiple providers
- **Data Encryption**: Secure storage of financial data in MongoDB
- **Read-Only Access**: Simulated bank connections with no real data storage
- **Privacy-First**: User data used only for personalized insights

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.12
- **UI Components**: Lucide React icons, Framer Motion animations
- **Charts**: Recharts for data visualization

### Backend
- **Database**: MongoDB 8.18.0 with Mongoose ODM
- **Authentication**: NextAuth.js 4.24.11
- **AI Integration**: Google Generative AI (Gemini 2.0 Flash)
- **Password Hashing**: bcryptjs

### Development Tools
- **Linting**: ESLint 9 with Next.js configuration
- **Build Tools**: PostCSS, Autoprefixer
- **Package Manager**: npm



## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB database (local or cloud)
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GrowAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/growai

   # Authentication
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000

   # AI Integration
   GEMINI_API_KEY=your-gemini-api-key
   ```

4. **Database Setup**
   Ensure MongoDB is running and accessible at the specified URI.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `NEXTAUTH_SECRET`: Secret key for NextAuth.js session encryption
- `NEXTAUTH_URL`: Base URL for authentication callbacks
- `GEMINI_API_KEY`: Google Gemini API key for AI features

### Database Models
The application uses a single User model with the following key fields:
- `email`: User email (unique)
- `password`: Hashed password
- `financialProfileType`: Profile type (young_professional, established_investor, retirement_focused)
- `financialData`: Generated financial data object
- `selectedBanks`: Array of connected bank names
- `accountDetails`: Bank account information

## 🎯 Usage

### User Journey
1. **Sign Up**: Create account with email and password
2. **Profile Setup**: Choose financial profile type and fill details
3. **Bank Connection**: Select and configure bank accounts
4. **Dashboard**: View personalized financial insights
5. **AI Chat**: Get personalized financial advice
6. **Tax Planning**: Review tax estimates and planning
7. **Smart Nudges**: Receive actionable financial recommendations

### Key Features Usage
- **Dynamic Data**: All financial data is generated based on user inputs, not static templates
- **AI Personalization**: Chat and nudges use actual financial numbers for relevant advice
- **Tax Calculation**: Automatic tax computation based on Indian tax slabs
- **Security Simulation**: Bank connections are simulated for demonstration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 🙏 Acknowledgments

- Google Gemini AI for conversational AI capabilities
- Next.js team for the excellent React framework
- MongoDB for reliable database solutions
- Tailwind CSS for utility-first styling
