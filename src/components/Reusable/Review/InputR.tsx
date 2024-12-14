import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";

export default function ReviewForm() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [profession, setProfession] = useState("");
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [hoverRating, setHoverRating] = useState(0);
    const { toast } = useToast();
    let route = useRouter();
    const handleStarClick = (value: number) => setRating(value);
    const handleStarHover = (value: number) => setHoverRating(value);
    const handleStarHoverOut = () => setHoverRating(0);

    const handleButtonClick = () => {
        if (!session) {
            toast({
                variant: "destructive",
                title: "Login Required",
                description: "Please login to add a review",
            });
            return;
        }
        setIsOpen(!isOpen);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!rating || !review || !profession) {
            toast({
                variant: "default",
                className: "bg-main text-white",
                title: "Please fill in all fields and provide a rating.",
            });
            setIsOpen(false);
            return;
        }

        try {
            const response = await fetch("/api/review/store", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Email: session?.Student?.Email,
                    Name: session?.Student.Name,
                    Picture: session?.Student.Image,
                    Profession: profession,
                    Rating: rating,
                    Review: review,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast({
                    variant: "default",
                    className: "bg-main text-white",
                    title: "Review submitted successfully!",
                });

                // Clear form
                setProfession("");
                setRating(0);
                setReview("");
                setHoverRating(0);
                setIsOpen(false);

                // Reload window
                window.location.reload();
            } else {
                // Handle API error (like duplicate email)
                toast({
                    variant: "destructive",
                    title: data.error || "Uh oh! Something went wrong.",
                    description: data.error || "Please try again.",
                });
                setIsOpen(false);
            }

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Error submitting review. Please try again.",
            });
            setIsOpen(false);
            route.push("/");
        }
    };


    return (
        <section className="p-4 bg-white">
            {/* Button to open form */}
            <div className="flex flex-col md:flex-row items-left  md:justify-between">
                <div className="">
                    <h1 className="text-2xl font-semibold font-sans text-left text-main mb-1">Add Your Options for Our Website</h1>
                    <p className=" text-gray-600 font-mono text-left mb-2">Your review is precious to us and helps improve our services!</p>
                    <div />


                    </div>
                    <Button onClick={handleButtonClick} className="mb-4 bg-main text-white">
                        {isOpen ? "Close Review Form" : "Write a Review"}
                    </Button>
                </div>
                {/* Review form */}
                {isOpen && (
                    <>
                        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fade-in" />
                        <div className="fixed top-[40%] left-[35%] md:left-[45%] transform -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-40px)] max-w-2xl m-20 animate-slide-up">
                            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 relative">
                                {/* Close Button */}
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* Form Heading */}
                                <h2 className="text-2xl font-bold text-center mb-6 text-main">Write Your Review</h2>

                                {/* Email (Read-only) */}
                                <Label htmlFor="Email" className="block text-gray-700 font-semibold">Email</Label>
                                <Input
                                    id="Email"
                                    name="Email"
                                    value={session?.Student?.Email || ""}
                                    readOnly
                                    className="w-full border-main mt-2 p-2 border rounded focus:outline-none focus:border-main"
                                />

                                {/* Name (Read-only) */}
                                <Label htmlFor="Name" className="block text-gray-700 font-semibold mt-4">Name</Label>
                                <Input
                                    id="Name"
                                    name="Name"
                                    value={session?.Student?.Name || ""}
                                    readOnly
                                    className="w-full border-main mt-2 p-2 border rounded focus:outline-none focus:border-main"
                                />

                                {/* Profession */}
                                <Label htmlFor="Profession" className="block text-gray-700 font-semibold mt-4">Profession</Label>
                                <Input
                                    id="Profession"
                                    name="Profession"
                                    value={profession}
                                    onChange={(e) => setProfession(e.target.value)}
                                    className="w-full border-main mt-2 p-2 border rounded focus:outline-none focus:border-main"
                                />

                                {/* Rating */}
                                <Label htmlFor="Rating" className="block text-gray-700 font-semibold mt-4">Rating</Label>
                                <div id="Rating" className="flex mt-2 space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            onClick={() => handleStarClick(star)}
                                            onMouseEnter={() => handleStarHover(star)}
                                            onMouseLeave={handleStarHoverOut}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill={star <= (hoverRating || rating) ? "yellow" : "gray"}
                                            className="w-6 h-6 cursor-pointer"
                                        >
                                            <path d="M12 2.25l3.094 6.26 6.906 1.008-5 4.867 1.178 6.87L12 17.75l-6.178 3.255L6.997 14.5l-5-4.867 6.906-1.008L12 2.25z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Review */}
                                <Label htmlFor="Review" className="block text-gray-700 font-semibold mt-4">Review</Label>

                                <Input
                                    id="Review"
                                    name="Review"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    className="w-full border-main mt-2 p-2 border rounded focus:outline-none focus:border-main"
                                />
                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <Button type="submit" className="mt-6 bg-main text-white">
                                        Submit Review
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
        </section>
    );
}