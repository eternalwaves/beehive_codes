Template.displayUserProfile.helpers({
    name: function () {
        return this.profile.name;
    },
    emails: function () {
        var emails = this.emails,
            email,
            hasPublic = false;

        emails.forEach(function(email) {
            if (email.public) {
                hasPublic = true;
            }
        });

        if (hasPublic) {
            return emails;
        }

        return;
    },
    about: function () {
        return htmlSmartQuotes(this.profile.about);
    }
});