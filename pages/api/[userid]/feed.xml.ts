import fs from 'fs';
import env from '@rettgerst/env-proxy';
import { NextApiRequest, NextApiResponse } from 'next';

import Twitter from 'twitter';
import renderToXml from '../../../functions/renderToXml';
import { Tweet } from '../../../types';

const {
	TWITTER_API_KEY,
	TWITTER_API_SECRET_KEY,
	TWITTER_BEARER_TOKEN
} = env.required.string;

function tweetIsReply(tweet: Tweet) {
	return tweet.in_reply_to_screen_name !== null;
}

function tweetIsNotReply(tweet: Tweet) {
	return !tweetIsReply(tweet);
}

export default async function GetUserTweets(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { userid } = req.query;
	const t = new Twitter({
		consumer_key: TWITTER_API_KEY,
		consumer_secret: TWITTER_API_SECRET_KEY,
		bearer_token: TWITTER_BEARER_TOKEN
	});

	const users = await t.get(`users/lookup`, {
		screen_name: userid
	});

	if (users.length !== 1) throw new Error(`Found ${users.length} users`);

	const user = users[0];

	const { id } = user;

	const tweets = ((await t.get('statuses/user_timeline', {
		user_id: id,
		exclude_replies: true
	})) as any) as Tweet[];

	const xml = renderToXml(tweets.filter(tweetIsNotReply));

	res.setHeader('content-type', 'application/xml');
	res.status(200).end(xml);
}
