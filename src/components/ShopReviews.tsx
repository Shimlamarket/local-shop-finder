
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ShopReviews = ({ shopId, reviews, onAddReview }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    customerName: '',
    rating: 5,
    comment: ''
  });
  const { toast } = useToast();

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.customerName.trim() || !newReview.comment.trim()) {
      toast({
        title: "Please fill all fields",
        description: "Name and comment are required to submit a review.",
        variant: "destructive"
      });
      return;
    }

    onAddReview(newReview);
    setNewReview({ customerName: '', rating: 5, comment: '' });
    setShowReviewForm(false);
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Customer Reviews ({reviews.length})</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            {showReviewForm ? 'Cancel' : 'Write Review'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <Input
              placeholder="Your name"
              value={newReview.customerName}
              onChange={(e) => setNewReview(prev => ({ ...prev, customerName: e.target.value }))}
            />
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= newReview.rating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                    onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                  />
                ))}
              </div>
            </div>
            <Textarea
              placeholder="Write your review..."
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              rows={3}
            />
            <Button type="submit" className="w-full">Submit Review</Button>
          </form>
        )}

        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{review.customerName}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopReviews;
