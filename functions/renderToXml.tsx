import React from 'react';
import ReactDomServer from 'react-dom/server';
import { Tweet } from '../types';
import unescape from 'lodash/unescape';

const XMLProxy = new Proxy(
	{},
	{
		get: (_, tagName: string) => (props: Record<string, any>) =>
			React.createElement(tagName, props)
	}
) as Record<string, React.FC<Record<string, any>>>;

const {
	rss: Rss,
	channel: Channel,
	title: Title,
	link: Link,
	description: Description,
	item: Item,
	id: Id,
	updated: Updated
} = XMLProxy;

function getTweetMediaTable(tweet: Tweet) {
	const mediaEntities = tweet.extended_entities?.media;

	if (!mediaEntities) return null;

	const length = mediaEntities.length;

	let width = 600;

	if (length === 1)
		return <img width={width} src={mediaEntities[0].media_url_https} />;
	else {
		let tableContents;

		if (length === 2)
			tableContents = (
				<>
					<tr>
						<td>
							<img
								width={width / 2}
								src={mediaEntities[0].media_url_https}
							/>
						</td>
						<td>
							<img
								width={width / 2}
								src={mediaEntities[1].media_url_https}
							/>
						</td>
					</tr>
				</>
			);
		else if (length === 3)
			tableContents = (
				<>
					<tr>
						<td>
							<img
								width={width / 2}
								src={mediaEntities[0].media_url_https}
							/>
						</td>
						<td rowSpan={2}>
							<img
								width={width / 2}
								src={mediaEntities[2].media_url_https}
							/>
						</td>
					</tr>
					<tr>
						<td>
							<img
								width={width / 2}
								src={mediaEntities[1].media_url_https}
							/>
						</td>
					</tr>
				</>
			);
		else if (length === 4)
			tableContents = (
				<>
					<tr>
						<td>
							<img
								width={width / 2}
								src={mediaEntities[0].media_url_https}
							/>
						</td>
						<td>
							<img
								width={width / 2}
								src={mediaEntities[1].media_url_https}
							/>
						</td>
					</tr>
					<tr>
						<td>
							<img
								width={width / 2}
								src={mediaEntities[2].media_url_https}
							/>
						</td>
						<td>
							<img
								width={width / 2}
								src={mediaEntities[3].media_url_https}
							/>
						</td>
					</tr>
				</>
			);

		return <table width={400}>{tableContents}</table>;
	}
}

export default function renderToXml(tweets: Tweet[]) {
	const user = tweets[0].user;
	const jsx = (
		<Rss>
			<Channel>
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
										<img
											src={tweet.user.profile_image_url}
										/>
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
					const descCdata = descHtml;

					return (
						<Item>
							<Id>{tweet.id}</Id>
							<Updated>
								{new Date(tweet.created_at).toISOString()}
							</Updated>
							<Title>{unescapedText}</Title>
							<Link href={href} />
							<Description>{descCdata}</Description>
						</Item>
					);
				})}
			</Channel>
		</Rss>
	);

	return ReactDomServer.renderToString(jsx);
}
