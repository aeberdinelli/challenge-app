import * as API from './api';

export async function getCities(): Promise<string[]> {
    try {
        const cities = await API.get<Array<{ name: string}>>(`/cities`);
    
        return cities.map(city => city.name);
    } catch (err) {
        return [];
    }
}