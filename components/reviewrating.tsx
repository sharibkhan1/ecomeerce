"use client";

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Review } from "@/lib/types";
import { useCurrentUser } from "@/hooks/use-current-user";
import { format } from "date-fns/format";

interface ReviewSectionProps {
  productId: string;
  existingReviews: Review[];
}

const ReviewRating: React.FC<ReviewSectionProps> = ({ productId, existingReviews }) => {
  const [reviews, setReviews] = useState<Review[]>(existingReviews);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [ratingDistribution, setRatingDistribution] = useState<number[]>([0, 0, 0, 0, 0]);

  const user = useCurrentUser();

  // Calculate the average rating and rating distribution
  useEffect(() => {
    const calculateAverageRating = () => {
      if (reviews.length === 0) return 0;
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      return totalRating / reviews.length;
    };

    const calculateRatingDistribution = () => {
      const distribution = [0, 0, 0, 0, 0];
      reviews.forEach((review) => {
        distribution[review.rating - 1]++;
      });
      return distribution;
    };

    setAverageRating(calculateAverageRating());
    setRatingDistribution(calculateRatingDistribution());
  }, [reviews]);

  const handleAddReview = async () => {
    if (newRating < 0 || newRating > 5) return alert("Rating must be between 0 and 5.");
    if (!user) {
      return alert("You must be logged in to submit a review.");
    }

    try {
      const response = await fetch(`/api/reviews`, {
        method: "POST",
        body: JSON.stringify({
          productId,
          userId: user.id,
          rating: newRating,
          comment: newComment,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const updatedReview = await response.json();
        setReviews([...reviews, updatedReview]);
        setNewRating(0);
        setNewComment("");
      }
    } catch (error) {
      console.error("Failed to add review:", error);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setReviews(reviews.filter((r) => r.id !== reviewId));
      }
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  // Helper function to render stars based on rating
  const renderStars = (rating: number, onClick?: (rating: number) => void) => {
    return (
      <div className="inline-flex text-yellow-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            fill={star <= rating ? "#FFA500" : "none"} // Filled stars for the rating, outlined for the rest
            color="#FFA500"
            stroke="#FFA500"
            size={24}
            onClick={() => onClick && onClick(star)} // When a star is clicked, update rating
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
    );
  };
  const handleStarClick = (rating: number) => {
    setNewRating(rating);
  };
  return (
    <div className="max-w-6xl mx-auto p-6 dark:bg-muted-foreground dark:shadow-white/30 bg-white rounded-lg shadow-md">
      <h3 className="text-3xl mt-6 font-bold text-gray-900">Customer Reviews</h3>
      <div className="font-semibold mt-4 mb-2 text-gray-900">
        <strong>Average Rating:</strong>
        <div className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          {renderStars(averageRating)}
          <span>({averageRating.toFixed(1)})</span>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-gray-50 dark:bg-black/80 p-4 rounded-lg mt-6 mb-8">
        <h4 className="text-lg font-semibold dark:text-muted-foreground mb-4">Rating</h4>
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-muted-foreground  w-14">{star} Stars</span>
            <div className="flex items-center justify-between gap-2 w-full">
  <div className="flex items-center gap-2">
    {renderStars(star)}
  </div>
  <span className="text-sm dark:text-muted-foreground text-gray-600">{ratingDistribution[star - 1]} reviews</span>
</div>
          </div>
        ))}
      </div>

      {user && <p className="text-xl text-gray-800">Welcome, {user.name}!</p>}
      {/* Review Form */}
      <div className="mt-8 border-b border-gray-200 pb-4 mb-8">
        <h4 className="text-xl font-semibold mb-4">Add Your Review</h4>
        <div className="flex gap-4 mb-4 dark:text-white">
        <div className="flex items-center gap-2">
            {/* Star rating selection */}
            {renderStars(newRating, handleStarClick)}
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Leave a comment"
            className="p-2 border dark:text-white border-gray-300 rounded-md w-full"
            rows={4}
          />
        </div>
        <button
          onClick={handleAddReview}
          className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
        >
          Submit Review
        </button>
      </div>
      {/* Reviews */}
      <div className="mt-4">
        {reviews.map((review) => (
          <div key={review.id} className="">
            <div className="flex items-center gap-2">
              <div>{renderStars(review.rating)}</div>
              <span className="text-lg dark:text-white text-gray-600">{review.comment || "No comment"}</span>
            </div>
            <div className="text-sm text-gray-800 mt-1">

              <span>Reviewed on {format(review.createdAt,"MMMM do, yyyy")}</span>
            </div>
            {user && user.id === review.userId && (
              <div className="mt-2">
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewRating;
