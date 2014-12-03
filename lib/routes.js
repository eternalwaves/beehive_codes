Router.configure({
    layoutTemplate: "layout",
    loadingTemplate: "loading",
    notFoundTemplate: "notFound",
    fastRender: true,
    waitOn: function () {
        return [Meteor.subscribe("pages"), Meteor.subscribe("social")];
    }
});
Router.map(function () {
    this.route("home", {
        // overrides default "/home"
        path: "/",
        data: function () {
            return Pages.findOne({route: "home"});
        },
        waitOn: function () {
            return Meteor.subscribe("pages", {route: "home"});
        }
    });

    this.route("work", {
        // setting the data context
        data: function () {
            var data = {items: Work.find()};
            return data;
        },
        waitOn: function () {
            return [
                Meteor.subscribe("work", {fields: {description: 0, images: 0}}),
                Meteor.subscribe("pages", {route: "work"})
            ];
        }
    });

    this.route("workCategory", {
        template: "work",
        path: "/work/category/:category",
        data: function () {
            var category = this.params.category,
                data = {
                    items: Work.find({categories: category}, {fields: {description: 0, images: 0}}),
                    currentCat: category
                };
            if (data.items) {
                return data;
            }
            return;
        },
        waitOn: function () {
            return [
                Meteor.subscribe("work", {categories: this.params.category}),
                Meteor.subscribe("pages", {route: "work"})
            ];
        }
    });

    this.route("portfolioItem", {
        path: "/work/:slug",
        data: function () {
            return Work.findOne({slug: this.params.slug});
        },
        waitOn: function () {
            return Meteor.subscribe("work", {slug: this.params.slug});
        }
    });

    this.route("contact", {
        data: function () {
            return Pages.findOne({route: "contact"});
        },
        waitOn: function () {
            Meteor.subscribe("pages", {route: "contact"});
        }
    });

    this.route("admin");

    this.route("adminProfile", {
        path: "/admin/profile",
    });

    this.route("userProfile", {
        path: "/profile/:username",
        data: function () {
            return Meteor.users.findOne({username: this.params.username});
        },
        waitOn: function () {
            return Meteor.subscribe("allUsers", {fields: {services: 0}});
        }
    });
/*
    this.route("editProfile", {
        path: "/admin/profile/edit"
    });
*/
    this.route("changePassword", {
        path: "/admin/profile/change-password"
    });
});