$(function() {
  var search_list = $("#user-search-result");


  function appendProduct(user) {
    var html = `<div class='chat-group-user clearfix' id='chat-group-user-22'>
                  <p class='chat-group-user__name'>
                    ${user.name}
                  </p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  }

  function appendNoUser(user) {
    var html = `<div>
                  ${ user }
                </div>`
    search_list.append(html);
  }
  function appendNoInput() {
    var html = ''
    search_list.append(html);
  }
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    var group_id = $("#group_id").text();
    console.log(group_id)
    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: { keyword: input , group_id:group_id},
      dataType: 'json'
    })
    .done(function(users) {
      console.log(users)
      $("#user-search-result").empty();
      if (input.length !== 0){
        if (users.length !== 0) {
          users.forEach(function(user){
            appendProduct(user);
          });
        }
        else {
          appendNoUser("一致するチャットメンバーはありません");
        }
      }
      else{
        appendNoInput();
      }
    })
    // .fail(function() {
    //   alert(input);
    // })
    // })
  });
});

//   $(".search__query").on("keyup", function() {
//     var input = $(".search__query").val();

//     $.ajax({
//       type: 'GET',
//       url: '/products/search',
//       data: { keyword: input },
//       dataType: 'json'
//     })
//     .done(function(products) {
//       console.log("検索中")
//       $(".listview.js-lazy-load-images").empty();
//       console.log(products)
//       if (products.length !== 0) {
//         products.forEach(function(product){
//           appendProduct(product);
//         });
//       }
//       else {
//         appendNoProduct("一致する映画はありません");
//       }
//     })
//     .fail(function() {
//       alert('映画検索に失敗しました');
//     })
//   });
// });
