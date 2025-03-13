interface QuizDescriptionProps {
    description: string;
}

const QuizDescription = ({ description }: QuizDescriptionProps) => {
    return <div className="text-gray-700 text-lg">{description}</div>;
};

export default QuizDescription;
