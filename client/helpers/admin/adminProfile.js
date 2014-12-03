Template.displayAdminProfile.helpers({
    // set data context
    user: function () {
        return Meteor.user();
    },
    name: function () {
        return this.profile.name;
    },
    emails: function () {
        var emails = this.emails.slice(0);
        // sorting in alphabetical order
        emails.sort(function (a,b) {
            var x = a.address.toLowerCase();
            var y = b.address.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
        emails.map(function ext(email, index) {
            email.index = index;
        });
        return emails;
    },
    about: function () {
        return this.profile.about;
    }
});

Template.displayAdminProfile.rendered = function () {
    $(".toolbar").after("<form id=\"edit-profile-form\" action=\"action\"></form>");
    $("#edit-profile-form").nextAll().appendTo($("#edit-profile-form"));

    $("span#profile-name").addClass("editable");
    $("span.profile-email").addClass("editable");
    $("div#profile-about").addClass("editable");

    $(".toolbar").after("<p class=\"error-message\"></p>");
    $("div#profile-about").after("<button type=\"submit\">Submit</button>\n");

    tinymce.init({
        selector: "span#profile-name",
        inline: true,
        menubar: false,
        toolbar: "undo redo"
    });
    tinymce.init({
        selector: "span.profile-email",
        inline: true,
        menubar: false,
        toolbar: "undo redo"
    });
    tinymce.init({
        selector: "div#profile-about",
        inline: true,
        plugins: [
            "advlist autolink lists link image charmap preview hr anchor",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "template paste textcolor colorpicker textpattern"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        toolbar2: "preview media | forecolor",
        image_advtab: true
    });
}

Template.displayAdminProfile.events({
    // TODO the edit form does not work yet. Functions not yet defined

    "focus #profile-about": function (event, t) {
        event.preventDefault();
        var /*nameField = $("span.profile-name"),
            emailFields = $("span.profile-email"),
            aboutField = $("div#profile-about"),
            */origName = t.data.name,
            origEmails = t.data.emails,
            origAbout = t.data.about,
            n;

        /*if ($(nameField).html() !== origName) {

        }
        for (n = 0; n < emailFields.length; n++) {
            if ($(emailFields[n]) !== origEmails[n]) {

            }
        }*/
        console.log(origName);
        console.log(origEmails);
        console.log(origAbout);
        return false;
    }
});