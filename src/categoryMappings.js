// src/categoryMappings.js

// This mapping defines tie-breaker rules and relative weights for each category.
// In a tie scenario, we can look for overlaps or assign a priority order.
// For example:
// - If both "Cafe" and "Mall" are tied, we choose "Mall" because malls usually offer a broader experience (shopping, dining, entertainment).
// - If "Restaurant" and "Cafe" tie, we might favor "Restaurant" since it can offer a complete dining experience.
// - If "Park" ties with any indoor option (like Mall or Restaurant), we may favor the indoor option for weather unpredictability.
// You can also assign weights if needed, but here we use simple overlapping rules.

export const categoryMappings = {
    Cafe: {
      // If tied with these categories, prefer the one with the broader experience.
      tieBreaker: ['Mall', 'Restaurant'] 
    },
    Mall: {
      // Mall stands strong, but if tied with Cafe or Restaurant, it wins.
      tieBreaker: [] // Mall is prioritized if any tie-breaker from another category points to it.
    },
    Adventure: {
      tieBreaker: [] // No specific mapping here, Adventure is unique.
    },
    Restaurant: {
      tieBreaker: ['Mall'] // If tied with Mall, we can decide on user preference. For now, we'll let Mall win.
    },
    Park: {
      // If tied with indoor venues (e.g., Restaurant, Mall), favor the indoor ones during inclement weather.
      tieBreaker: ['Mall', 'Restaurant']
    }
  };
  