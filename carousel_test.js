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
    //Handles the transition effect upon jackpot change
    var toggle = new ReactiveVar(0);
    function transitionEffect () {
        Session.set('selected', true);
        Meteor.setTimeout(function () {
            Session.set('selected', false);
        }, 250);
    }
    Tracker.autorun(function () {
        if (toggle.get() > 0){
            transitionEffect();
        }
    });
    var query = jackpot.find({_id: 'a'});
    var handle = query.observeChanges({
        changed: function () {
            toggle.set(toggle.get() + 1);
        }
    });

    //Adds the carousel when the template has rendered
    Template.carousel.rendered = function () {
        $('#carousel').slick({
            dots: false,
            arrows: true,
            draggable: true,
	    prevArrow: '<i class="fa fa-chevron-left"></i>',
	    nextArrow: '<i class="fa fa-chevron-right"></i>'
        });
    };
    Template.carousel.helpers({
        'selected': function () {
            return Session.get('selected')
        }
    });

    //Sets the visibility on the nav buttons based on hover
    Template.pageOne.helpers({
        'jackpot': function () {
            jackpot_subscription = Meteor.subscribe('jackpot_publish');
            if (jackpot_subscription.ready()){
                return +jackpot.findOne({_id: 'a'}).value.toFixed(2);
            }
        }
    });

    //Simple form to change the jackpot amount (increment by 20%)
    Template.donate_form.events({
        'submit form': function(){
            event.preventDefault();
            var donation = event.target.donation.value * 0.20;
            jackpot.update({_id: 'a'}, {$inc: {value: donation}});
            event.target.donation.value = "";
        }
    });
}