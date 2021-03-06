const config = {
	"gatsby": {
		"pathPrefix": "/",
		"siteUrl": "https://malgogi.github.io",
		"gaTrackingId": null
	},
	"header": {
		"logoLink": "https://malgogi.github.io",
		"title": "Malgogi 개발일지",
		"githubUrl": "https://github.com/malgogi/malgogi-blog",
		"helpUrl": "",
		"links": [
			{ "text": "", "link": ""}
		],
		"search": {
			"enabled": false,
			"indexName": "",
			"algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
			"algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
			"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
		}
	},
	"sidebar": {
		"forcedNavOrder": [
			"/introduction",
		],
		"collapsedNav": [
		],
		"links": [
			{ "text": "Malgogi", "link": "https://malgogi.github.io" },
		],
		"frontline": false,
		"ignoreIndex": true,
	},
	"siteMetadata": {
		"title": "Malgogi blog",
		"description": "Malgogi blog",
		"ogImage": null,
    "favicon": "src/icons/favicon.ico",
		"docsLocation": "https://github.com/malgogi/malgogi-blog/tree/master/content"
	},
	"pwa": {
		"enabled": true, // disabling this will also remove the existing service worker.
		"manifest": {
			"name": "Malgogi Blog",
			"short_name": "MalgogiBlog",
			"start_url": "/",
			"background_color": "#6b37bf",
			"theme_color": "#6b37bf",
			"display": "standalone",
			"crossOrigin": "use-credentials",
			"icon": "src/icons/favicon-32x32.png"
		},
	}
};

module.exports = config;
