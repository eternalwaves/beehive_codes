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
        }
    });

    this.route("work", {
        // setting the data context
        data: function () {
            return {items: Work.find()};
        },
        waitOn: function () {
            return Meteor.subscribe("work", {fields: {description: 0, images: 0}});
        },
        onAfterAction: function () {
            // The SEO object is only available on the client.
            // Return if you define your routes on the server, too.
            if (!Meteor.isClient) {
                return;
            }
            SEO.set({
                title: "Work | " + siteTitle,
                meta: {
                    description: "The design portfolio of web and application developer and designer Elizabeth Kilrain."
                },
                og: {
                    title: "Work | " + siteTitle,
                    description: "The design portfolio of web and application developer and designer Elizabeth Kilrain.",
                }
            });
        }
    });

    this.route("workCategory", {
        template: "work",
        path: "/work/category/:category",
        data: function () {
            var category = this.params.category,
                data = {
                    items: Work.find({categories: category}, {fields: {description: 0, images: 0}}),
                    currentCat: category.charAt(0).toUpperCase() + category.slice(1)
                };
            if (data.items) {
                return data;
            }
            return;
        },
        waitOn: function () {
            return Meteor.subscribe("work", {categories: this.params.category});
        },
        onAfterAction: function () {
            var category;
            // The SEO object is only available on the client.
            // Return if you define your routes on the server, too.
            if (!Meteor.isClient) {
                return;
            }
            if (this.ready()) {
                category = this.data().currentCat;
                SEO.set({
                    title: "Work: " + category + " | " + siteTitle,
                    meta: {
                        description: "The design portfolio of web and application developer and designer Elizabeth Kilrain."
                    },
                    og: {
                        title: "Work: " + category + " | " + siteTitle,
                        description: "The design portfolio of web and application developer and designer Elizabeth Kilrain.",
                    }
                });
            }
        }
    });

    this.route("portfolioItem", {
        path: "/work/:slug",
        data: function () {
            return Work.findOne({slug: this.params.slug});
        },
        waitOn: function () {
            return Meteor.subscribe("work", {slug: this.params.slug});
        },
        onAfterAction: function () {
            var title,
                description,
                slug,
                image;
            // The SEO object is only available on the client.
            // Return if you define your routes on the server, too.
            if (!Meteor.isClient) {
                return;
            }
            if (this.ready()) {
                title = this.data().title;
                description = this.data().excerpt;
                slug = this.data().slug;
                image = this.data().thumb;
                SEO.set({
                    title: title + " | " + siteTitle,
                    meta: {
                        description: description
                    },
                    og: {
                        title: title + " | " + siteTitle,
                        description: description,
                        image: "https://beehive.codes/portfolio/thumbs/" + image
                    }
                });
            }
        }
    });

    this.route("contact", {
        data: function () {
            return Pages.findOne({route: "contact"});
        },
        onAfterAction: function () {
            // The SEO object is only available on the client.
            // Return if you define your routes on the server, too.
            if (!Meteor.isClient) {
                return;
            }
            SEO.set({
                title: "Contact | " + siteTitle,
                meta: {
                    description: "Contact web and application developer and designer Elizabeth Kilrain."
                },
                og: {
                    title: "Contact | " + siteTitle,
                    description: "Contact web and application developer and designer Elizabeth Kilrain.",
                }
            });
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