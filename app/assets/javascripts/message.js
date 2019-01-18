$(function(){
  function buildHTML(message){
    var date = new Date()
    var url = message.image.url
    var image = url == null ? '' : '<img class="lower-message__image" src= '+ url + '/>';
    var html = `<div class='message'>
                  <div class='upper-message'>
                    <div class='upper-message__user-name'>
                      ${message.user_name}
                    </div>
                  <div class='upper-message__date'>
                    ${ date.getFullYear() }/${ ("0"+(date.getMonth() + 1)).slice(-2) }/${ ("0"+date.getDate()).slice(-2) }  ${ ("0"+date.getHours()).slice(-2) }:${ ("0"+date.getMinutes()).slice(-2) }
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
      var h = $('.messages').get(0).scrollHeight;
      $('.messages').append(html)
      $('.form__message').val('')
      $('#message_image').val('')
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({
        scrollTop: h
      })
    })
    .fail(function(){
      alert('メッセージを入力してください。');
      $('.form__submit').prop('disabled', false);
    })
  })
});
