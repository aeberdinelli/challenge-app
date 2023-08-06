import React, { useEffect, useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import SearchIcon from '@mui/icons-material/Search';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { LayoutComponent } from "../../components/layout";
import { Restaurant, RestaurantComponent } from "./restaurant";
import { EmptyStateComponent } from "./empty";
import { getCuisineTypes, getCities, searchRestaurants } from "../../services";
import { buildRestaurantFilters } from "../../utils";

import './search.css';

export const SearchPage = () => {
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ minRating, setMinRating ] = useState<number>();
    const [ maxPrice, setMaxPrice ] = useState<number>();
    const [ cuisineFilter, setCuisineFilter ] = useState<string>();
    const [ searchInput, setSearchInput ] = useState<string>();
    const [ cityOptions, setCityOptions ] = useState<string[]>();
    const [ cityFilter, setCityFilter ] = useState<string>();
    const [ loaded, setLoaded ] = useState<boolean>();
    const [ rows, setRows ] = useState<Restaurant[]>([]);
    const [ resultsCount, setResultsCount ] = useState<number>();
    const [ selectedIndex, setSelectedIndex ] = useState<number>();
    const [ map, setMap ] = useState<google.maps.Map>();
    const [ mobileOpen, setMobileOpen ] = useState<boolean>(false);
    const RESULTS_PER_PAGE = 6;
    
    const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY! });

    const buildFilters = () => 
        buildRestaurantFilters({ minRating, maxPrice, searchInput, cityFilter, cuisineFilter });

    useEffect(() => {
        if (!cityOptions) {
            getCities().then(results => setCityOptions(results)).catch();
        }

        const filters = buildFilters();
        const offset = (currentPage - 1) * RESULTS_PER_PAGE;

        setCurrentPage(1);

        searchRestaurants(filters, offset).then(response => {
            setRows(response.results);
            setResultsCount(response.count);
            setLoaded(true); // Mark first load as completed
        });
    }, [ searchInput, minRating, maxPrice, cityFilter, cuisineFilter ]);

    useEffect(() => {
        const filters = buildFilters();
        const offset = (currentPage - 1) * RESULTS_PER_PAGE;

        searchRestaurants(filters, offset).then(response => {
            setRows(response.results);
            setResultsCount(response.count);
        });
    }, [ currentPage ]);

    const openMarker = (restaurant: Restaurant, index: number, focus: boolean = false) => {
        if (!map) {
            return;
        }

        // Highlight list item
        setSelectedIndex(index);
        
        map.panTo(restaurant.address.coordinates);
        map.setZoom(18);

        // Focus only if a mark is clicked, not if it was from the list
        const element = document.getElementById(restaurant._id);
        if (element && focus) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const renderMarkers = () => {
        return rows.map((row: Restaurant, index: number) => {
            return (
                <MarkerF 
                    key={`marker-${index}`} 
                    position={row.address.coordinates} 
                    onClick={() => openMarker(row, index, true)}
                />
            );
        });
    }

    const renderMap = () => {
        if (!isLoaded || !rows || rows.length === 0) {
            return;
        }

        const center = (rows?.length > 0) ? rows[0].address.coordinates : null;

        return (
            <div style={{ marginLeft: '10px' }}>
                <GoogleMap
                    options={{
                        fullscreenControl: false,
                        streetViewControl: false
                    }}
                    mapContainerClassName="map-container"
                    center={center as any}
                    zoom={13}
                    onLoad={(map: google.maps.Map) => setMap(map)}
                >
                    {renderMarkers()}
                </GoogleMap>
            </div>
        );
    }

    const renderCuisineFilter = () => {
        const cuisineTypes = getCuisineTypes();

        if (!loaded) {
            return (
                <Grid container alignContent="center" justifyContent="flex-start">
                    <CircularProgress size={16} />
                </Grid>
            );
        }

        return (
            <FormControl fullWidth size="small">
                <Select
                    labelId="cuisine-filter-label"
                    id="cuisine-filter"
                    value={cuisineFilter || ''}
                    displayEmpty
                    onChange={(event: SelectChangeEvent<string>) => {
                        setCuisineFilter(event.target.value);
                    }}
                    MenuProps={{
                        style: {
                            maxHeight: 400
                        }
                    }}
                >
                    {['', ...cuisineTypes.sort()].map((option, index) => (
                        <MenuItem value={option} key={`cuisine-option-${index}`}>
                            {option || 'Select cuisine'}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }

    const renderCityFilter = () => {
        if (!loaded || !cityOptions) {
            return (
                <Grid container alignContent="center" justifyContent="flex-start">
                    <CircularProgress size={16} />
                </Grid>
            );
        }

        return (
            <FormControl fullWidth size="small">
                <Select
                    labelId="city-filter-label"
                    id="city-filter"
                    displayEmpty
                    value={cityFilter || ''}
                    onChange={(event: SelectChangeEvent<string>) => {
                        setCityFilter(event.target.value);
                    }}
                    MenuProps={{
                        style: {
                            maxHeight: 400
                        }
                    }}
                >
                    {['', ...cityOptions].map((option, index) => (
                        <MenuItem value={option} key={`city-option-${index}`}>
                            {option || 'Select city'}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }

    const renderFilterReset = () => {
        if (cuisineFilter || cityFilter || minRating || maxPrice || searchInput) {
            return (
                <div style={{ marginTop: '20px' }}>
                    <Button 
                        variant="outlined" 
                        color="primary"
                        onClick={() => {
                            setCityFilter('');
                            setMinRating(undefined);
                            setMaxPrice(undefined);
                            setCuisineFilter('');
                        }}
                    >Remove Filters</Button>
                </div>
            );
        }
    }
    
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': { color: 'green' },
        '& .MuiRating-iconHover': { color: 'green' },
    });

    const drawer = (
        <>
            <Typography variant="h5" mb={1}>Filter by</Typography>
                        
            <Typography component="legend" mb={0} variant="caption">City</Typography>
            {renderCityFilter()}
            
            <Typography component="legend" mb={0} mt={2} variant="caption">Cuisine</Typography>
            {renderCuisineFilter()}
            
            <Typography component="legend" mt={2} mb={0} variant="caption">Min Rating</Typography>
            {(loaded) ? (<Rating 
                value={minRating || 0} 
                onChange={(event, value) => setMinRating(value || 0)} 
            />) : (<CircularProgress size={16} />)}
            
            <Typography component="legend" mt={2} mb={0} variant="caption">Max Price</Typography>
            {(loaded) ? (<StyledRating 
                icon={<AttachMoneyIcon fontSize="inherit" />}
                emptyIcon={<AttachMoneyIcon fontSize="inherit" />}
                value={maxPrice} 
                max={4}
                onChange={(event, value) => setMaxPrice(value || 0)} 
            />) : (<CircularProgress size={16} />)}
            
            {renderFilterReset()}
        </>
    )
    
    return (
        <LayoutComponent>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 340, padding: '25px' },
                }}
                ModalProps={{
                    keepMounted: true
                }}
                onClose={() => setMobileOpen(false)}
            >
                {drawer}
            </Drawer>
            <Container maxWidth={false}>
                <Grid container>
                    <Grid item sx={{ display: { xs: 'block', sm: 'none' } }} pt={2}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Grid>
                    <Grid item md={4} lg={2} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {drawer}
                    </Grid>
                    <Grid item md={(loaded && rows.length === 0) ? 10 : 4}>
                        {(loaded && rows?.length > 0) ? rows.map((restaurant: Restaurant, index: number) => {
                            return (
                                <RestaurantComponent
                                    selected={(index === selectedIndex)}
                                    restaurant={restaurant} 
                                    index={index} 
                                    key={`restaurant-component-${index}`}
                                    onClick={() => openMarker(restaurant, index)}
                                />
                            );
                        }) : <EmptyStateComponent mode={(loaded && rows?.length === 0) ? 'message' : 'skeleton'} />}
                    </Grid>
                    <Grid item md={6} sx={{ display: { xs: 'none', lg: 'flex' } }}>
                        {(loaded && rows?.length > 0) ? renderMap() : null}
                    </Grid>
                </Grid>
                <Grid container alignContent="center" justifyContent="center" mt={3}>
                    <Pagination 
                        page={currentPage}
                        onChange={(event: React.ChangeEvent<unknown>, value: number) => setCurrentPage(value)}
                        count={Math.floor((resultsCount || 6) / 6)} 
                    />
                </Grid>
            </Container>
        </LayoutComponent>
    );
}