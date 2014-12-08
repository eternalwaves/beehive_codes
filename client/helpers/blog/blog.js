Blog.config({
    blogIndexTemplate: "blog",
    blogShowTemplate: "singlePost",
    syntaxHighlighting: true,
    title: "Beehive.codes"
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
};