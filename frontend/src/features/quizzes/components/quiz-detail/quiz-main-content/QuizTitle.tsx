interface QuizTitleProps {
    title: string;
}

const QuizTitle = ({ title }: QuizTitleProps) => {
  return (
    <div className="text-3xl font-bold text-cyan-600 mt-4 mb-2">
        {title}
    </div>
  )
}

export default QuizTitle