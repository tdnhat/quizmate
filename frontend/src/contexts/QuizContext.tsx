import { Quiz } from "@/types/quiz";
import { ReactNode, createContext, useEffect, useState } from "react";

const DEFAULT_QUIZZES: Quiz[] = [
    {
        id: "web-dev-basics",
        title: "Web Development Fundamentals",
        description: "Test your knowledge of HTML, CSS and JavaScript basics",
        author: {
            name: "Sarah Johnson",
            avatar: "/avatars/sarah.jpg",
        },
        thumbnail: "/quizzes/web-development.jpg",
        timeMinutes: 15,
        questionCount: 20,
        difficulty: "Beginner",
        rating: 4.8,
        tags: ["Web", "HTML", "CSS", "JavaScript"],
        completions: 1245,
    },
    {
        id: "python-intermediate",
        title: "Python Programming: Beyond the Basics",
        description: "Challenge yourself with intermediate Python concepts",
        author: {
            name: "Michael Chen",
            avatar: "/avatars/michael.jpg",
        },
        thumbnail: "/quizzes/python.jpg",
        timeMinutes: 25,
        questionCount: 15,
        difficulty: "Intermediate",
        rating: 4.6,
        tags: ["Python", "Programming", "Data Structures"],
        completions: 890,
    },
    {
        id: "data-science-ml",
        title: "Introduction to Machine Learning",
        description: "Learn the fundamentals of machine learning algorithms",
        author: {
            name: "Alex Rodriguez",
            avatar: "/avatars/alex.jpg",
        },
        thumbnail: "/quizzes/machine-learning.jpg",
        timeMinutes: 30,
        questionCount: 25,
        difficulty: "Advanced",
        rating: 4.9,
        tags: ["Data Science", "Machine Learning", "AI"],
        completions: 678,
    },
    {
        id: "uiux-design",
        title: "UI/UX Design Principles",
        description:
            "Test your knowledge about user interface and experience design",
        author: {
            name: "Emma Wilson",
            avatar: "/avatars/emma.jpg",
        },
        thumbnail: "/quizzes/uiux-design.jpg",
        timeMinutes: 20,
        questionCount: 18,
        difficulty: "Intermediate",
        rating: 4.7,
        tags: ["Design", "UI", "UX", "User Research"],
        completions: 532,
    },
    {
        id: "javascript-advanced",
        title: "Advanced JavaScript Concepts",
        description: "Challenge yourself with advanced JavaScript topics",
        author: {
            name: "Chris Lee",
            avatar: "/avatars/chris.jpg",
        },
        thumbnail: "/quizzes/javascript.jpg",
        timeMinutes: 35,
        questionCount: 20,
        difficulty: "Advanced",
        rating: 4.8,
        tags: ["JavaScript", "ES6", "Functional Programming"],
        completions: 456,
    },
];

interface QuizContextType {
    quizzes: Quiz[];
    isLoading: boolean;
    error: string | null;
    refreshQuizzes: () => Promise<void>;
}

export const QuizContext = createContext<QuizContextType>({
    quizzes: [],
    isLoading: false,
    error: null,
    refreshQuizzes: async () => {},
});

interface QuizProviderProps {
    children: ReactNode;
}

export const QuizProvider = ({ children }: QuizProviderProps) => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchQuizzes = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // const response = await api.get('/api/quizzes');
            // const data = response.data;
            // setQuizzes(data);

            await new Promise((resolve) => setTimeout(resolve, 1000));
            setQuizzes(DEFAULT_QUIZZES);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
            setError("An error occurred while fetching quizzes");
        } finally {
            setIsLoading(false);
        }
    };

    // Load quizzes on initial mount
    useEffect(() => {
        fetchQuizzes();
    }, []);

    const refreshQuizzes = async () => {
        await fetchQuizzes();
    };

    return (
        <QuizContext.Provider
            value={{ quizzes, isLoading, error, refreshQuizzes }}
        >
            {children}
        </QuizContext.Provider>
    );
};
