let users = []; // {id: socket.id, name: username, storyPoints: ''}
let votes = [];
let votingResults = []

function socket(io) {
  io.on("connection", function (socket) {
    console.log("user connected: " + socket.id);
    socket.emit('votingResults', votingResults);
    io.emit('user-join', users);

    socket.on('disconnect', function () {
      console.log('user disconnected: ' + socket.id)
      const userDisconnecting = users.find(user => user.id === socket.id)
      if (userDisconnecting) {
        const userIndex = users.findIndex(user => user.id === socket.id)
        users.splice(userIndex, 1)
        console.log(users)
        //Send back updated users-list to connected clients.
        io.emit('user-join', users)
      }
    });
  });
}

module.exports = socket;