Template.singlePost.helpers({
    shareData: function() {
        var name = this.authorName(),
            thumbnail = (this.featureImg) ? this.featureImg : "/img/og_image.jpg";
        return {
            title: smartQuotes(this.title),
            site_name: siteTitle,
            author: function () {
                return name;
            },
            thumbnail: function () {
                return thumbnail;
            },
            description: this.description
        }
    },
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
    title: function() {
        return smartQuotes(this.title);
    },
    html: function () {
        return htmlSmartQuotes(this.html());
    }
});

Template.singlePost.rendered = function () {
    SEO.setMeta('name="description"', this.data.description);
};