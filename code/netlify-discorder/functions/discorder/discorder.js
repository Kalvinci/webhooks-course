const axios = require("axios").default;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
	try {
		const body = JSON.parse(event.body);
		const username = body.sender.login;
		const avatarUrl = body.sender.avatar_url;
		const repoName = body.repository.name;
		let action, emoji;
		if (body.action === "created") {
			action = "starred";
			emoji = ":rocket: :muscle: :tada: :taco: :star_struck:";
		} else {
			action = "unstarred";
			emoji = ":cry:";
		}
		const res = await axios.post(process.env.DISCORD_WEBHOOK_URL, {
			content: `${username} just ${action} ${repoName}! ${emoji}`,
			embeds: [
				{
					image: {
						url: avatarUrl,
					},
				},
			],
		});
		console.log("Submitted!");
		return {
			statusCode: 204,
		};
	} catch (err) {
		return { statusCode: 500, body: err.toString() };
	}
};
