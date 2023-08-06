import Typography from '@mui/material/Typography';

interface PriceComponentProps {
    value: string;
}

export const PriceComponent = (props: PriceComponentProps) => {
    const getColor = (num: number): "green"|"darkgreen" => {
        if (num >= 3) {
            return 'green';
        }

        return 'darkgreen';
    }

    return (
        <Typography 
            component="div" 
            margin="0 10px"
            fontWeight="bold" 
            color={getColor(props.value.length)}
        >
            {props.value}
        </Typography>
    );
}