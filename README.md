# QuizMate

QuizMate is a modern, feature-rich quiz platform that enables users to create, share, and participate in interactive quizzes across various categories. The platform combines intuitive UI with advanced features like real-time multiplayer sessions and AI-powered quiz generation.

## 🌐 Live Demo

Try QuizMate now: [https://thankful-glacier-086d82100.6.azurestaticapps.net](https://thankful-glacier-086d82100.6.azurestaticapps.net)

## ✨ Key Features

### 🚀 Online Quiz Sessions
- Real-time multiplayer quiz competitions
- Live leaderboards and score tracking
- Interactive host controls for managing quiz flow
- Session-based joining with unique codes

<details>
<summary>View Screenshots</summary>

#### Session Creation and Joining
![Quiz session information with join code](https://res.cloudinary.com/dqnnkfprw/image/upload/v1745206804/Screenshot_2025-04-21_100414_fgaelf.png)
*Quiz session information with join code and URL for participants*

#### Participant Experience
![Participant answer screen](https://res.cloudinary.com/dqnnkfprw/image/upload/v1745206804/Screenshot_2025-04-21_101152_l73jc8.png)
*Participants answer questions and receive immediate feedback*

#### Live Standings
![Current standings between questions](https://res.cloudinary.com/dqnnkfprw/image/upload/v1745206804/Screenshot_2025-04-21_101207_gachgd.png)
*Live leaderboard showing rankings between questions*

#### Session Summary
![Quiz session summary](https://res.cloudinary.com/dqnnkfprw/image/upload/v1745206804/Screenshot_2025-04-21_101503_vyqffj.png)
*End-of-session summary with final results and statistics*
</details>

### 🤖 AI-Powered Quiz Generation
- Automatic quiz creation using LangChain and Google Gemini
- Customizable difficulty levels and question counts
- Topic-based quiz generation across all categories
- Optional explanations for educational purposes

<details>
<summary>View Screenshots</summary>

#### AI Quiz Generator
![AI-powered quiz generation](https://res.cloudinary.com/dqnnkfprw/image/upload/v1745206804/Screenshot_2025-04-21_102031_njjo3i.png)
*Generate complete quizzes with customizable settings using AI*

#### AI-Generated Questions Review
![Quiz creation form with AI-generated questions](https://res.cloudinary.com/dqnnkfprw/image/upload/v1745208297/Screenshot_2025-04-21_110438_v12qns.png)
*Review and edit AI-generated questions before publishing your quiz*
</details>

### 📝 Quiz Taking Experience
- Distraction-free quiz taking interface
- Time-limited assessments with countdown timer
- Comprehensive scoring and performance analytics
- Detailed results with answer explanations
- Flexible modes: exam mode or interactive sessions

<details>
<summary>View Screenshots</summary>

#### Taking a Quiz
![Taking a quiz in exam mode](https://res.cloudinary.com/dqnnkfprw/image/upload/v1745206804/Screenshot_2025-04-21_101706_lkr0cu.png)
*Focused quiz-taking interface with question navigation*

#### Quiz Results
![Quiz results page](https://res.cloudinary.com/dqnnkfprw/image/upload/v1745206804/Screenshot_2025-04-21_101733_szgia6.png)
*Comprehensive results showing score, answers, and explanations*
</details>

### 🗂️ Quiz Content & Discovery
- 20+ pre-defined categories spanning academic, professional, and entertainment topics
- Modern, responsive UI for seamless browsing and filtering
- Custom tagging system for enhanced searchability
- Trending and popular quiz recommendations
- Personal quiz library for saved content

<details>
<summary>View Screenshots</summary>

#### Category Selection
![Category selection interface](https://res.cloudinary.com/dqnnkfprw/image/upload/v1745206804/Screenshot_2025-04-21_103544_yzomii.png)
*Wide variety of categories covering academic, professional, and entertainment topics*
</details>

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

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
---

Made with ❤️ by [Nhat Truong](https://github.com/tdnhat)
