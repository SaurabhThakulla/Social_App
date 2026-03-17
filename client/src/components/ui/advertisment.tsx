import { Button } from "./button";

function Advertisement() {
    return (
        <div className="border border-dark-4 bg-dark-3/50 rounded-2xl p-4">
            {/* Advertisement */}
            <h3 className="small-semibold mb-3">Advertisement</h3>

            <div className="rounded-xl bg-dark-4/60 h-28 mb-3 overflow-hidden">
                <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                    <img
                        src="https://dummyimage.com/300x120/2a2a2a/ffffff&text=Advertisement"
                        alt="Advertisement"
                        className="h-full w-full object-cover"
                    />
                </a>
            </div>

            <p className="text-xs text-light-4 mb-3">
                Promote your latest post or brand to reach more people.
            </p>

            <Button className="shad-button_primary w-full">
                Learn More
            </Button>
        </div>
    );
}

export default Advertisement;