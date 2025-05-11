const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-15 w-15 border-t-2 border-b-2 border-special"></div>
    </div>
  );
};

export default LoadingSpinner;
