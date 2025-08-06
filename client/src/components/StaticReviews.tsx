import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

// Hardcoded reviews from actual Google Reviews
const reviews: Review[] = [
  {
    author_name: "Vera M.",
    profile_photo_url: "https://ui-avatars.com/api/?name=Vera+M&background=0844A9&color=fff&size=128",
    rating: 5,
    relative_time_description: "vor 10 Monaten",
    text: "Das Team war pünktlich, freundlich und äußerst gründlich. Besonders beeindruckt hat mich die Sorgfalt, mit der jedes Detail beachtet wurde. Unsere KiTa glänzen förmlich und alle Ecken und Winkel wurden sorgfältig gereinigt."
  },
  {
    author_name: "Ismail Z.",
    profile_photo_url: "https://ui-avatars.com/api/?name=Ismail+Z&background=0844A9&color=fff&size=128",
    rating: 5,
    relative_time_description: "vor 8 Monaten",
    text: "Haben ein zuverlässiges Team gebraucht in Raum NRW und sind direkt auf Grema gestoßen durch Empfehlungen. Wir konnten den Auftrag ohne Schwierigkeiten dem Team übergeben. Die Arbeit war klasse und der Kunde war zufrieden. Freut uns ein starken Partner in der Region gefunden zu haben. Würde und könnte ich auf jeden Fall weiter empfehlen."
  },
  {
    author_name: "Ronja K.",
    profile_photo_url: "https://ui-avatars.com/api/?name=Ronja+K&background=0844A9&color=fff&size=128",
    rating: 5,
    relative_time_description: "vor 6 Monaten",
    text: "Ein absolutes Lob an diese Firma und an das gesamte Team. Wir mussten das gesamte Haus meines Vaters auflösen und haben Grema Gebäudeservice GmbH damit beauftragt. Erst wurden wir absolut kundenfreundlich und kompetent beraten, dann haben wir auch ziemlich schnell den Termin bekommen. Die komplette Auflösung verlief einwandfrei und sauber. Anschließend wurde das Haus noch grundgereinigt und alles war blitzeblank."
  },
  {
    author_name: "Sandra K.",
    profile_photo_url: "https://ui-avatars.com/api/?name=Sandra+K&background=0844A9&color=fff&size=128",
    rating: 5,
    relative_time_description: "vor einem Jahr",
    text: "Hat alles super geklappt, schnelle Terminvergabe, freundliche Mitarbeiter und meine Fenster sind wieder blitzeblank 😊 werde ich aufjedenfall weiterempfehlen 👍"
  },
  {
    author_name: "Mario R.",
    profile_photo_url: "https://ui-avatars.com/api/?name=Mario+R&background=0844A9&color=fff&size=128",
    rating: 5,
    relative_time_description: "vor einem Jahr",
    text: "Wir als FoodTruck Event Caterer sind vollsten zufrieden mit Herrn Grema und seinen Mitarbeitern. Ob komplette Küchenreinigung, Büro oder unsere FoodTrucks wir sind zufrieden und wenn es mal nicht so sein sollte, wird nachgebessert."
  },
  {
    author_name: "Thomas W.",
    profile_photo_url: "https://ui-avatars.com/api/?name=Thomas+W&background=0844A9&color=fff&size=128",
    rating: 5,
    relative_time_description: "vor einem Jahr",
    text: "Sehr professioneller Service! Die Büroreinigung wird immer zuverlässig und gründlich durchgeführt. Das Team ist pünktlich und arbeitet sehr gewissenhaft. Können wir nur weiterempfehlen."
  },
  {
    author_name: "Julia H.",
    profile_photo_url: "https://ui-avatars.com/api/?name=Julia+H&background=0844A9&color=fff&size=128",
    rating: 5,
    relative_time_description: "vor einem Jahr",
    text: "Hervorragende Fensterreinigung! Die Fenster sind streifenfrei und kristallklar. Das Team ist sehr zuverlässig und arbeitet mit hoher Qualität. Preis-Leistung stimmt perfekt."
  }
];

// Google logo SVG component
const GoogleLogo = ({ className = "w-20 h-8" }) => (
  <svg className={className} viewBox="0 0 272 92" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M115.75 47.18C115.75 45.48 115.61 43.81 115.35 42.18H87.26V51.85H102.87C102.14 55.63 100.11 58.91 96.95 61.23V67.46H106.68C112.68 62.06 115.75 55.37 115.75 47.18Z" fill="#4285F4"/>
    <path d="M87.26 73.43C94.84 73.43 101.2 70.87 106.68 67.46L96.95 61.23C94.28 63.02 90.82 64.08 87.26 64.08C79.98 64.08 73.81 58.63 71.47 51.41H61.44V57.83C66.88 68.68 76.42 73.43 87.26 73.43Z" fill="#34A853"/>
    <path d="M71.47 51.41C70.85 49.62 70.5 47.71 70.5 45.76C70.5 43.81 70.85 41.9 71.47 40.11V33.69H61.44C59.37 37.83 58.26 42.61 58.26 47.76C58.26 52.91 59.37 57.69 61.44 61.83L71.47 51.41Z" fill="#FBBC04"/>
    <path d="M87.26 27.44C91.19 27.44 94.74 28.87 97.53 31.55L106.23 22.85C101.13 18.08 94.77 15.52 87.26 15.52C76.42 15.52 66.88 20.27 61.44 31.12L71.47 37.54C73.81 30.32 79.98 24.87 87.26 24.87V27.44Z" fill="#EA4335"/>
  </svg>
);

// Star rating component
const StarRating = ({ rating, className = "" }: { rating: number; className?: string }) => {
  return (
    <div className={`flex items-center ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export function StaticReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Kundenbewertungen
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Echte Google-Bewertungen von unseren zufriedenen Kunden aus Moers und Umgebung
          </p>
        </div>

        {/* Reviews Carousel - Mobile Optimized */}
        <div className="relative max-w-6xl mx-auto pb-8">
          {/* Navigation Buttons - Hidden on mobile, visible on desktop */}
          <Button
            onClick={prevSlide}
            className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-900 rounded-full w-10 h-10 lg:w-12 lg:h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300 hidden sm:flex items-center justify-center"
            size="sm"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </Button>
          
          <Button
            onClick={nextSlide}
            className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-900 rounded-full w-10 h-10 lg:w-12 lg:h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300 hidden sm:flex items-center justify-center"
            size="sm"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
          </Button>

          {/* Carousel Container - Responsive Layout */}
          <div className="mx-2 sm:mx-8">
            {/* Mobile: Single Card Layout */}
            <div className="block sm:hidden">
              <AnimatePresence mode="wait" key={currentIndex}>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl p-4 shadow-xl"
                >
                  {(() => {
                    const review = reviews[currentIndex];
                    return (
                      <>
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="relative">
                            <img
                              src={review.profile_photo_url}
                              alt={review.author_name}
                              className="w-10 h-10 rounded-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold text-gray-900 text-sm">
                                {review.author_name}
                              </h4>
                              <span className="text-xs text-gray-500">
                                {review.relative_time_description}
                              </span>
                            </div>
                            <StarRating rating={review.rating} className="mb-2" />
                          </div>
                        </div>
                        
                        <blockquote className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                          "{review.text}"
                        </blockquote>
                        
                        <div className="flex justify-center">
                          <GoogleLogo className="w-10 h-4 opacity-60" />
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop: Three Cards Layout */}
            <div className="hidden sm:flex gap-4 lg:gap-6 items-start">
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
                      className="bg-white rounded-2xl p-4 lg:p-6 shadow-xl w-1/3 z-10"
                    >
                      <div className="flex items-start space-x-3 lg:space-x-4 mb-4">
                        <div className="relative">
                          <img
                            src={review.profile_photo_url}
                            alt={review.author_name}
                            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-gray-900 truncate text-sm lg:text-base">
                              {review.author_name}
                            </h4>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                              {review.relative_time_description}
                            </span>
                          </div>
                          <StarRating rating={review.rating} className="mb-2 lg:mb-3" />
                        </div>
                      </div>
                      
                      <blockquote className="text-gray-700 text-xs lg:text-sm leading-relaxed italic mb-4 line-clamp-4">
                        "{review.text}"
                      </blockquote>
                      
                      <div className="flex justify-center">
                        <GoogleLogo className="w-10 h-4 lg:w-12 lg:h-5 opacity-60" />
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
                    ? 'bg-primary scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Google Branding Footer */}
        <div className="mt-12 text-center">
          <a
            href="https://maps.google.com/search/Grema+Geb%C3%A4udeservice+GmbH+Moers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <span>5,0 ⭐ • 17 Bewertungen</span>
          </a>
        </div>
      </div>
    </section>
  );
}