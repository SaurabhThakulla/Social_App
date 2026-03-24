type AdCardProps = {
    text?: string;
};

const AdCard = ({ text = "Sponsored Ad" }: AdCardProps) => {
    return (
        <div className="w-full mb-6 bg-dark-2 border border-dark-3 rounded-2xl p-5 text-center">
            <p className="text-sm text-gray-400 mb-2">Sponsored</p>
            <p className="text-lg font-semibold">{text}</p>
        </div>
    );
};

export default AdCard;