// This is for the user page

$(function() {
  var users = new Firebase('https://contact-me.firebaseio.com/users');
  var currentUser = getURLParam(window.location,"user");
  var $checkStatus = $('#checkStatus');
  var serverUrl = 'http://localhost:3000/contact/';

  if(!currentUser) {
    $('#alertStatus').text(`No such user found`);
    $checkStatus.prop('disabled', true);
  }

  var $currentUserKey;

  users.orderByChild("name").equalTo(currentUser).on("child_added", function(snap) {

    $currentUserKey = snap.key();

    $checkStatus.prop('checked', snap.val().isActive);

    $('.userName').text(`Welcome ${snap.val().name.capitalise()}!`);
    var mq = snap.child("messageQueue");
    // $('.msgCount').text(`You have ${mq.numChildren()} new messages`);
        $('#alertStatus').text(`You have ${mq.numChildren()} messages.`);
    var numMessages = 0;
    mq.forEach(function(msg) {
      numMessages++;
      // var msgBox = `<h5 class="list-group-item-heading">Message ${numMessages}</h5><p class="list-group-item-text">${msg.val().body}</p>`
      // $('.messageDiv > .list-group').append(msgBox);
      var messageRow = `<tr><td>Message ${numMessages}</td><td>${moment(msg.val().timestamp)}</td><td>${msg.val().body}</td></tr>`;
      $('.table.table-condensed.messageDiv').append(messageRow);
    });
  });

  // Get tweets
  $.get(serverUrl + currentUser).done((data) => {
    data.body.forEach((tweet) => {
      var messageRow = `<tr><td>Tweet from ${tweet.from}</td><td>${moment(tweet.date)}</td><td>${tweet.message}</td></tr>`;
      $('.table.table-condensed.messageDiv').append(messageRow);
      console.log(tweet);
    });
  }).fail((err) => {
    console.log(err);
  });

  $checkStatus.on('click', function(e) {
    var userRef = users.child($currentUserKey);
    userRef.child('isActive').set($checkStatus.prop('checked'));
  });
});
