import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Star, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface GoogleReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GooglePlaceDetails {
  place_id: string;
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
  url: string;
}

interface GoogleReviewsData {
  success: boolean;
  data: GooglePlaceDetails;
}

// Google logo SVG component
const GoogleLogo = ({ className = "w-20 h-8" }) => (
  <svg className={className} viewBox="0 0 272 92" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M115.75 47.18C115.75 45.48 115.61 43.81 115.35 42.18H87.26V51.85H102.87C102.14 55.63 100.11 58.91 96.95 61.23V67.46H106.68C112.68 62.06 115.75 55.37 115.75 47.18Z" fill="#4285F4"/>
    <path d="M87.26 73.43C94.84 73.43 101.2 70.87 106.68 67.46L96.95 61.23C94.28 63.02 90.82 64.08 87.26 64.08C79.98 64.08 73.81 58.63 71.47 51.41H61.44V57.83C66.88 68.68 76.42 73.43 87.26 73.43Z" fill="#34A853"/>
    <path d="M71.47 51.41C70.85 49.62 70.5 47.71 70.5 45.76C70.5 43.81 70.85 41.9 71.47 40.11V33.69H61.44C59.37 37.83 58.26 42.61 58.26 47.76C58.26 52.91 59.37 57.69 61.44 61.83L71.47 51.41Z" fill="#FBBC04"/>
    <path d="M87.26 27.44C91.19 27.44 94.74 28.87 97.53 31.55L106.23 22.85C101.13 18.08 94.77 15.52 87.26 15.52C76.42 15.52 66.88 20.27 61.44 31.12L71.47 37.54C73.81 30.32 79.98 24.87 87.26 24.87V27.44Z" fill="#EA4335"/>
    <path d="M40.02 27.2C40.02 25.23 40.7 23.43 41.84 22.07L33.87 16.15C31.35 19.86 29.87 24.34 29.87 29.2C29.87 34.06 31.35 38.54 33.87 42.25L41.84 36.33C40.7 34.97 40.02 33.17 40.02 31.2V27.2Z" fill="#4285F4"/>
  </svg>
);

// Star rating component
const StarRating = ({ rating, className = "" }: { rating: number; className?: string }) => {
  return (
    <div className={`flex items-center ${className}`} style={{ position: 'relative', zIndex: 20 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
          style={{ position: 'relative', zIndex: 20 }}
        />
      ))}
    </div>
  );
};

export function GoogleReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isLoading, error } = useQuery<GoogleReviewsData>({
    queryKey: ['/api/google-reviews'],
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  // Auto-advance carousel
  useEffect(() => {
    if (!data?.data?.reviews?.length) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.data.reviews.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [data?.data?.reviews?.length]);

  const nextSlide = () => {
    if (data?.data?.reviews?.length) {
      setCurrentIndex((prev) => (prev + 1) % data.data.reviews.length);
    }
  };

  const prevSlide = () => {
    if (data?.data?.reviews?.length) {
      setCurrentIndex((prev) => (prev - 1 + data.data.reviews.length) % data.data.reviews.length);
    }
  };

  if (isLoading) {
    return (
      <section id="bewertungen" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-serif text-gray-900 mb-8">
              So <span className="gold-accent">blitzeblank</span> arbeiten wir
            </h2>
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data?.success || !data?.data?.reviews?.length) {
    return (
      <section id="bewertungen" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center">
            <h2 className="text-5xl lg:text-6xl font-serif text-gray-900 mb-8">
              So <span className="gold-accent">blitzeblank</span> arbeiten wir
            </h2>
            <p className="text-gray-600">Google-Bewertungen werden geladen...</p>
          </div>
        </div>
      </section>
    );
  }

  const { reviews, rating, user_ratings_total, name, url } = data.data;

  return (
    <section id="bewertungen" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-serif text-gray-900 mb-8 sparkle-effect">
            So <span className="gold-accent">blitzeblank</span> arbeiten wir
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Echte Google-Bewertungen von unseren zufriedenen Kunden aus Moers und Umgebung
          </p>
        </div>



        {/* Reviews Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-900 rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300"
            size="sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <Button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-900 rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300"
            size="sm"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl mx-8">
            <div className="grid grid-cols-3 gap-6">
              {[0, 1, 2].map((offset) => {
                const reviewIndex = (currentIndex + offset) % reviews.length;
                const review = reviews[reviewIndex];
                
                return (
                  <AnimatePresence mode="wait" key={`${currentIndex}-${offset}`}>
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5, delay: offset * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-xl"
                    >
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="relative">
                          <img
                            src={review.profile_photo_url}
                            alt={review.author_name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-gray-900 truncate">
                              {review.author_name}
                            </h4>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                              {review.relative_time_description}
                            </span>
                          </div>
                          <StarRating rating={review.rating} className="mb-3 relative z-10" />
                        </div>
                      </div>
                      
                      <blockquote className="text-gray-700 text-sm leading-relaxed italic mb-4">
                        "{review.text}"
                      </blockquote>
                      
                      <div className="flex justify-center">
                        <GoogleLogo className="w-12 h-5 opacity-60" />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                );
              })}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'gold-shine scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Google Branding Footer */}
        <div className="mt-12 text-center">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
          >
            <span>Alle Bewertungen auf Google ansehen</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}