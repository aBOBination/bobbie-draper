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

  $.ajax('/api/newUser', {
    type: 'POST',
    data: newUserLogin
  }).then(function() {
    location.reload();
  });
});
