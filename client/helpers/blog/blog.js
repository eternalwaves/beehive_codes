Blog.config({
    blogIndexTemplate: "blog",
    blogShowTemplate: "singlePost",
    blogNotFoundTemplate: "notFound",
    syntaxHighlighting: true,
    title: "Beehive.codes",
    description: "The blog of web and application developer and designer Elizabeth Kilrain.",
    comments: {
        disqusShortname: "beehivecodes"
    }
});

Template.blog.helpers({
    username: function () {
        var name = this.authorName(),
            data;
        if (data = Meteor.users.findOne({username: name})) {
            return data.username;
        } else if (data = Meteor.users.findOne({"profile.name": name})) {
            return data.username;
        }
        return null;
    },
    title: function () {
        return smartQuotes(this.title);
    },
    excerpt: function () {
        return htmlSmartQuotes(this.excerpt);
    }
});

Template.blog.rendered = function () {
    revertQuotes($(".e-content code"), $(".e-content pre"));
    SEO.setTitle("Blog | " + siteTitle);
    SEO.setMeta('name="description"', "The blog of web and application developer and designer Elizabeth Kilrain.");
};