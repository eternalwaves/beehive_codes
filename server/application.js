Meteor.startup(function() {
});
Meteor.methods({
    sendEmail: function (to, from, subject, text) {
        check([to, from, subject, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        });
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