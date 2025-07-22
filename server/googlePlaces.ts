import { Request, Response } from 'express';

interface GoogleReview {
  author_name: string;
  author_url?: string;
  language: string;
  original_language?: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
}

interface GooglePlaceDetails {
  place_id: string;
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
  url: string;
}

// Search for the business first to get place_id
export async function searchGooglePlace(query: string): Promise<string | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    throw new Error('Google Places API key not found');
  }

  try {
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (searchData.status === 'OK' && searchData.results.length > 0) {
      return searchData.results[0].place_id;
    }
    
    return null;
  } catch (error) {
    console.error('Error searching Google Places:', error);
    return null;
  }
}

// Get place details including reviews
export async function getGooglePlaceDetails(placeId: string): Promise<GooglePlaceDetails | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    throw new Error('Google Places API key not found');
  }

  try {
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,url&key=${apiKey}`;
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    if (detailsData.status === 'OK') {
      return {
        place_id: placeId,
        name: detailsData.result.name,
        rating: detailsData.result.rating,
        user_ratings_total: detailsData.result.user_ratings_total,
        reviews: detailsData.result.reviews || [],
        url: detailsData.result.url
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching Google Place details:', error);
    return null;
  }
}

// API endpoint to get reviews
export async function getGoogleReviews(req: Request, res: Response) {
  try {
    // First search for the business
    const placeId = await searchGooglePlace('Grema Gebäudeservice GmbH Moers');
    
    if (!placeId) {
      return res.status(404).json({ error: 'Business not found on Google Places' });
    }

    // Get detailed information including reviews
    const placeDetails = await getGooglePlaceDetails(placeId);
    
    if (!placeDetails) {
      return res.status(404).json({ error: 'Could not fetch place details' });
    }

    res.json({
      success: true,
      data: placeDetails
    });
  } catch (error) {
    console.error('Error in getGoogleReviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}