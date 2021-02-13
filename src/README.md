# About
The source code is divided into many sections. Hopefully this will help you (and me!) understand where everything is.
```
cmd/
  # All the bot commands (each folder is a category)
  template.txt # A template file
  cmd.json # Info on all the files

util/
  data/
    # This contains typings for user data like items

  database/
    # This is the wrapper for firebase

  admin.json # This is all the admin user IDs
  format.ts # These are text formatting utils
  util.ts # These are math/text utils

cmd-parser.ts # This parses commands
global.ts # This exports things from 'util' to be easily importable
loader.ts # This loads commands from 'cmd'
server.ts # This creates a server for top.gg
index.ts # Entry point
```