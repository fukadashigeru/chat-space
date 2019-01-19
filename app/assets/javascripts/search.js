$(function() {

var search_list = $(".listview.js-lazy-load-images");

  function appendProduct(product) {
    var html = `あああああああ`
    search_list.append(html);
  }

  function appendNoProduct(product) {
    var html = `<li>
                  <div class='listview__element--right-icon'>${ product }</div>
                </li>`
    search_list.append(html);
  }

  $(".chat__group_name").on("keyup", function() {
    var input = $(".chat__group_name").val();
    console.log("a")
    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      console.log("検索中")
      $(".listview.js-lazy-load-images").empty();
      if (products.length !== 0) {
        products.forEach(function(product){
          appendProduct(product);
        });
      }
      else {
        appendNoProduct("一致するチャットメンバーはありません");
      }
    })
    // .fail(function() {
    //   alert(input);
    // })
  });
});
