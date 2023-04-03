# Cycle Bot
This is the code repository for cycle bot! You are playing as a coder who makes programs in order to get cycles. You can extend your reach to youtube, twitch, and dev.to to become the most cycled!

You can invite the bot [here](https://discord.com/api/oauth2/authorize?client_id=781939317450342470&permissions=272448&scope=bot). Enjoy!


## How to play
The prefix is `&`. Use `&help` to see all commands. You can also join the [discord server](https://discord.gg/4vTPWdpjFz)

## Building
The program will try to read the `.env` file using `dotenv`. Your `.env` file should look something like:
```sh
TOKEN=insert_token_here
```
Make sure not to commit `.env`!

Afterwards, make sure you have typescript installed. To compile your bot during development, run
```sh
npm run dev
```

Then do `node .` to run your bot.
To run with extra logging, use `node . -d`. This includes things spit out by the discord.js library.

If you are hosting this on [`replit`](https://replit.com/), a `.replit` file already has been made with everything you need! All you need to add is your `.env` file and make sure to install everything by doing
```
npm i
```

### Slash Commands
Use `node ./dist/slashutil/deploy-commands.js` to deploy slash commands!

### Firebase
This project *does* require firebase, so make sure you hvae the admin SDK ready. First, it will check if the `.env` file contains the `FIREBASE` key, which is just the JSON file on one line.
```
FIREBASE={"...": "..."}
```
Otherwise, it just reads the `sdk-key.json` file in the root directory.
> Make sure not to commit `sdk-key.json`!

### Fake-DB
The bot will periodically stash database info in `database.json`. When developing, make sure `database.json` is created!

## Contributions
Suggestions are very much welcome!
You can also use a fallback JSON database so you don't have to mess around with the actual database. To do this, just add a `NODE_ENV` to your `.env` file:
```
NODE_ENV=1
```
Note the value can be whatever you want as we only check for existence.

Also read [CONTRIBUTING.md](CONTRIBUTING.md).

## Balance
Most math can be found here: https://www.desmos.com/calculator/y0kqpajh2m
Comments that say `refer to desmos` probably refers to that.
