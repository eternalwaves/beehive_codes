this.Config = (function(_super) {
    __extends(Config, _super);

    function Config() {
        return Config.__super__.constructor.apply(this, arguments);
    }

    Config._collection = new Meteor.Collection("blog_config");

    return Config;

})(Minimongoid);