const Loading = () => {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col items-center justify-center text-center px-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gradientLeft border-solid mb-4" />
      <p className="text-lg text-gray-700 font-medium">Cargando...</p>
    </div>
  );
};

export default Loading;
