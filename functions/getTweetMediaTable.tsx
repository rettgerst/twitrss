import React from 'react';
import { Tweet } from '../types';

export function getTweetMediaTable(tweet: Tweet) {
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
