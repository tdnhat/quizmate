import React from 'react';

interface LibraryHeaderProps {
  title?: string;
  description?: string;
}

const LibraryHeader = ({
  title = "My Library",
  description = "Here you can find all the quizzes you have saved."
}: LibraryHeaderProps) => {
  return (
    <div className="flex flex-col mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default LibraryHeader; 