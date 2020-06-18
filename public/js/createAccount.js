$('#creatAccBtn').on('click', function(event) {
  event.preventDefault();
  
  var newUserLogin = {
    username: $('#regUser')
      .val()
      .trim(),
    password: $('#regPass')
      .val()
      .trim()
  };

  $.ajax({
    url: '/api/newUser/', 
    type: 'GET'
  }).then(function(response) {
    var existingUsers = [];
    for (var i = 0; i < response.length; i++) {
      existingUsers.push(response[i].username);
    }
    if (existingUsers.includes(newUserLogin.username)) {
      alert("Sorry, that username is taken.");
    } else {
      $.ajax('/api/newUser', {
        type: 'POST',
        data: newUserLogin
      }).then(function () {
        location.reload();
      });
    }
  });
});

