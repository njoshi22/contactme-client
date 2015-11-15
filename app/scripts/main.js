console.log('\'Allo \'Allo!'); // eslint-disable-line no-console

var type = [];

$(function() {

  var users = new Firebase('https://contact-me.firebaseio.com/users');
  var $list = $('.messageDiv');
  var $demoNav = $('.nav.nav-pills.demo-names');
  var $inputUser = $('#inputUser');
  var $inputMessage = $('#inputMessage');
  var baseUrl = 'http://localhost:3000/contact/';
  var $alert = $('#alertStatus');
  $alert.hide();

  function updateText(text) {
    $inputUser.val(text.toString());
  }

  // Set dummy values
  $inputUser.val("ajinkya");
  $inputMessage.val(`Test message sent at ${Date.now()}`);

  // List all users
  users.on('value', function(snap) {
    snap.forEach(function(user) {

      var userName = `<h5>${user.val().name.toString().capitalise()}</h5>`;

      var ulStart = "<ul>";
      var ulEnd = "</ul>";

      var messageText = "<li>";

      if(user.child("messageQueue").numChildren() > 0) {
        messageText += `<a href='user.html?user=${user.val().name}'>`;
        messageText += "You have messages!";
        messageText += "</a>"
      } else {
        messageText += "No messages";
      }

      messageText += "</li>"

      $list.append(userName);
      $list.append(ulStart);
      $list.append(messageText);
      $list.append(ulEnd);

      // $demoNav.append(`<li role="presentation"><a onClick='updateText(\'mum\')'>${user.val().name}</a></li>`);

    });
  });

  $('#btnSubmit').click(function(e) {
    e.preventDefault();
    $.post(baseUrl + $inputUser.val(), {message: $inputMessage.val()})
    .done(function(data) {
      $alert.text(`${data.status} for ${data.contact_name.capitalise()}`);
      $alert.addClass('alert-success');
      $alert.fadeIn().delay(2000).fadeOut();
    })
    .fail(function(err) {
      $alert.text(err.statusText);
      $alert.addClass('alert-danger');
      $alert.fadeIn().delay(2000).fadeOut();
    });
  });

});
