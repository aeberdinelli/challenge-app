import { useEffect, useState } from "react";
import { LayoutComponent } from "../../components/layout";
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { getCities } from "../../services";

export const HomePage = () => {
    const [ healthCheck, setHealthCheck ] = useState<boolean>();

    useEffect(() => {
        getCities()
            .then(cities => {
                setHealthCheck(true);
            })
            .catch(err => {
                console.log(err);

                setHealthCheck(false);
            });

        return () => {}
    });
    
    const InlineCode = styled('div')({
        padding: '2px 6px',
        margin: '0 2px',
        background: '#ddd',
        borderRadius: '5px',
        display: 'inline',
        fontFamily: 'monospace'
    });

    const renderStatus = () => {
        if (!process.env.REACT_APP_API_URL) {
            return (
                <Alert severity="error">The API URL has not been configured within <InlineCode>.env</InlineCode> file</Alert>
            );
        }

        if (!process.env.REACT_APP_GOOGLE_KEY) {
            return (
                <Alert severity="error">The Google Maps key has not been configured within <InlineCode>.env</InlineCode> file</Alert>
            )
        }

        if (typeof healthCheck === 'undefined') {
            return (
                <CircularProgress size={18} />
            )
        }
        
        if (healthCheck) {
            return (
                <Alert severity="success">Up and running</Alert>
            );
        }

        return (
            <Alert severity="error">Could not connect to the API</Alert>
        );
    }

    return (
        <LayoutComponent>
            <h1>Take Home Engineering Challenge</h1>
            <h2>Setup</h2>
            {renderStatus()}
            <h2>Notes</h2>
            <p>
                <strong><em>Note</em></strong> I left some values on purpose inside <InlineCode>.env.dev</InlineCode> to make setup easier.
            </p>
            <h3>Stack</h3>
            <ul>
                <li>
                    <strong>React</strong>: This is just the frontend technology I'm most familiar with
                </li>
                <li>
                    <strong>MUI</strong>: As the component library, I chose this one because it provides a huge amount of components, it can be themed as needed and has native TS support
                </li>
                <li>
                    <strong>Typescript</strong>: Because ❤️
                </li>
            </ul>
            <h3>Notes</h3>
            <ul>
                <li>I used <InlineCode>create-react-app</InlineCode> to start the project faster.</li>
                <li>I didn't see it was needed to have a cuisine types api since there are only a few, however it can be easily done just as I did with the cities.</li>
                <li>I've chosen not to use Redux or React Context to keep it as simple as possible, but they can be used if I needed to keep data between pages.</li>
                <li>I use this structure when making small projects in React: <InlineCode>components</InlineCode> holding common components, <InlineCode>pages</InlineCode> where all of the pages are, and if I need a component that is only going to be used within one page, then I add it inside that page's folder. <InlineCode>services</InlineCode> contain the methods used to fetch data from the API.</li>
                <li>I added some really <strong>basic</strong> responsiveness to the app, but it could be improved if needed.</li>
                <li>Among other potential improvements, I would've added more try/catch sentences to prevent issues.</li>
            </ul>
        </LayoutComponent>
    );
}