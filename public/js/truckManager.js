// Get references to page elements
var $submitBtn = $('#submit');
// var $editBtn = $('#edit');
var $truckList = $('#truck-list');

// The API object contains methods for each kind of request we'll make
var API = {
  postTruck: function(payload) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: 'api/trucks',
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
      // var $a = $('<a>')
      //   .text(payload.name)
      //   .attr('href', '/trucks/' + payload.id);

      var $li = $('<li>')
        .text(payload.name)
        .attr({
          class: 'list-group-item',
          'data-id': payload.id
        });
      // .append($a);

      var $deleteButton = $('<button>')
        .addClass('btn-sm btn-danger float-right delete block1')
        .text('Delete');

      var $editButton = $('<a>')
        .attr('href', '/trucks/' + payload.id)
        .addClass('btn-sm btn-primary float-right edit block1 mr-4')
        .text('Edit');

      $li.append([$deleteButton, $editButton]);

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
    name: $('#truck-name')
      .val()
      .trim(),
    phone_number: $('#truck-phone')
      .val()
      .trim(),
    city: $('#truck-city')
      .val()
      .trim(),
    state: $('#truck-state')
      .val()
      .trim(),
    country: $('#truck-country')
      .val()
      .trim(),
    img_url: $('#truck-img')
      .val()
      .trim(),
    description: $('#truck-description')
      .val()
      .trim()
  };
  if (
    !payload.name ||
    !payload.phone_number ||
    !payload.city ||
    !payload.state ||
    !payload.country ||
    !payload.img_url ||
    !payload.description
  ) {
    alert('You must fill out all fields to create a food truck.');
    return;
  }

  API.postTruck(payload).then(function(data) {
    window.location.href = '/trucks/' + data.id;
  });

  $('#truck-name').val('');
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

var handlePostUpdate = function() {
  var idToUpdate = $(this)
    .parent()
    .attr('data-id');

  API.updateTruck(idToUpdate).then(function() {
    refreshTrucks();
  });
};

// Add event listeners to the submit and delete buttons
refreshTrucks();
$submitBtn.on('click', handleFormSubmit);
$truckList.on('click', '.delete', handleDeleteBtnClick);
$truckList.on('click', '.update', handlePostUpdate);
