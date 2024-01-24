import React from 'react';

interface LoadingProps {
	text?: string;
}

const Loading: React.FC<LoadingProps> = ({ text = 'Loading... projects' }) => {
	return (
		<div className="flex items-center opacity-20 justify-center h-screen">
			<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
			<div className="ml-4 text-blue-500">{text}</div>
		</div>
	);
};

export default Loading;