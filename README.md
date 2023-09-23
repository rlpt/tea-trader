# Tea Trader

Tea trading game. Buy low and sell high. Some game logic cribbed from [here](https://github.com/robhurring/dopewars)

## Running

Run `npm install && npm run start`

Built on [Create React App](https://github.com/facebook/create-react-app#readme) for more details.

## Random numbers

rngTables made up front with seed

## UI design philosophy

no fixed positioning, because mobile browser chrome is varied
keep important things above the fold

## Version numbers and localstorage

Version number from `package.json` is written out to a js file and used as part of the localstorage key to save redux state.
By tying the Redux state to a specific version, we ensure that outdated or potentially incompatible states don't interfere
with new application versions.

TODO except scores
