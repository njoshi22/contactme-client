$(function() {
  var $alert = $('#alertStatus');
  $alert.hide();

  var $btn = $('#btnSubmit');
  var $inputUser = $('#inputUser');
  var $inputMessage = $('#inputMessage');

  var baseUrl = 'http://localhost:3000/contact/';

  $btn.click(function(e) {
    e.preventDefault();

    var $user = $inputUser.val();
    var $msg = $inputMessage.val();

    $.post(baseUrl + $user, {message: $msg})
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
