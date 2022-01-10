const users = [
  {
    user: 'sano',
    pwd: 'sano',
    roles: [
      {
        role: 'dbOwner',
        db: 'enjin'
      }
    ]
  }
];

let currentUsers = db.getUsers();
if (currentUsers.length === users.length) {
    quit();
}
db.dropAllUsers();

for (let i = 0, length = users.length; i < length; ++i) {
  db.createUser(users[i]);
}