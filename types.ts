// probably not perfect
export interface Tweet {
	created_at: string;
	id: number;
	id_str: string;
	text: string;
	truncated: boolean;
	entities: {
		hashtags: [];
		symbols: [];
		user_mentions: [];
		urls: {
			url: string;
			expanded_url: string;
			display_url: string;
			indices: [number, number];
		}[];
	};
	extended_entities?: {
		media: Array<{
			id: 1392225877115605000;
			id_str: '1392225877115604993';
			indices: [39, 62];
			media_url: 'http://pbs.twimg.com/media/E1IuDxSVEAESdf0.jpg';
			media_url_https: 'https://pbs.twimg.com/media/E1IuDxSVEAESdf0.jpg';
			url: 'https://t.co/3jmGpl87LW';
			display_url: 'pic.twitter.com/3jmGpl87LW';
			expanded_url: 'https://twitter.com/PaymoneyWubby/status/1392225901165694976/photo/1';
			type: 'photo';
			sizes: {
				small: { w: 510; h: 680; resize: 'fit' };
				thumb: { w: 150; h: 150; resize: 'crop' };
				medium: { w: 900; h: 1200; resize: 'fit' };
				large: { w: 1536; h: 2048; resize: 'fit' };
			};
		}>;
	};
	metadata: {
		result_type: string;
		iso_language_code: string;
	};
	source: string;
	in_reply_to_status_id: null;
	in_reply_to_status_id_str: null;
	in_reply_to_user_id: null;
	in_reply_to_user_id_str: null;
	in_reply_to_screen_name: null;
	user: {
		id: number;
		id_str: string;
		name: string;
		screen_name: string;
		location: string;
		description: string;
		url: string;
		entities: {
			url: {
				urls: [
					{
						url: string;
						expanded_url: string;
						display_url: string;
						indices: [number, number];
					}
				];
			};
			description: {
				urls: [];
			};
		};
		protected: boolean;
		followers_count: number;
		friends_count: number;
		listed_count: number;
		created_at: string;
		favourites_count: number;
		utc_offset: number;
		time_zone: string;
		geo_enabled: boolean;
		verified: boolean;
		statuses_count: number;
		lang: string;
		contributors_enabled: boolean;
		is_translator: boolean;
		is_translation_enabled: boolean;
		profile_background_color: string;
		profile_background_image_url: string;
		profile_background_image_url_https: string;
		profile_background_tile: boolean;
		profile_image_url: string;
		profile_image_url_https: string;
		profile_banner_url: string;
		profile_link_color: string;
		profile_sidebar_border_color: string;
		profile_sidebar_fill_color: string;
		profile_text_color: string;
		profile_use_background_image: boolean;
		has_extended_profile: boolean;
		default_profile: boolean;
		default_profile_image: boolean;
		following: null;
		follow_request_sent: null;
		notifications: null;
		translator_type: string;
	};
	geo: null;
	coordinates: null;
	place: null;
	contributors: null;
	is_quote_status: boolean;
	retweet_count: number;
	favorite_count: number;
	favorited: boolean;
	retweeted: boolean;
	possibly_sensitive: boolean;
	lang: string;
}
