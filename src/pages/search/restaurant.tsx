import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Icon from '@mui/material/Icon';
import PlaceIcon from '@mui/icons-material/Place';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { PriceComponent } from './price';

export interface Restaurant {
    name: string;
    phoneNumber: string;
    cuisine: string;
    priceRange: string;
    dressCode: string;
    chef: string;
    rating: number;
    reviewCount: number;
    address: {
        address1: string;
        address2?: string;
        city: string;
        state: string;
        postalCode: string;
        coordinates: {
            lat: number;
            lng: number;
        }
    }
    _id: string;
}

export interface RestaurantComponentProps {
    restaurant: Restaurant;
    index?: number;
    selected?: boolean;
    onClick?: (restaurant: Restaurant) => void;
}

export const RestaurantComponent = (props: RestaurantComponentProps) => {
    const { restaurant, index } = props;

    const onClick = () => {
        if (!props.onClick) {
            return;
        }

        props.onClick(restaurant);
    }

    return (
        <div 
            className={(props.selected) ? 'restaurant-row-active' : 'restaurant-row'} 
            onClick={onClick} 
            id={`${restaurant._id}`}
            key={`restaurant-row-${index}`}
        >
            <Grid container direction="column" mb={1} mr={2} p={2}>
                <Grid item>
                    <Typography variant="h6">{restaurant.name}</Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="row">
                        <Grid item>
                            <Rating value={restaurant.rating} readOnly precision={0.5} />
                        </Grid>
                        <Grid item pt={.4} pl={1}>
                            <Typography variant="subtitle2" color="GrayText">
                                ({restaurant.reviewCount})
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item mt={.5}>
                    <Grid container direction="row" justifyItems="center" alignContent="flex-end">
                        <Grid item>
                            <Icon>
                                <PlaceIcon />
                            </Icon>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2" color="CaptionText">{restaurant.address.city}</Typography>
                        </Grid>
                        <Grid item ml={1.5}>
                            <Icon>
                                <RestaurantMenuIcon />
                            </Icon>
                        </Grid>
                        <Grid item ml={.5}>
                            <Typography variant="subtitle2" color="CaptionText">{restaurant.cuisine}</Typography>
                        </Grid>
                        <Grid item ml={.5} pt={0} mt={-.1}>
                            <PriceComponent value={restaurant.priceRange} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}