Meteor.startup(function() {
});
Meteor.methods({
    sendEmail: function (options) {
        check(options, {
            from: String,
            to: String,
            subject: String,
            text: Match.Optional(String),
            html: Match.Optional(String)
        });

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send(options);
    },
    tidy: function (input) {
        var tidy = Meteor.npmRequire("htmltidy").tidy;
        this.unblock();

        tidy(input, function (error, html) {
            console.log(error);
            return html;
        });
    }
});