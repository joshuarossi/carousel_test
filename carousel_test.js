if (Meteor.isClient) {
    Session.setDefault({'button_hidden': true});
    Template.carousel.rendered = function () {
        $('#carousel').slick({
            dots: false,
            arrows: true,
            draggable: true,
	    prevArrow: '<i class="fa fa-chevron-left"></i>',
	    nextArrow: '<i class="fa fa-chevron-right"></i>'
        });
    };
    Template.pageOne.helpers({
        'buttonHidden': function () {
            return Session.get('button_hidden')}
    });

    Template.carousel.events({
        'mouseenter #carousel': function () {
            Session.set({'button_hidden': false});
            console.log(Session.get('button_hidden'))
        },
        'mouseleave #carousel': function () {
            Session.set({'button_hidden': true});
            console.log(Session.get('button_hidden'))
        }
    })
}
