# Take Home Engineering Challenge
## Setup
1. Install NodeJS
2. Update `.env.dev` with your desired settings and rename it to `.env`
3. Run `npm start`

*Note*: I left some values on purpose inside `.env.dev` to make setup easier.

## Stack
- **React** This is just the frontend technology I'm most familiar with
- **MUI** As the component library, I chose this one because it provides a huge amount of components, it can be themed as needed and has native TS support
- **Typescript** because ❤️

## Notes
- I used `create-react-app` to start the project faster.
- I didn't see it was needed to have a cuisine types api since there are only a few, however it can be easily done just as I did with the cities.
- I've chosen not to use Redux or React Context to keep it as simple as possible, but they can be used if I needed to keep data between pages.
- I use this structure when making small projects in React: `components` holding common components, `pages` where all of the pages are, and if I need a component that is only going to be used within one page, then I add it inside that page's folder. `services` contain the methods used to fetch data from the API.
- Among other potential improvements, I would've added more try/catch sentences to prevent issues.