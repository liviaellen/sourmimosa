export interface PortfolioItem {
  id: string;
  brand: string;
  property: string;
  city: string;
  category: string;
  brandCategory?: string;
  instagramLinks: string[];
  googleMaps: string;
  type?: string;
  venue?: string;
  item?: string;
  level?: string;
  michelinStars?: number;
}

export interface PortfolioData {
  portfolio: PortfolioItem[];
  stats: {
    totalItems: number;
    hotels: number;
    fnb: number;
    beyond: number;
  };
}
