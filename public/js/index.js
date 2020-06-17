//Login functionality
$('#loginBtn').on('click', function(event) {
  event.preventDefault();

  var userLogin = {
    username: $('#username')
      .val()
      .trim(),
    password: $('#password')
      .val()
      .trim(),
  };

  $.ajax('/api/user', {
    type: 'POST',
    data: userLogin,
  }).then(function() {
    location.reload();
  });
});

// The API object contains methods for each kind of request we'll make
var API = {
  searchTrucks: function(payload) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json',
      },
      url: 'api/search',
      type: 'POST',
      data: JSON.stringify(payload),
    });
  },
  getTrucks: function() {
    return $.ajax({
      url: 'api/trucks/limit',
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

function generateModalTemplate(truck) {
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
    src: truck.img_url,
    alt: 'truck ' + truck.id,
  });
  var $h3 = $('<h3>')
    .addClass('text-white text-center text-block')
    .text(truck.name);
  var $d5 = $('<div>')
    .addClass('bottom')
    .append($h3);
  var $d3b = $('<div>').append([$img, $d5]);
  var $d2 = $('<div>')
    .attr({
      class: 'portfolio-item mx-auto',
      'data-toggle': 'modal',
      'data-target': '#portfolioModal' + truck.id,
    })
    .append([$d3a, $d3b]);
  var $d1 = $('<div>')
    .addClass('col-md-6 col-lg-4 mb-5')
    .append($d2);
  return $d1;
}

function generateModalData(truck) {
  var items = truck.menu_items;
  var $items = [];

  items.forEach((item) => {
    var $itemSpan = $('<span>').text(item.name + ': $' + item.price);
    var $itemList = $('<li>')
      .attr({
        'data-id': item.id,
        class: 'list-group-item',
      })
      .append($itemSpan);
    $items.push($itemList);
  });

  var $ul = $('<ul>')
    .attr({ id: 'item-list', class: 'item-group' })
    .append($items);
  var $p = $('<p>')
    .addClass('mb-5')
    .text(truck.description);
  var $loc = $('<p>')
    .addClass('mb-5')
    .text(
      truck.city +
        ', ' +
        truck.state +
        ' ' +
        truck.country +
        ' ' +
        truck.phone_number
    );
  var $d9a = $('<div>').addClass('divider-custom-line');
  var $i = $('<i>').addClass('fas fa-star');
  var $d9b = $('<div>')
    .addClass('divider-custom-icon')
    .append($i);
  var $d9c = $('<div>').addClass('divider-custom-line');

  var $h2 = $('<h2>')
    .addClass('portfolio-modal-title text-secondary mb-0')
    .text(truck.name);

  var $d8 = $('<div>')
    .addClass('divider-custom')
    .append([$d9a, $d9b, $d9c]);

  var $d7 = $('<div>')
    .addClass('col-lg-8')
    .append([$h2, $d8, $loc, $p, $ul]);

  var $d6 = $('<div>')
    .addClass('row justify-content-center')
    .append($d7);

  var $d5 = $('<div>')
    .addClass('container')
    .append($d6);

  var $d4 = $('<div>')
    .addClass('modal-body text-center')
    .append($d5);

  var $ibutton = $('<i>').addClass('fas fa-times');

  var $ispan = $('<span>')
    .attr({ 'aria-hidden': 'true' })
    .append($ibutton);

  var $button = $('<button>')
    .attr({
      class: 'close',
      type: 'button',
      'data-dismiss': 'modal',
      'aria-label': 'Close',
    })
    .append($ispan);

  var $d3 = $('<div>')
    .addClass('modal-content')
    .append([$d4, $button]);

  var $d2 = $('<div>')
    .attr({ class: 'modal-dialog modal-xl', role: 'document' })
    .append($d3);

  var $d1 = $('<div>')
    .attr({
      class: 'portfolio-modal modal fade list-group',
      id: 'portfolioModal' + truck.id,
      tabindex: '-1',
      role: 'dialog',
    })
    .append($d2);

  return $d1;
}

// refreshTrucks gets new trucks from the db and repopulates the list
var refreshTrucks = function() {
  API.getTrucks().then(function(data) {
    var $truckModalTemplate = data.map(generateModalTemplate);
    var $truckData = data.map(generateModalData);

    $('#truck-list').empty();
    $('#truck-list-modal').empty();
    $('#truck-list-modal').append($truckModalTemplate);
    $('#truck-list').append($truckData);
  });
};

// handleFormSubmit is called whenever we submit a new truck
// Save the new truck to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var payload = {
    term: $('#search-term').val(),
  };

  API.searchTrucks(payload).then(function(data) {
    var $truckModalTemplate = data.map(generateModalTemplate);
    var $truckData = data.map(generateModalData);

    $('#truck-list').empty();
    $('#truck-list-modal').empty();
    $('#truck-list-modal').append($truckModalTemplate);
    $('#truck-list').append($truckData);
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
$('#submit').on('click', handleFormSubmit);
$('#truck-list').on('click', '.delete', handleDeleteBtnClick);
