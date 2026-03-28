const Loader = () => {
  return (
    <div className="!bg-transparent flex h-[8px] w-full items-center justify-center mt-[6px]">
      <div className="relative h-7 w-8">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full border-2 border-purple-500 opacity-30 animate-ping"></div>

        {/* Rotating ring */}
        <div className="absolute inset-0 rounded-full border-2 border-t-purple-500 border-r-blue-500 border-b-pink-500 border-l-transparent animate-spin"></div>

        {/* Center dot */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 shadow-md"></div>
      </div>
    </div>
  );
};

export default Loader;
