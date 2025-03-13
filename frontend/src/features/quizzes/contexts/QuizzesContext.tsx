import { Quiz } from "@/types/quiz";
import { ReactNode, createContext, useEffect, useState } from "react";

const DEFAULT_QUIZZES: Quiz[] = [
    {
        id: "web-dev-basics",
        title: "Web Development Fundamentals",
        description: "Test your knowledge of HTML, CSS and JavaScript basics",
        author: {
            id: "sarah-johnson",
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
        questions: [
            {
                id: "q1-web-dev",
                quizId: "web-dev-basics",
                text: "What does HTML stand for?",
                type: "multiple-choice",
                points: 10,
                answers: [
                    {
                        id: "a1-q1-web",
                        text: "Hyper Text Markup Language",
                        isCorrect: true,
                        explanation:
                            "HTML is the standard markup language for creating web pages.",
                    },
                    {
                        id: "a2-q1-web",
                        text: "High Tech Machine Learning",
                        isCorrect: false,
                    },
                    {
                        id: "a3-q1-web",
                        text: "Hyper Transfer Markup Language",
                        isCorrect: false,
                    },
                    {
                        id: "a4-q1-web",
                        text: "Hyperlink Text Management Language",
                        isCorrect: false,
                    },
                ],
                explanation:
                    "HTML (Hyper Text Markup Language) is the standard markup language for documents designed to be displayed in a web browser.",
            },
            {
                id: "q2-web-dev",
                quizId: "web-dev-basics",
                text: "Which property is used to change the background color in CSS?",
                type: "multiple-choice",
                points: 10,
                answers: [
                    {
                        id: "a1-q2-web",
                        text: "color",
                        isCorrect: false,
                    },
                    {
                        id: "a2-q2-web",
                        text: "bgcolor",
                        isCorrect: false,
                    },
                    {
                        id: "a3-q2-web",
                        text: "background-color",
                        isCorrect: true,
                        explanation:
                            "background-color is the CSS property used to set the background color of an element.",
                    },
                    {
                        id: "a4-q2-web",
                        text: "background",
                        isCorrect: false,
                    },
                ],
                explanation:
                    "The background-color property sets the background color of an element.",
            },
        ],
    },
    {
        id: "python-intermediate",
        title: "Python Programming: Beyond the Basics",
        description: "Challenge yourself with intermediate Python concepts",
        author: {
            id: "michael-chen",
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
        questions: [
            {
                id: "q1-python",
                quizId: "python-intermediate",
                text: "Which of the following is not a built-in data structure in Python?",
                type: "multiple-choice",
                points: 15,
                answers: [
                    {
                        id: "a1-q1-py",
                        text: "List",
                        isCorrect: false,
                    },
                    {
                        id: "a2-q1-py",
                        text: "Dictionary",
                        isCorrect: false,
                    },
                    {
                        id: "a3-q1-py",
                        text: "Tuple",
                        isCorrect: false,
                    },
                    {
                        id: "a4-q1-py",
                        text: "LinkedList",
                        isCorrect: true,
                        explanation:
                            "LinkedList is not a built-in data structure in Python, while Lists, Dictionaries, and Tuples are.",
                    },
                ],
                explanation:
                    "Python has several built-in data structures including List, Dictionary, Tuple, and Set, but LinkedList is not one of them.",
            },
            {
                id: "q2-python",
                quizId: "python-intermediate",
                text: "What does the 'self' keyword represent in a Python class?",
                type: "multiple-choice",
                points: 15,
                image: "/images/python-class-diagram.png",
                answers: [
                    {
                        id: "a1-q2-py",
                        text: "The class itself",
                        isCorrect: false,
                    },
                    {
                        id: "a2-q2-py",
                        text: "The instance of the class",
                        isCorrect: true,
                        explanation:
                            "In Python, 'self' represents the instance of the class and is used to access variables and methods of the class.",
                    },
                    {
                        id: "a3-q2-py",
                        text: "A reserved keyword for future use",
                        isCorrect: false,
                    },
                    {
                        id: "a4-q2-py",
                        text: "The parent class",
                        isCorrect: false,
                    },
                ],
            },
        ],
    },
    {
        id: "data-science-ml",
        title: "Introduction to Machine Learning",
        description: "Learn the fundamentals of machine learning algorithms",
        author: {
            id: "alex-rodriguez",
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
        questions: [
            {
                id: "q1-ml",
                quizId: "data-science-ml",
                text: "Which of the following is a supervised learning algorithm?",
                type: "multiple-choice",
                points: 20,
                answers: [
                    {
                        id: "a1-q1-ml",
                        text: "K-means clustering",
                        isCorrect: false,
                    },
                    {
                        id: "a2-q1-ml",
                        text: "Principal Component Analysis",
                        isCorrect: false,
                    },
                    {
                        id: "a3-q1-ml",
                        text: "Linear Regression",
                        isCorrect: true,
                        explanation:
                            "Linear Regression is a supervised learning algorithm used for predicting a continuous outcome variable.",
                    },
                    {
                        id: "a4-q1-ml",
                        text: "Autoencoders",
                        isCorrect: false,
                    },
                ],
                explanation:
                    "Supervised learning algorithms learn from labeled training data, while unsupervised algorithms find patterns in unlabeled data.",
            },
            {
                id: "q2-ml",
                quizId: "data-science-ml",
                text: "What is 'overfitting' in machine learning?",
                type: "multiple-choice",
                points: 20,
                image: "/images/overfitting-diagram.png",
                answers: [
                    {
                        id: "a1-q2-ml",
                        text: "When a model performs poorly on training data",
                        isCorrect: false,
                    },
                    {
                        id: "a2-q2-ml",
                        text: "When a model works well on all datasets",
                        isCorrect: false,
                    },
                    {
                        id: "a3-q2-ml",
                        text: "When a model performs well on training data but poorly on new data",
                        isCorrect: true,
                        explanation:
                            "Overfitting occurs when a model learns the training data too well, including its noise and outliers.",
                    },
                    {
                        id: "a4-q2-ml",
                        text: "When training takes too much time",
                        isCorrect: false,
                    },
                ],
                explanation:
                    "Overfitting happens when a model learns the detail and noise in the training data to the extent that it negatively impacts the performance on new data.",
            },
        ],
    },
    {
        id: "uiux-design",
        title: "UI/UX Design Principles",
        description:
            "Test your knowledge about user interface and experience design",
        author: {
            id: "emma-wilson",
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
        questions: [
            {
                id: "q1-uiux",
                quizId: "uiux-design",
                text: "What does the acronym 'UX' stand for?",
                type: "multiple-choice",
                points: 10,
                answers: [
                    {
                        id: "a1-q1-uiux",
                        text: "User Expertise",
                        isCorrect: false,
                    },
                    {
                        id: "a2-q1-uiux",
                        text: "User Extension",
                        isCorrect: false,
                    },
                    {
                        id: "a3-q1-uiux",
                        text: "User Experience",
                        isCorrect: true,
                        explanation:
                            "UX stands for User Experience, which refers to how a person feels when interacting with a system.",
                    },
                    {
                        id: "a4-q1-uiux",
                        text: "User Examination",
                        isCorrect: false,
                    },
                ],
            },
            {
                id: "q2-uiux",
                quizId: "uiux-design",
                text: "What is a wireframe in UX design?",
                type: "multiple-choice",
                points: 15,
                image: "/images/wireframe-example.png",
                answers: [
                    {
                        id: "a1-q2-uiux",
                        text: "A fully designed mockup with colors and images",
                        isCorrect: false,
                    },
                    {
                        id: "a2-q2-uiux",
                        text: "A basic layout that outlines the structure of a page",
                        isCorrect: true,
                        explanation:
                            "Wireframes are simplified visual representations of a page's layout, showing content and functionality.",
                    },
                    {
                        id: "a3-q2-uiux",
                        text: "A development framework for frontend code",
                        isCorrect: false,
                    },
                    {
                        id: "a4-q2-uiux",
                        text: "A network diagram showing user flows",
                        isCorrect: false,
                    },
                ],
                explanation:
                    "Wireframes are skeletal outlines that establish the basic structure of a page before visual design and content are added.",
            },
        ],
    },
    {
        id: "javascript-advanced",
        title: "Advanced JavaScript Concepts",
        description: "Challenge yourself with advanced JavaScript topics",
        author: {
            id: "chris-lee",
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
        questions: [
            {
                id: "q1-js",
                quizId: "javascript-advanced",
                text: "What is a closure in JavaScript?",
                type: "multiple-choice",
                points: 25,
                answers: [
                    {
                        id: "a1-q1-js",
                        text: "A way to close browser windows using JavaScript",
                        isCorrect: false,
                    },
                    {
                        id: "a2-q1-js",
                        text: "A function bundled with references to its surrounding state",
                        isCorrect: true,
                        explanation:
                            "A closure is the combination of a function and the lexical environment within which that function was declared.",
                    },
                    {
                        id: "a3-q1-js",
                        text: "A method to close database connections",
                        isCorrect: false,
                    },
                    {
                        id: "a4-q1-js",
                        text: "A design pattern for object creation",
                        isCorrect: false,
                    },
                ],
                explanation:
                    "A closure gives you access to an outer function's scope from an inner function, even after the outer function has returned.",
            },
            {
                id: "q2-js",
                quizId: "javascript-advanced",
                text: "Which of the following is NOT a JavaScript promise state?",
                type: "multiple-choice",
                points: 20,
                answers: [
                    {
                        id: "a1-q2-js",
                        text: "Pending",
                        isCorrect: false,
                    },
                    {
                        id: "a2-q2-js",
                        text: "Fulfilled",
                        isCorrect: false,
                    },
                    {
                        id: "a3-q2-js",
                        text: "Rejected",
                        isCorrect: false,
                    },
                    {
                        id: "a4-q2-js",
                        text: "Cancelled",
                        isCorrect: true,
                        explanation:
                            "JavaScript promises have three states: pending, fulfilled, and rejected. There is no 'cancelled' state.",
                    },
                ],
                explanation:
                    "A Promise in JavaScript represents a value that may not be available yet. It can be in one of three states: pending, fulfilled, or rejected.",
            },
        ],
    },
];

interface QuizzesContextType {
    quizzes: Quiz[];
    isLoading: boolean;
    error: string | null;
    refreshQuizzes: () => Promise<void>;
}

export const QuizzesContext = createContext<QuizzesContextType>({
    quizzes: [],
    isLoading: false,
    error: null,
    refreshQuizzes: async () => {},
});

interface QuizzesProviderProps {
    children: ReactNode;
}

export const QuizzesProvider = ({ children }: QuizzesProviderProps) => {
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
        <QuizzesContext.Provider
            value={{ quizzes, isLoading, error, refreshQuizzes }}
        >
            {children}
        </QuizzesContext.Provider>
    );
};
