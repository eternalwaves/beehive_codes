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
        },
        onAfterAction: function () {
            // The SEO object is only available on the client.
            // Return if you define your routes on the server, too.
            if (!Meteor.isClient) {
                return;
            }
            SEO.set({
                og: {
                    url: "https://beehive.codes",
                },
                twitter: {
                    url: "https://beehive.codes"
                }
            });
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
        },
        onAfterAction: function() {
            // The SEO object is only available on the client.
            // Return if you define your routes on the server, too.
            if (!Meteor.isClient) {
                return;
            }
            SEO.set({
                title: "Work | Beehive.codes",
                meta: {
                    description: "The design portfolio of web and application developer and designer Elizabeth Kilrain."
                },
                og: {
                    title: "Work | Beehive.codes",
                    description: "The design portfolio of web and application developer and designer Elizabeth Kilrain.",
                    url: "https://beehive.codes/work"
                },
                twitter: {
                    url: "https://beehive.codes/work"
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
            return [
                Meteor.subscribe("work", {categories: this.params.category}),
                Meteor.subscribe("pages", {route: "work"})
            ];
        },
        onAfterAction: function() {
            var category = this.data().currentCat;
            // The SEO object is only available on the client.
            // Return if you define your routes on the server, too.
            if (!Meteor.isClient) {
                return;
            }
            SEO.set({
                title: "Work: " + category + " | Beehive.codes",
                meta: {
                    description: "The design portfolio of web and application developer and designer Elizabeth Kilrain."
                },
                og: {
                    title: "Work: " + category + " | Beehive.codes",
                    description: "The design portfolio of web and application developer and designer Elizabeth Kilrain.",
                    url: "https://beehive.codes/work/category/" + category.toLowerCase()
                },
                twitter: {
                    url: "https://beehive.codes/work/category/" + category.toLowerCase()
                }
            });
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
        onAfterAction: function() {
            var title = this.data().title,
                description = this.data().excerpt,
                slug = this.data().slug,
                image = this.data().thumb;
            // The SEO object is only available on the client.
            // Return if you define your routes on the server, too.
            if (!Meteor.isClient) {
                return;
            }
            SEO.set({
                title: title + " | Beehive.codes",
                meta: {
                    description: description
                },
                og: {
                    title: title + " | Beehive.codes",
                    description: description,
                    url: "https://beehive.codes/work/" + slug,
                    image: "https://beehive.codes/portfolio/thumbs/" + image
                },
                twitter: {
                    url: "https://beehive.codes/work/" + slug
                }
            });
        }
    });

    this.route("contact", {
        data: function () {
            return Pages.findOne({route: "contact"});
        },
        waitOn: function () {
            Meteor.subscribe("pages", {route: "contact"});
        },
        onAfterAction: function() {
            // The SEO object is only available on the client.
            // Return if you define your routes on the server, too.
            if (!Meteor.isClient) {
                return;
            }
            SEO.set({
                title: "Contact | Beehive.codes",
                meta: {
                    description: "Contact web and application developer and designer Elizabeth Kilrain."
                },
                og: {
                    title: "Contact | Beehive.codes",
                    description: "Contact web and application developer and designer Elizabeth Kilrain.",
                    url: "https://beehive.codes/contact"
                },
                twitter: {
                    url: "https://beehive.codes/contact"
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