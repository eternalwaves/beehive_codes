function removeError(notice, obj) {
    $(notice).html("");
    $(notice).removeClass("success");
    $(notice).hide();
    $(obj).removeClass("error");
}

Template.questionnaireForm.events({
    "submit #questionnaire-form": function (event, t) {
        event.preventDefault();
        // retrieve the input field values
        var notice = $("#questionnaire-notice"),
            emailParts = {
                name: "",
                email: "",
                subject: "Website Design Questionnaire",
                message: ""
            },
            questionnaireFields,
            n,
            value,
            regEx,
            emailOptions;

        function displayError(message, obj) {
            $(notice).html(message);
            $(notice).show();
            $(obj).addClass("error");
            $(obj).focus();
            return false;
        }

        $("#questionnaire-form").each(function () {
            questionnaireFields = $(this).find(":input");
        });
        for (n = 0; n < questionnaireFields.length; n++) {
            value = $(questionnaireFields[n]).val().trim();
            if ($(questionnaireFields[n]).prop("required") && !value) {
                return displayError("Please fill in the highlighted field.", questionnaireFields[n]);
            } else {
                removeError(notice, questionnaireFields[n]);
                switch ($(questionnaireFields[n]).prop("name")) {
                    case "name":
                        if (value.length < 2) {
                            return displayError("Really. Please enter your name.", questionnaireFields[n]);
                        }
                        emailParts["name"] = value;
                        break;
                    case "email":
                        regEx = /^[_a-z0-9\-]+(\.[_a-z0-9\-]+)*@[a-z0-9\-]+(\.[a-z0-9\-]+)*(\.[a-z]{2,9})$/i;
                        if (!regEx.test(value)) {
                            return displayError("Please enter a proper email address.", questionnaireFields[n]);
                        }
                        emailParts["email"] = value;
                        break;
                    case "validation":
                        if (value !== "Elizabeth") {
                            return displayError("Sorry, no robots allowed!", questionnaireFields[n]);
                        }
                        break;
                    default:
                        break;
                }
                if ($(questionnaireFields[n]).prop("required") && $(questionnaireFields[n]).is("textarea") && value.length < 5) {
                    return displayError("Sorry, your answer is too short.", questionnaireFields[n]);
                }
            }
        }
        emailParts["message"] = (function () {
            var theMessage = "<ol>",
                theElement,
                theValue,
                theLabel;

            for (n = 0; n < questionnaireFields.length; n++) {
                theElement = $(questionnaireFields[n]);
                theValue = $(theElement).val().trim();
                if (theValue) {
                    theLabel = $("label[for=" + $(theElement).attr("id") + "]");
                    if (theLabel.length > 0) {
                        if (theMessage.length > 4 && theMessage.slice(-5) !== "</li>") {
                            theMessage += "</li>";
                        }
                        if (($(questionnaireFields[n-1]).prop("name") === "goals" ||
                            $(questionnaireFields[n-1]).prop("name") === "competition" ||
                            $(questionnaireFields[n-1]).prop("name") === "action" ||
                            $(questionnaireFields[n-1]).prop("name") === "sitesyoulike") &&
                            theMessage.slice(-5) !== "</ul>") {
                            theMessage += "</ul>";
                        }
                        theMessage += "<li><p><strong>" + $(theLabel).html() + "</strong></p>";
                    }
                    if ($(theElement).prop("type") === "radio") {
                        if ($(questionnaireFields[n-1]).prop("name") !== $(theElement).prop("name")) {
                            theMessage += "<p>";
                        }
                        if ($(theElement).prop("checked")) {
                            theMessage += "<strong>" + theValue + "</strong> ";
                        } else {
                            theMessage += theValue + " ";
                        }
                        if ($(questionnaireFields[n+1]).prop("name") !== $(theElement).prop("name")) {
                            theMessage += "</p>";
                        }
                    } else if ($(theElement).prop("name") === "goals" ||
                        $(theElement).prop("name") === "competition" ||
                        $(theElement).prop("name") === "actions" ||
                        $(theElement).prop("name") === "sitesyoulike") {
                        if ($(questionnaireFields[n-1]).prop("name") !== $(theElement).prop("name")) {
                            theMessage += "<ul>";
                        }
                        theMessage += "<li>" + theValue + "</li>";
                        if ($(questionnaireFields[n+1]).prop("name") !== $(theElement).prop("name")) {
                            theMessage += "</ul>";
                        }
                    } else if ($(theElement).prop("name") !== "validation" &&
                        !$(theElement).is("button")) {
                        theMessage += "<p>" + theValue + "</p>";
                    }
                    if (n === questionnaireFields.length - 1) {
                        theMessage += "</li>";
                    }
                }
            }
            theMessage += "</ol>";
            return theMessage;
        })();
        emailOptions = {
            to: "elizabeth@beehive.codes",
            from: emailParts["name"] + " <" + emailParts["email"] + ">",
            subject: emailParts["subject"],
            html: emailParts["message"]
        };
        Meteor.call("sendEmail", emailOptions);
        $.each(questionnaireFields, function (index, element) {
            if ($(element).prop("type") === "radio") {
                $(element).prop("checked", false);
            } else {
                $(element).val("");
            }
            removeError(notice, element);
        });
        $(notice).addClass("success");
        $(notice).html("Thank you. Your message has been sent.");
        $(notice).show();
    },

    "reset #questionnaire-form" : function (event, t) {
        var notice = $("#questionnaire-notice"),
            questionnaireFields;

        $("#questionnaire-form").each(function () {
            questionnaireFields = $(this).find(":input");
        });

        $.each(questionnaireFields, function (index, element) {
            if ($(element).prop("type") === "radio") {
                $(element).prop("checked", false);
            } else {
                $(element).val("");
            }
            removeError(notice, element);
        });
    }
});