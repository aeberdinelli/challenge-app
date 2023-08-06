import { Restaurant } from '../pages/search/restaurant';
import { get, ListResponse } from './api';

export async function searchRestaurants(filter: Record<string, string|number> = {}, offset: number = 0): Promise<ListResponse<Restaurant>> {
    const qs = new URLSearchParams({ ...filter, offset: offset.toString(), limit: '6' });

    try {
        return get<ListResponse<Restaurant>>(`/restaurants?${qs}`);
    } catch (err) {
        return { count: 0, results: [] };
    }
}