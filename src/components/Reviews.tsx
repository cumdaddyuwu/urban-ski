import React, { useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { LeaveReview } from './LeaveReview';

interface Review {
  name: string;
  date: string;
  rating: number;
  text: string;
  location: string;
}

const initialReviews: Review[] = [
  {
    name: "Sarah Mitchell",
    date: "March 15, 2024",
    rating: 5,
    text: "The Midnight bag is absolutely stunning! The quality is exceptional, and it perfectly complements both casual and formal outfits.",
    location: "New York, NY"
  },
  {
    name: "Emma Thompson",
    date: "March 12, 2024",
    rating: 5,
    text: "I purchased the Pearl bag and I'm in love! The craftsmanship is impeccable, and it's exactly what I was looking for. Will definitely be purchasing more colors.",
    location: "Los Angeles, CA"
  },
  {
    name: "Jessica Chen",
    date: "March 10, 2024",
    rating: 5,
    text: "The Amber bag exceeded my expectations. The color is rich and beautiful, and the size is perfect for everyday use. Highly recommend!",
    location: "Chicago, IL"
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating ? 'text-[#007bff] fill-[#007bff]' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleNewReview = (review: Omit<Review, 'date'>) => {
    const newReview = {
      ...review,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-[#007bff] text-white px-6 py-2 rounded-lg hover:bg-[#0056b3] transition-colors"
          >
            {showReviewForm ? 'Close' : 'Write a Review'}
          </button>
        </div>

        {showReviewForm && (
          <div className="mb-12">
            <LeaveReview onSubmit={handleNewReview} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-200" />
              <div className="mb-4">
                <StarRating rating={review.rating} />
              </div>
              <p className="text-gray-600 mb-4 italic">"{review.text}"</p>
              <div className="mt-4">
                <p className="font-semibold text-gray-900">{review.name}</p>
                <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                  <span>{review.location}</span>
                  <span>{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}