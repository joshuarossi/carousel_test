if (Meteor.isClient) {
    Session.setDefault({'button_hidden': true});
    Template.carousel.rendered = function () {
        $('#carousel').slick({
            dots: false,
            arrows: true,
            draggable: true,
            prevArrow: '<button type="button" class="slick-prev {{#if buttonHidden}}.prev_hidden{{/if}}">Previous</button>',
            nextArrow: '<button type="button" class="slick-next">Next</button>'
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