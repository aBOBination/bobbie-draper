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
  }
};
// refreshTrucks gets new trucks from the db and repopulates the list
var refreshTrucks = function() {
  API.getItems($truckId.attr('id')).then(function(data) {
    var items = data.menu_items;
    var $trucks = items.map(function(payload) {
      var $a = $('<a>').text(payload.name + ': $' + payload.price);
      // .attr('href', '/trucks/' + payload.id);

      var $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': payload.id,
          'truck-id': $truckId.attr('id')
        })
        .append($a);

      var $button = $('<button>')
        .addClass('btn btn-danger float-right delete')
        .text('ｘ');

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

  if (!payload.name || isNaN(payload.price) == true) {
    alert('You must enter a item name and price!');
    return;
  }

  API.postItem(payload).then(function() {
    refreshTrucks();
  });
  // location.reload();
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

// Add event listeners to the submit and delete buttons
refreshTrucks();
$submitBtn.on('click', handleFormSubmit);
$itemList.on('click', '.delete', handleDeleteBtnClick);
