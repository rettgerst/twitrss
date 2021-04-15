import React from 'react';
import ReactDomServer from 'react-dom/server';
import { Tweet } from '../types';

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
	item: Item
} = XMLProxy;

export default function renderToXml(tweets: Tweet[]) {
	const jsx = (
		<Rss>
			<Channel>
				{tweets.map(tweet => {
					const href = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id}`;

					let text = tweet.text;

					return (
						<Item>
							<Title>{text}</Title>
							<Link href={href} />
						</Item>
					);
				})}
			</Channel>
		</Rss>
	);

	return ReactDomServer.renderToString(jsx);
}
