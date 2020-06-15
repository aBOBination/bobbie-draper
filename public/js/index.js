//Login functionality
$('#loginBtn').on('click', function(event) {
  event.preventDefault();

  var userLogin = {
    username: $('#username')
      .val()
      .trim(),
    password: $('#password')
      .val()
      .trim()
  };

  $.ajax('/api/user', {
    type: 'POST',
    data: userLogin
  }).then(function() {
    location.reload();
  });
});

// Get references to page elements
var $truckName = $('#truck-name');
var $submitBtn = $('#submit');
var $truckList = $('#truck-list');

// The API object contains methods for each kind of request we'll make
var API = {
  searchTrucks: function(payload) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      url: 'api/search',
      type: 'POST',
      data: JSON.stringify(payload)
    });
  },
  getTrucks: function() {
    return $.ajax({
      url: 'api/trucks/',
      type: 'GET'
    });
  },
  deleteTruck: function(id) {
    return $.ajax({
      url: 'api/trucks/' + id,
      type: 'DELETE'
    });
  }
};

// refreshTrucks gets new trucks from the db and repopulates the list
var refreshTrucks = function() {
  API.getTrucks().then(function(data) {
    var $trucks = data.map(function(payload) {
      var $a = $('<a>')
        .text(payload.name)
        .attr('href', '/trucks/' + payload.id);

      var $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': payload.id
        })
        .append($a);

      var $button = $('<button>')
        .addClass('btn btn-danger float-right delete')
        .text('ｘ');

      // $li.append($button);

      return $li;
    });

    $truckList.empty();
    $truckList.append($trucks);
  });
};

// handleFormSubmit is called whenever we submit a new truck
// Save the new truck to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var payload = {
    term: $('#search-term').val()
  };

  API.searchTrucks(payload).then(function(data) {
    // console.log(data);
    var $modalTemp = data.map(function(truck) {
      var $i = $('<i>').addClass('fas fa-plus fa-3x');
      var $d4 = $('<div>')
        .addClass('portfolio-item-caption-content text-center text-white')
        .append($i);
      var $d3a = $('<div>')
        .addClass(
          'portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100'
        )
        .append($d4);
      var $img = $('<img>').attr({
        class: 'img-fluid',
        src: '/img/truck1.jpg',
        alt: 'truck ' + truck.id
      });
      var $h3 = $('<h3>')
        .addClass('text-white text-center')
        .text(truck.name);
      var $d5 = $('<div>')
        .addClass('centered')
        .append($h3);
      var $d3b = $('<div>').append([$img, $d5]);
      var $d2 = $('<div>')
        .attr({
          class: 'portfolio-item mx-auto',
          'data-toggle': 'modal',
          'data-target': '#portfolioModal' + truck.id
        })
        .append([$d3a, $d3b]);
      var $d1 = $('<div>')
        .addClass('col-md-6 col-lg-4 mb-5')
        .append($d2);
      return $d1;
    });

    var $trucks = data.map(function(truck) {
      var $a = $('<a>')
        .text(truck.name)
        .attr('href', '/trucks/' + truck.id);
      var $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': truck.id
        })
        .append($a);
      return $li;
    });
    $('#truck-list').empty();
    $('#truck-list-modal').empty();
    $('#truck-list-modal').append($modalTemp);
    $('#truck-list').append($trucks);
  });

  term.val('');
};

// handleDeleteBtnClick is called when an truck's delete button is clicked
// Remove the truck from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr('data-id');

  API.deleteTruck(idToDelete).then(function() {
    refreshTrucks();
  });
};

// Add event listeners to the submit and delete buttons
refreshTrucks();
$submitBtn.on('click', handleFormSubmit);
$truckList.on('click', '.delete', handleDeleteBtnClick);
