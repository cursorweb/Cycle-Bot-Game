# About
The source code is divided into many sections.
This is a brief overview of them.
```
index.ts # entrypoint
commands.ts # loads commands, and generates in-depth help command
server.ts # hosts webserver

util/
  admin/ # admin commands
  game/ # anything part of the cycle game
    shop/ # anything part of the shop
    item/ # anything to do with items
    cycle/ # coding, posting, etc
  minigame/ # minigames
  meta/ # things to do with accounts and the bot itself
  misc/ # random

slashutil/
  deploy-commands.ts # deploys commands (standalone 'bin' executable)


```