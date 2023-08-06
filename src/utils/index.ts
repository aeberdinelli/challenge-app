export function buildRestaurantFilters(params: any): Record<string, string|number> {
    const filters: any = {};

    if (params.searchInput) {
        filters.name = params.searchInput;
    }
    if (params.minRating) {
        filters.rating = params.minRating;
    }
    if (params.maxPrice) {
        filters.priceRange = params.maxPrice;
    }
    if (params.cityFilter) {
        filters.city = params.cityFilter;
    }
    if (params.cuisineFilter) {
        filters.cuisine = params.cuisineFilter;
    }

    return filters;
}