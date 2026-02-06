const Recomendation = () => {
    return (
        <div className="flex gap-3 flex-wrap">
            {Array.from({ length: 6 }).map(function (_, i) {
                return (
                    <div
                        key={i}
                        className="h-9 w-24 rounded-full bg-dark-4 animate-pulse"
                    />
                );
            })}
        </div>
    );
};

export default Recomendation;
