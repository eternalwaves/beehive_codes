this.Tag = (function(_super) {
    __extends(Tag, _super);

    function Tag() {
        return Tag.__super__.constructor.apply(this, arguments);
    }

    Tag._collection = new Meteor.Collection("blog_tags");

    return Tag;

})(Minimongoid);