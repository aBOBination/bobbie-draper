// Get references to page elements
var $truckId = $('.truck-id');
var $itemName = $('#item-name');
var $itemPrice = $('#item-price');
var $submitBtn = $('#submit');
var $itemList = $('#item-list');

// The API object contains methods for each kind of request we'll make
var API = {
  postItem: function(payload) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: '../api/menu-items',
      data: JSON.stringify(payload)
    });
  },
  getItems: function(id) {
    return $.ajax({
      url: '../api/trucks/' + id,
      type: 'GET'
    });
  },
  deleteItem: function(id) {
    return $.ajax({
      url: '../api/menu-items/' + id,
      type: 'DELETE'
    });
  },
  updateTruck: function(payload) {
    return $.ajax({
      url: '../api/trucks/',
      type: 'PUT',
      data: payload
    });
  }
};
// refreshTrucks gets new trucks from the db and repopulates the list
var refreshTrucks = function() {
  API.getItems($truckId.attr('id')).then(function(data) {
    var items = data.menu_items;
    var $trucks = items.map(function(payload) {
      var $a = $('<a>').text(payload.name + ': $' + payload.price);
      var $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': payload.id,
          'truck-id': $truckId.attr('id')
        })
        .append($a);
      var $button = $('<button>')
        .addClass('btn-sm btn-danger float-right delete')
        .text('Delete');
      $li.append($button);
      return $li;
    });
    $itemList.empty();
    $itemList.append($trucks);
  });
};

// handleFormSubmit is called whenever we submit a new truck
// Save the new truck to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  var payload = {
    name: $itemName.val().trim(),
    price: parseFloat($itemPrice.val()),
    truckId: $truckId.attr('id')
  };
  if (!payload.name || isNaN(payload.price) === true) {
    alert('You must enter a item name and price!');
    return;
  }
  API.postItem(payload).then(function() {
    refreshTrucks();
  });
  $itemName.val('');
  $itemPrice.val('');
};

// handleDeleteBtnClick is called when an truck's delete button is clicked
// Remove the truck from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr('data-id');
  API.deleteItem(idToDelete).then(function() {
    refreshTrucks();
  });
};

var handleEditBtnClick = function() {
  var truckId = $(this).attr('data');
  API.getItems(truckId).then(function(data) {
    $('#edit-name').val(data.name);
    $('#edit-city').val(data.city);
    $('#edit-state').val(data.state);
    $('#edit-country').val(data.country);
    $('#edit-phone').val(data.phone_number);
    $('#edit-img').val(data.img_url);
    $('#edit-description').val(data.description);
  });
};

var handleEditSubmit = function() {
  var id = $('#edit-submit').attr('data');
  var name = $('#edit-name').val();
  var city = $('#edit-city').val();
  var state = $('#edit-state').val();
  var country = $('#edit-country').val();
  var phone = $('#edit-phone').val();
  var img = $('#edit-img').val();
  var description = $('#edit-description').val();
  var payload = {
    id: id,
    name: name,
    city: city,
    state: state,
    country: country,
    phone_number: phone,
    img_url: img,
    description: description
  };

  API.updateTruck(payload).then(function() {
    console.log(payload);
    window.location.href = '/trucks/' + payload.id;
  });
};

// Add event listeners to the submit and delete buttons
refreshTrucks();
$submitBtn.on('click', handleFormSubmit);
$itemList.on('click', '.delete', handleDeleteBtnClick);
$('#edit-truck').on('click', handleEditBtnClick);
$('#edit-submit').on('click', handleEditSubmit);
