Meteor.publish("pages", function () {
    return Pages.find(
        {},
        {sort: {order: 1}}
    );
});
Meteor.publish("social", function () {
    return Social.find(
        {},
        {sort: {_id: 1}}
    );
});
Meteor.publish("work", function () {
    return Work.find(
        {},
        {sort: {order: -1}}
    );
});
Meteor.publish("allUsers", function () {
    return Meteor.users.find();
});