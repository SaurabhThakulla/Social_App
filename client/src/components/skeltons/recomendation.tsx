import { Button } from "../ui/button";

export const Recomendation = () => {
    return (
        <div>
            <h3 className="small-semibold mb-4">Recommendations</h3>

            <div className="flex gap-3 flex-wrap">
                {[...Array(4)].map(function (_, i) {
                    return (
                        <Button
                            key={i}
                            className="px-4 py-2 rounded-full small-medium transition bg-primary-500"
                        >
                            ..
                        </Button>
                    );
                })}
            </div>
        </div>
    );
};
