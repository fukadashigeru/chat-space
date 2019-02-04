$(function(){
  setInterval(update, 10000);
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href + ''
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.form__message').val('')
      $('#message_image').val('')
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({
        scrollTop: $('.messages').get(0).scrollHeight
      })
    })
    .fail(function(){
      alert('メッセージを入力してください。');
      $('.form__submit').prop('disabled', false);
    })
  });
});
function update(){
  var last_message_id = $('.message:last').attr('value');
  $.ajax({
    url: location.href,
    type: 'GET',
    data: {
      last_message_id: last_message_id
    },
    dataType: 'json'
  })
  .done(function(new_messages) {
    new_messages.forEach(function(message){
      var html = buildHTML(message);
      $('.messages').append(html)
    });
  })
}
function buildHTML(message){
  var date = new Date()
  var url = message.image_url
  var created_at = message.created_at
  var image = url == null ? '' : '<img class="lower-message__image" src= '+ url + '/>';
  var html = `<div class='message' value=${message.id}>
                <div class='upper-message'>
                  <div class='upper-message__user-name'>
                    ${message.user_name}
                  </div>
                <div class='upper-message__date'>
                  ${ created_at }
                </div>
              </div>
              <div class='lower-meesage'>
                <p class='lower-message__content'>
                  ${message.content}
                </p>
                ${message.image}
              </div>`
  return html;
}
