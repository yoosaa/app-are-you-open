
var users = [
    {
      user: "<user_name>",
      pwd: "<pass_word>",
      roles: [
        {
          role: "dbOwner",
          db: "<db_name>"
        }
      ]
    }
  ];
  
  for (var i = 0, length = users.length; i < length; ++i) {
    db.createUser(users[i]);
  }