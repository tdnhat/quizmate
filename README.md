# QuizMate

QuizMate is a modern, feature-rich quiz platform that enables users to create, share, and participate in interactive quizzes across various categories. The platform combines intuitive UI with advanced features like real-time multiplayer sessions and AI-powered quiz generation.

## ✨ Key Features

### 🚀 Online Quiz Sessions
- Real-time multiplayer quiz competitions
- Live leaderboards and score tracking
- Interactive host controls for managing quiz flow
- Session-based joining with unique codes

### 📝 Exam Mode
- Distraction-free quiz taking experience
- Time-limited assessments
- Scoring and analytics for performance tracking
- Detailed results breakdown

### 🧩 Multi-Step Quiz Creation
- Intuitive step-by-step quiz building interface
- Image upload support for visual content
- Flexible scoring and timing options

### 🗂️ Diverse Categories
- 20+ pre-defined categories spanning academic, professional, and entertainment topics
- Custom tagging system for enhanced searchability
- Category-based browsing and filtering

### 🔍 Intuitive Quiz Discovery
- Modern, responsive UI for seamless navigation
- Advanced search and filter functionality
- Trending and popular quiz recommendations
- Saved quiz library for quick access

### 🤖 AI-Powered Quiz Generation
- Automatic quiz creation using LangChain and Google Gemini
- Customizable difficulty levels and question counts
- Topic-based quiz generation across all categories
- Optional explanations for educational purposes

## 🛠️ Technology Stack

### Backend
- ASP.NET Core 8.0 with C#
- Entity Framework Core
- PostgreSQL database
- SignalR for real-time communication
- JWT authentication

### AI Service
- Python with FastAPI
- LangChain for AI integration
- Google Gemini for content generation

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Azure Static Web Apps for hosting

## 📦 Installation

### Prerequisites
- .NET 8.0 SDK
- Node.js 18+
- PostgreSQL database
- Python 3.10+ (for AI service)

### Setup Frontend
```bash
# Clone the repository
git clone https://github.com/tdnhat/quizmate.git

# Navigate to frontend directory
cd quizmate/frontend

# Install dependencies
npm install

# Run the frontend
npm run dev
```

### Setup Backend
```bash
# Navigate to backend directory
cd quizmate/backend/QuizMate.Api

# Restore dependencies
dotnet restore

# Configure database connection in appsettings.json
# Then run migrations
dotnet ef database update

# Run the backend
dotnet run
```

### Setup AI Service
```bash
# Clone the repository
git clone https://github.com/tdnhat/quizmate-ai-service.git
cd quizmate-ai-service

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure API keys in .env file
# Then run the service
uvicorn app.main:app --reload
```

## 📸 Screenshots

*[Screenshots will be added here showcasing the key features of the application]*

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
---

Made with ❤️ by [Nhat Truong](https://github.com/yourusername)
