var siteTitle = "Beehive.codes";
var siteURL = "https://beehive.codes";

Meteor.startup(function() {
    WebFontConfig = {
        google: { families: [ "Neuton:400,700,400italic:latin", "Source+Sans+Pro:400,400italic,700,700italic:latin" ] }
    };
    (function() {
        var wf = document.createElement("script"),
            s = document.getElementsByTagName("script")[0];

        wf.src = ("https:" == document.location.protocol ? "https" : "http") +
            "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
        wf.type = "text/javascript";
        wf.async = "true";
        s.parentNode.insertBefore(wf, s);
    })();
    htmlSmartQuotes = function (html) {
        return html = (html||'').replace(/\b'\b/g, "&rsquo;")   // Apostrophes
            .replace(/'(?=[^>]*<)\b/g, "&lsquo;")               // Opening singles
            .replace(/\b([\.\?\!,]*)(?=[^>]*<)'/g, "$1&rsquo;") // Closing singles
            .replace(/"(?=[^>]*<)\b/g, "&ldquo;")               // Opening doubles
            .replace(/\b([\.\?\!,]*)(?=[^>]*<)"/g, "$1&rdquo;") // Closing doubles
            .replace(/\.\.\./g,  "&hellip;")                    // ellipsis
            .replace(/--/g,  "&mdash;");                        // em-dashes
    };
    htmlDumbQuotes = function (html) {
        return html = html.replace(/(&rsquo;)|(&lsquo;)|(\u2018)|(\u2019)/g, "'") // revert to single quotes
            .replace(/(&rdquo;)|(&ldquo;)|(\u201c)|(\u201d)/g, "\"")              // revert to double quotes
            .replace(/(&hellip;)|(\u2026)/g, "...")                         // revert to three dots
            .replace(/(&mdash;)|(\u2014)/g, "--");                          // revert to two dashes
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
    revertQuotes = function (code, pre) {
        var n,
            html;
        for (n = 0; n < code.length; n++) {
            html = $(code[n]).html();
            $(code[n]).html(htmlDumbQuotes(html));
        }
        for (n = 0; n < pre.length; n++) {
            html = $(pre[n]).html();
            $(pre[n]).html(htmlDumbQuotes(html));
        }
    };
    return SEO.config({
        title: "Beehive.codes",
        meta: {
            description: "...development (structure) and design (aesthetics) for the web",
            keywords: "Elizabeth Kilrain, web, application, design, designer, development, developer, San Diego, html, html5, css, css3, php, ruby, rails, javascript, js, meteor, ember, angular, server-side, client-side, front-end",
            author: "Elizabeth Lynn Rakphongphairoj Kilrain"
        },
        og: {
            title: "Beehive.codes",
            description: "...development (structure) and design (aesthetics) for the web",
            url: "https://beehive.codes",
            image: "https://beehive.codes/img/og_image.jpg",
            site_name: "Beehive.codes"
        },
        twitter: {
            url: "https://beehive.codes"
        }
    });
});

UI.registerHelper("baseURL", function () {
    return siteURL;
});

UI.registerHelper("formatDateTime", function (date, format) {
    format = (typeof format === "undefined") ? "" : format;
    if (format) {
        return moment(new Date(date)).tz("America/Los_Angeles").format(format);
    } else {
        return moment(new Date(date)).tz("America/Los_Angeles").format();
    }
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
