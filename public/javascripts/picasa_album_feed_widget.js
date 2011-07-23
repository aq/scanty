(function($){

  var picasaFeedWidget = $.picasaFeedWidget = {} ;

  picasaFeedWidget.getAndDisplayPictures = function(element) {
    picasaFeedWidget.getPictures( function(data) {
      var pictures = data.slice(0,5);
      $.each(pictures, function(){
          console.log(this);
        var picture = this,
            scaledSize = picasaFeedWidget.scaleSize({
              maximumWidth : 138, 
              maximumHeight : 138, 
              currentWidth : picture.gphoto$width.$t, 
              currentHeight : picture.gphoto$height.$t
            });
        element.prepend('<li><img src="'+picture.content.src +'" width='+scaledSize.width +' height='+scaledSize.height+' /></li>')
      });
    });
  };

  picasaFeedWidget.getPictures = function(callback) {
    var url = 'http://picasaweb.google.com/data/feed/api/user/antoinequhen/albumid/5627394203495622289?alt=json';
    $.ajax(url, { 
      success: function(data) {
        callback(data.feed.entry); 
      },
      dataType: 'jsonp'
    });
  };

  // Set the good dimention for the picture.
  picasaFeedWidget.scaleSize = function(dimensions) {
    var ratio = dimensions.currentHeight / dimensions.currentWidth;
    if (dimensions.currentWidth >= dimensions.maximumWidth) {
      dimensions.currentWidth = dimensions.maximumWidth;
      dimensions.currentHeight = dimensions.currentWidth * ratio;
    } else if (dimensions.currentHeight >= dimensions.maximumHeight) {
      dimensions.currentHeight = dimensions.maximumHeight;
      dimensions.currentWidth = dimensions.currentHeight / ratio;
    }
    return {
      width : Math.floor(dimensions.currentWidth),
      height : Math.floor(dimensions.currentHeight)		    
    };
  };

  // Declaration of the jQuery plugin.
  $.fn.picasaFeedWidget = function(){
    return this.each(function(){            
        picasaFeedWidget.getAndDisplayPictures($(this));
    });
  }; 

})(jQuery);

$(document).ready(function(){
  $("#picasa-ruby-feed").picasaFeedWidget()
});
