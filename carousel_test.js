if (Meteor.isClient) {
  Template.carousel.rendered = function() {
    $('#carousel').slick({
      dots: false,
      arrows: true,
      draggable: true
    });
  }
}