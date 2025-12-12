import data from './portfolio.json';
import type { PortfolioData } from '../types';

const portfolioData = data as PortfolioData;

export const getPortfolio = () => portfolioData.portfolio;
export const getStats = () => portfolioData.stats;

export const getHotels = () => portfolioData.portfolio.filter(item => item.category === 'Hotels & Resorts' || item.type === 'hotel');
export const getFnB = () => portfolioData.portfolio.filter(item => item.category === 'F&B Destinations' || item.type === 'fnb');
export const getRestaurants = () => portfolioData.portfolio.filter(item => item.category === 'Restaurants' || item.type === 'restaurant'); // Check if 'Restaurants' is a category in JSON, usually it's under F&B or separate?
// Based on script.js, categories are "Hotels & Resorts", "F&B Destinations", "Beyond Hotels & F&B".
// User wants "Hotel", "Food & Beverage", "Restaurant".
// "Food & Beverage" likely maps to "F&B Destinations".
// "Restaurant" might be a subset or the user wants to split them?
// Looking at the JSON, types are 'hotel', 'fnb', 'beyond'?
// Let's filter by category for now.
