var siteTitle = "Beehive.codes";
var siteURL = "https://beehive.codes";

Meteor.startup(function() {
    reCAPTCHA.config({
        publickey: "6LcVcP4SAAAAAKNZGCqV8eWQT4CZz8niwZbLVzD6"
    });
    WebFontConfig = {
        google: { families: [ "Neuton:400,700,400italic:latin", "Source+Sans+Pro:400,400italic,700,700italic:latin" ] }
    };
    (function() {
        var wf = document.createElement("script"),
            tiny = document.createElement("script"),
            s = document.getElementsByTagName("script")[0];

        wf.src = ("https:" == document.location.protocol ? "https" : "http") +
            "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
        wf.type = "text/javascript";
        wf.async = "true";
        s.parentNode.insertBefore(wf, s);

        tiny.src = ("https:" == document.location.protocol ? "https" : "http") + "://tinymce.cachefly.net/4.1/tinymce.min.js";
        tiny.type = "text/javascript";
        tiny.async = "true";
        s.parentNode.insertBefore(tiny, s);
    })();
    htmlSmartQuotes = function (html) {
        return html = (html||'').replace(/\b'\b/g, "\&rsquo;")      // Apostrophes
            .replace(/'(?=[^>]*<)\b/g, "&lsquo;")                   // Opening singles
            .replace(/\b([\.\?\!,]*)(?=[^>]*<)'/g, "$1\&rsquo;")    // Closing singles
            .replace(/"(?=[^>]*<)\b/g, "\&ldquo;")                  // Opening doubles
            .replace(/\b([\.\?\!,]*)(?=[^>]*<)"/g, "$1\&rdquo;")    // Closing doubles
            .replace(/\.\.\./g,  "\&hellip;")                       // ellipsis
            .replace(/--/g,  "\&mdash;");                           // em-dashes
    };
    smartQuotes = function (text) {
        return text = text.replace(/\b'\b/g, "\u2019")  // Apostrophes
            .replace(/'\b/g, "\u2018")                  // Opening singles
            .replace(/\b'/g, "\u2019")                  // Closing singles
            .replace(/"\b/g, "\u201c")                  // Opening doubles
            .replace(/\b"/g, "\u201d")                  // Closing doubles
            .replace(/\.\.\./g,  "\u2026")              // ellipsis
            .replace(/--/g,  "\u2014");                 // em-dashes
    };
});

UI.registerHelper("baseURL", function () {
    return siteURL;
});

UI.registerHelper("formatTime", function (context, format) {
    if (context)
        if (!format)
            format = "dddd, MMMM Do YYYY, h:mm:ss a";
        return moment(new Date(context)).format(format);
});

UI.registerHelper("getSiteTitle", function () {
    return siteTitle;
});

Accounts.ui.config({
/*    requestPermissions: {
        facebook: ['user_likes'],
        github: ['user', 'repo']
    },
    requestOfflineToken: {
        google: true
    },*/
    passwordSignupFields: "USERNAME_AND_EMAIL"
});
