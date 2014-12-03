Template.contact.helpers({
    content: function () {
        return htmlSmartQuotes(this.content);
    }
});

Template.contactForm.events({
    "submit #contact-form": function (event, t) {
        event.preventDefault();
        // retrieve the input field values
        var notice = $("#contact-notice"),
            contactFields = {
                name: $("#contact-name"),
                email: $("#contact-email"),
                subject: $("#contact-subject"),
                message: $("#contact-message")
            },
            emailParts = {
                name: $(contactFields["name"]).val().trim(),
                email: $(contactFields["email"]).val().trim(),
                subject: $(contactFields["subject"]).val().trim(),
                message: $(contactFields["message"]).val().trim()
            },
            regEx;

        function displayError(message, obj) {
            $(notice).html(message);
            $(notice).show();
            $(obj).addClass("error");
            $(obj).focus();
            return false;
        }
        function removeError(obj) {
            $(notice).html("");
            $(notice).removeClass("success");
            $(notice).hide();
            $(obj).removeClass("error");
        }

        for (prop in emailParts) {
            if (!emailParts[prop]) {
                return displayError("All fields are required.", contactFields[prop]);
            } else {
                removeError(contactFields[prop]);
                switch (prop) {
                    case "name":
                        if (emailParts[prop].length < 2) {
                            return displayError("Really. Please enter your name.", contactFields[prop]);
                        }
                        break;
                    case "email":
                        regEx = /^[_a-z0-9\-]+(\.[_a-z0-9\-]+)*@[a-z0-9\-]+(\.[a-z0-9\-]+)*(\.[a-z]{2,9})$/i;
                        if (!regEx.test(emailParts[prop])) {
                            return displayError("Please enter a proper email address.", contactFields[prop]);
                        }
                        break;
                    case "subject":
                        if (emailParts[prop].length < 2) {
                            return displayError("Please enter a proper subject.", contactFields[prop]);
                        }
                        break;
                    case "message":
                        if (emailParts[prop].length < 10) {
                            return displayError("Please enter a proper message.", contactFields[prop]);
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        Meteor.call("sendEmail",
            "elizabeth@beehive.codes",
            emailParts["name"] + " <" + emailParts["email"] + ">",
            emailParts["subject"],
            emailParts["message"]
        );
        $(notice).addClass("success");
        $(notice).html("Thank you. Your message has been sent.");
        $(notice).show();
    },

    "reset #contact-form" : function (event, t) {
        var notice = $("#contact-notice"),
            contactFields = {
                name: $("#contact-name"),
                email: $("#contact-email"),
                subject: $("#contact-subject"),
                message: $("#contact-message")
            },
            prop;
        for (prop in contactFields) {
            removeError($(contactFields[prop]));
        }
    }
});