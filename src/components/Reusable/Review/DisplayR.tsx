import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

type Review = {
    id: string;
    Email: string;
    Name: string;
    Profession: string;
    Rating: number;
    Review: string;
    Picture?: string;
};

export default function ReviewsDisplay() {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch("/api/review/display");
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="space-y-6 mx-6 my-4">
            {reviews.map((review) => (
                <BackgroundGradient
                    key={review.id}
                    className="flex items-start space-x-4 p-4  bg-white rounded-md  "
                >
                    {/* Profile Picture */}
                    <div className="flex-shrink-0">
                        {review.Picture ? (
                            <Image
                                src={review.Picture}
                                alt={review.Name}
                                className="rounded-full object-cover"
                                width={48}
                                height={48}
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-lg">
                                {review.Name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    {/* Review Content */}
                    <div className="flex-1">
                        <h2 className="text-main text-lg font-semibold">
                            {review.Name}
                        </h2>
                        <div className="text-gray-500 text-xs">{review.Profession}</div>

                        {/* Stars for Rating */}
                        <div className="flex items-center mt-2">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill={index < review.Rating ? "gold" : "gray"}
                                    viewBox="0 0 24 24"
                                    stroke="none"
                                    className="w-5 h-5"
                                >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            ))}
                        </div>

                        {/* Review Text */}
                        <p className="mt-2 text-gray-700">{review.Review}</p>
                    </div>
                </BackgroundGradient>
            ))}
        </div>
    )
}