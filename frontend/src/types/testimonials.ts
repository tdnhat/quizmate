// src/data/testimonials.ts
export interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    quote: string;
    avatar: string;
}

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Teacher",
        company: "Lincoln High School",
        quote: "QuizMate has transformed how I assess my students. Creating engaging quizzes is now quick and easy, and my students love the interactive format!",
        avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Sarah&backgroundColor=b6e3f4",
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Corporate Trainer",
        company: "TechGrowth Inc.",
        quote: "The analytics features help me identify knowledge gaps in my team. I can create targeted training materials based on quiz results, which has improved our overall performance.",
        avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Michael&backgroundColor=d1d4f9",
    },
    {
        id: 3,
        name: "Rebecca Martinez",
        role: "Professor",
        company: "State University",
        quote: "As someone who teaches large lecture classes, QuizMate allows me to quickly gauge student understanding and adjust my teaching accordingly. The AI-generated questions save me hours of work.",
        avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Rebecca&backgroundColor=c0aede",
    },
    {
        id: 4,
        name: "David Wilson",
        role: "eLearning Developer",
        company: "LearnFast Academy",
        quote: "We've integrated QuizMate into our online courses and have seen a 40% increase in student engagement. The platform is intuitive and the support team is incredibly helpful.",
        avatar: "https://api.dicebear.com/7.x/personas/svg?seed=David&backgroundColor=ffdfbf",
    },
    {
        id: 5,
        name: "Jasmine Patel",
        role: "School Administrator",
        company: "Oakridge Elementary",
        quote: "QuizMate has helped our entire school standardize assessments while making them more engaging. The reports give our teachers valuable insights into student progress.",
        avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Jasmine&backgroundColor=beebad",
    },
];
