Meteor.startup(function () {
    Meteor.absoluteUrl.defaultOptions.rootUrl = "https://beehive.codes";
});
Accounts.config({
    sendVerificationEmail: true,
    forbidClientAccountCreation: true
});