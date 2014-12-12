Meteor.startup(function() {
    siteTitle = "Beehive.codes";
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
        html = (html||'').replace(/\b'\b/g, "&rsquo;")   // Apostrophes
            .replace(/'(?=[^>]*<)\b/g, "&lsquo;")               // Opening singles
            .replace(/\b([\.\?\!,]*)(?=[^>]*<)'/g, "$1&rsquo;") // Closing singles
            .replace(/"(?=[^>]*<)\b/g, "&ldquo;")               // Opening doubles
            .replace(/\b([\.\?\!,]*)(?=[^>]*<)"/g, "$1&rdquo;") // Closing doubles
            .replace(/\.\.\./g,  "&hellip;")                    // ellipsis
            .replace(/--/g,  "&mdash;");                        // em-dashes

        // revert everything between <pre></pre> tags
        html = html.replace(/<pre.*?>([\s\S]*?)<\/pre>/gim, function (match, code) {
            html = match.replace(
                code,
                htmlDumbQuotes(code)
            );
            return html;
        });

        // revert everything between <code></code> tags
        html = html.replace(/<code.*?>([\s\S]*?)<\/code>/gim, function (match, code) {
            html = match.replace(
                code,
                htmlDumbQuotes(code)
            );
            return html;
        });
        return html;
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
    return SEO.config({
        title: siteTitle,
        meta: {
            description: "...development (structure) and design (aesthetics) for the web",
            keywords: "Elizabeth Kilrain, web, application, design, designer, development, developer, San Diego, html, html5, css, css3, php, ruby, rails, javascript, js, meteor, ember, angular, server-side, client-side, front-end",
            author: "Elizabeth Lynn Rakphongphairoj Kilrain",
            robots: "index, follow"
        },
        og: {
            type: "website",
            site_name: "Beehive.codes",
            image: "https://beehive.codes/img/og_image.jpg"
        }
    });
});

UI.registerHelper("baseURL", function () {
    return Meteor.absoluteUrl();
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
