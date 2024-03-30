/** @format */

export function timeSince(date) {
	const seconds = Math.floor((new Date() - new Date(date)) / 1000);

	let interval = seconds / 31536000; // 60*60*24*365

	if (interval > 1) {
		return Math.floor(interval) + " years ago";
	}
	interval = seconds / 2592000; // 60*60*24*30
	if (interval > 1) {
		return Math.floor(interval) + " months ago";
	}
	interval = seconds / 86400; // 60*60*24
	if (interval > 1) {
		return Math.floor(interval) + " days ago";
	}
	interval = seconds / 3600; // 60*60
	if (interval > 1) {
		return Math.floor(interval) + " hours ago";
	}
	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + " minutes ago";
	}
	return Math.floor(seconds) + " seconds ago";
}
