const PlaceholderPage = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in duration-500">
    <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
    <p className="text-gray-400 max-w-md">This page is currently a placeholder. Full implementation will be added in upcoming milestones.</p>
  </div>
);

export default PlaceholderPage;
