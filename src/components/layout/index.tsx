import NavBar from "./navbar";
import CssBaseline from '@mui/material/CssBaseline';

interface LayoutProps {
    children?: string | JSX.Element | JSX.Element[];
}

export const LayoutComponent = (props: LayoutProps) => {
    return (
        <div className="layout-component">
            <CssBaseline />
            <div className="layout-component layout-appbar">
                <NavBar />
            </div>
            <div className="layout-component layout-body" style={{ padding: '15px' }}>
                {props.children}
            </div>
        </div>
    );
}