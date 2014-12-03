Template.singlePost.helpers({
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