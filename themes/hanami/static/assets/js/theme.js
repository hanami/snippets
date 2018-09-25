(function($){
  $(document).ready(function(){
    $.getJSON("/index.json", function(data) {
      var articles = data["items"];
      var article = articles[Math.floor(Math.random() * articles.length)];
      var link = $("#random-snippet-link");

      link.attr("href", article["url"]);
    });
  });
})(jQuery);

