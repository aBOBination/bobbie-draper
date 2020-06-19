// Get references to page elements
var $truckName = $('#truck-name');
var $submitBtn = $('#submit');
// var $editBtn = $('#edit');
var $truckList = $('#truck-list');

// The API object contains methods for each kind of request we'll make
var API = {
  postTruck: function(payload) {
    console.log(payload);
    return $.ajax({
      headers: {
        'Content-Type': 'application/json',
      },
      type: 'POST',
      url: 'api/trucks',
      data: JSON.stringify(payload),
    });
  },
  getTrucks: function() {
    return $.ajax({
      url: 'api/trucks/',
      type: 'GET',
    });
  },
  deleteTruck: function(id) {
    return $.ajax({
      url: 'api/trucks/' + id,
      type: 'DELETE',
    });
  },
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
          'data-id': payload.id,
        });
      // .append($a);

      var $deleteButton = $('<button>')
        .addClass('btn btn-danger float-right delete block2')
        .text('ｘ');

      var $editButton = $('<a>')
        .attr('href', '/trucks/' + payload.id)
        .addClass('btn btn-primary float-right edit block2')
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
    name: $truckName.val().trim(),
  };
  console.log(payload);
  // if (!truck.name) {
  //   alert('You must enter an truck name and description!');
  //   return;
  // }

  API.postTruck(payload).then(function() {
    refreshTrucks();
  });

  $truckName.val('');
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
