jackpot = new Meteor.Collection('jackpot');

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (jackpot.find().count() === 0) {
            jackpot.insert({_id:'a', 'value': 0});
        }
        Meteor.publish('jackpot_publish', function (){
            return jackpot.find({_id: 'a'})
        });
    });
}

if (Meteor.isClient) {
    Template.carousel.rendered = function () {
        $('#carousel').slick({
            dots: false,
            arrows: true,
            draggable: true,
            fade: true,
	    prevArrow: '<i class="fa fa-chevron-left"></i>',
	    nextArrow: '<i class="fa fa-chevron-right"></i>'
        });
    };
    Template.carousel.helpers({
        'selected': function () {
            return Session.get('selected')
        }
    });
    Template.carousel.events({
        'mouseenter #carousel': function () {
            Session.set({'button_hidden': false});
        },
        'mouseleave #carousel': function () {
            Session.set({'button_hidden': true});
        }
    });
    Template.pageOne.helpers({
        'buttonHidden': function () {
            return Session.get('button_hidden')},
        'jackpot': function () {
            jackpot_subscription = Meteor.subscribe('jackpot_publish');
            if (jackpot_subscription.ready()){
                return +jackpot.findOne({_id: 'a'}).value.toFixed(2);
            }
        }
    });
    Template.donate_form.events({
        'submit form': function(){
            event.preventDefault();
            var donation = event.target.donation.value * 0.20;
            jackpot.update({_id: 'a'}, {$inc: {value: donation}});
            event.target.donation.value = "";
        }
    });
    Tracker.autorun(function () {
        jackpot.findOne({'_id': 'a'});
        Session.set('selected', true);
        Meteor.setTimeout(function () {
            Session.set('selected', false);
        }, 250);
    });
}
