# Cycle Bot
This is the code repository for cycle bot! You are playing as a coder who makes programs in order to get cycles. You can extend your reach to youtube, twitch, and dev.to to become the most cycled!

You can invite the bot [here](https://discord.com/api/oauth2/authorize?client_id=781939317450342470&permissions=265280&scope=bot). Enjoy!


## How to play
The prefix is `&`. Use `&help` to see all commands.

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

If you are hosting this on [`repl.it`](https://repl.it/), a `.replit` file already has been made with everything you need! All you need to add is your `.env` file and make sure to install everything by doing
```
npm i
```

### Firebase
This project *does* require firebase, so make sure you hvae the admin SDK ready. First, it will check if the `.env` file contains the `FIREBASE` key, which is just the JSON file on one line.
```
FIREBASE={"...": "..."}
```
Otherwise, it just readds the `sdk-key.json` file in the root directory.
> Make sure not to commit `sdk-key.json`!

### Fake-DB
As this bot is in beta, for now, the files are going to be manually written over. This is in `database.json`

## Contributions
Suggestions are very much welcome!