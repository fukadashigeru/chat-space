$(function(){
  function buildHTML(message){
    var date = new Date()
    var url = message.image.url
    var created_at = message.created_at
    var image = url == null ? '' : '<img class="lower-message__image" src= '+ url + '/>';
    var html = `<div class='message'>
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
                  ${image}
                </div>`
    return html;
  }
  $('#new_message').on('wwwwturbolinks: submit', function(e){
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
  })
});
