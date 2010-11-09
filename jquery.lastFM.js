(function($) {
	var settings;
	var defaults;

	$.fn.lastFM = function(options) {
		defaults = {
			apiKey: ""
		};

		var backupDefaults = defaults;

		settings = $.extend(false, defaults, options);

		defaults = backupDefaults;

		return this;
	};

	function buildURLRoot(method) {
		return "http://ws.audioscrobbler.com/2.0/?api_key=" + settings.apiKey + "&format=json&method=" + method;
	}

	function checkSettings() {
		if ((settings.apiKey == "") || (typeof settings.apiKey != "string")) {
			alert("You must provide an API key for this plugin to work");
			return false;
		}

		return true;
	}

	function getAlbum(album, artist, callback) {
		if (!checkSettings()) {
			return;
		}
		$.ajax({
			url: buildURLRoot("album.getInfo"),
			data: "album=" + album + "&artist=" + artist,
			dataType: "jsonp",
			success: function(data) {
				if (typeof data.error == "undefined") {
					callback(data.album);
				}
			}
		});
	}

	$.fn.lastFM.getAlbum = function(album, artist, callback) {
		getAlbum(album, artist, callback);
	};
})(jQuery);