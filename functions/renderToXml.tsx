import React from 'react';
import ReactDomServer from 'react-dom/server';
import { Tweet } from '../types';
import unescape from 'lodash/unescape';
import { getTweetMediaTable } from './getTweetMediaTable';

const XMLProxy = new Proxy(
	{},
	{
		get: (_, tagName: string) => (props: Record<string, any>) =>
			React.createElement(tagName, props)
	}
) as Record<string, React.FC<Record<string, any>>>;

const {
	feed: Feed,
	title: Title,
	link: Link,
	id: Id,
	updated: Updated,
	entry: Entry,
	content: Content
} = XMLProxy;

export default function renderToXml(tweets: Tweet[]) {
	const user = tweets[0].user;
	const jsx = (
		<Feed xmlns="http://www.w3.org/2005/Atom">
			<Title>{user.name}</Title>
			{tweets.map(tweet => {
				const href = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;

				let text = tweet.text;

				const chars = [...(tweet.text as any)];

				if (
					tweet.extended_entities?.media[0].indices[1] ===
					chars.length
				) {
					text = text.slice(
						0,
						tweet.extended_entities.media[0].indices[0]
					);
				}

				const media = getTweetMediaTable(tweet);

				const unescapedText = unescape(text);

				const desc = (
					<>
						<table>
							<tr>
								<td rowSpan={2}>
									<img src={tweet.user.profile_image_url} />
								</td>
								<td>{tweet.user.name}</td>
							</tr>
							<tr>
								<td>@{tweet.user.screen_name}</td>
							</tr>
						</table>
						<p>{unescapedText}</p>
						{media}
					</>
				);

				const descHtml = ReactDomServer.renderToString(desc);

				return (
					<Entry>
						<Id>{tweet.id}</Id>
						<Updated>
							{new Date(tweet.created_at).toISOString()}
						</Updated>
						<Title>{unescapedText}</Title>
						<Link href={href} />
						<Content type="html">{descHtml}</Content>
					</Entry>
				);
			})}
		</Feed>
	);

	return ReactDomServer.renderToString(jsx);
}
