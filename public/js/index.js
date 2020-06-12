// Get references to page elements
var $restaurantName = $('#example-text');
var $restaurantval1 = $('#example-description');
var $submitBtn = $('#submit');
var $restaurantList = $('#example-list');

// The API object contains methods for each kind of request we'll make
var API = {
  postRestaurant: function(payload) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: 'api/restaurants',
      data: JSON.stringify(payload)
    });
  },
  getRestaurants: function() {
    return $.ajax({
      url: 'api/restaurants/',
      type: 'GET'
    });
  },
  deleteRestaurant: function(id) {
    return $.ajax({
      url: 'api/restaurants/' + id,
      type: 'DELETE'
    });
  }
};

// refreshRestaurants gets new examples from the db and repopulates the list
var refreshRestaurants = function() {
  API.getRestaurants().then(function(data) {
    var $restaurants = data.map(function(payload) {
      var $a = $('<a>')
        .text(payload.name)
        .attr('href', '/restaurants/' + payload.id);

      var $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': payload.id
        })
        .append($a);

      var $button = $('<button>')
        .addClass('btn btn-danger float-right delete')
        .text('ｘ');

      $li.append($button);

      return $li;
    });

    $restaurantList.empty();
    $restaurantList.append($restaurants);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var payload = {
    name: $restaurantName.val().trim()
    // description: $restaurantval1.val().trim()
  };

  // if (!example.text) {
  //   alert('You must enter an example text and description!');
  //   return;
  // }

  API.postRestaurant(payload).then(function() {
    refreshRestaurants();
  });

  $restaurantName.val('');
  // $restaurantval1.val('');
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr('data-id');

  API.deleteRestaurant(idToDelete).then(function() {
    refreshRestaurants();
  });
};

// Add event listeners to the submit and delete buttons
refreshRestaurants();
$submitBtn.on('click', handleFormSubmit);
$restaurantList.on('click', '.delete', handleDeleteBtnClick);
