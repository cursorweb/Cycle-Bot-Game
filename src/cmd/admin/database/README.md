# Database Commands
|Command|Explanation|
|--|--|
|[`admin-stash`](./backup-db.ts)|Stores the database into `database.json`, which can be loaded later for emergencies!|
|[`admin-all`](./daily-maintain.ts)|Daily command to admin-stash and update topgg data.|
|[`admin-update-schema`](./database-maintain.ts)|A server update that requires the database to be updated, like a new key, etc.|
|[`admin-restore`](./load-backup.ts)|Loads the backup db into the memory. Validate the data before saving!|
|[`admin-user-reset`](./reset-user.ts)|Resets an OP user (like you). Also saves the data to firestore.|
|[`admin-save`](./save-db.ts)|Save the database to firestore. Then loads the data from firestore to memory.|
|[`admin-user-set`](./set-user.ts)|Sets a user to have everything (for testing). Also saves the data to firestore.|
|[`admin-fetch`](./update-db.ts)|Sets the memory from data from firestore.|

That's all the admin commands out there! The rest should not be used.