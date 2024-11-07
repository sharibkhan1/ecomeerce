"use client";

import React, { useState } from "react";
import { Product, Review } from "@/lib/types";
import { useCurrentUser } from "@/hooks/use-current-user";

interface ReviewSectionProps {
  productId: string;
  existingReviews: Review[];
}

const ReviewRating: React.FC<ReviewSectionProps> = ({ productId, existingReviews }) => {
  const [reviews, setReviews] = useState<Review[]>(existingReviews);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  // Fetch user data when component renders
    const user = useCurrentUser();
    
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

  const handleUpdateReview = async (reviewId: string, rating: number, comment: string) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        body: JSON.stringify({ rating, comment }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const updatedReview = await response.json();
        setReviews(reviews.map((r) => (r.id === reviewId ? updatedReview : r)));
      }
    } catch (error) {
      console.error("Failed to update review:", error);
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

  return (
    <div>
      <h3>Reviews</h3>
      {user && <p>Welcome, {user.name}!</p>} {/* Display current user's name */}
      {reviews.map((review) => (
        <div key={review.id} className="review">
          <div>
            <strong>Rating:</strong> {review.rating} / 5
          </div>
          <div>
            <strong>Comment:</strong> {review.comment || "No comment"}
          </div>
          {user && user.id === review.userId && (
            <div>
              <button onClick={() => handleUpdateReview(review.id, newRating, newComment)}>Edit</button>
              <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}

      <div>
        <h4>Add Your Review</h4>
        <input
          type="number"
          value={newRating}
          onChange={(e) => setNewRating(Number(e.target.value))}
          max={5}
          min={0}
          placeholder="Rating (0-5)"
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment"
        />
        <button onClick={handleAddReview}>Submit Review</button>
      </div>
    </div>
  );
};

export default ReviewRating;
