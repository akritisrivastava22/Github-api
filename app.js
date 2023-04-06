const input = document.getElementsByTagName("input")[0];
const errorBox = document.getElementById("error-box");

async function handleSearch(event) {
	event.preventDefault();
	const userName = input.value;
	input.value = "";
	const result = await fetch(`https://api.github.com/users/${userName}`);
	
	if (result.status !== 200) {
		errorBox.classList.remove("hidden");
		return;
	}
	
	errorBox.classList.add("hidden");
	const userInfo = await result.json();
	showInfo(userInfo);
}

function showInfo(userInfo) {
	const {
		avatar_url,
		gravatar_url,
		name,
		bio,
		twitter_username,
		followers,
		following,
		repos_url,
		public_repos,
	} = userInfo;
	const infoBox = document.getElementById("info-box");

	
	const avatar = document.getElementById("avatar");
	avatar.src = avatar_url || gravatar_url;

	
	const nameTag = document.getElementById("name");
	nameTag.innerHTML = name || "No name";

	
	const bioTag = document.getElementById("bio");
	bioTag.innerHTML = bio;

	
	const twitterUsernameTag = document.getElementById("twitter");
	twitterUsernameTag.innerHTML = twitter_username || "No twitter username";

	
	const followersTag = document.getElementById("followers");
	followersTag.innerHTML = followers;

	
	const followingTag = document.getElementById("following");
	followingTag.innerHTML = following;

	
	const publicReposTag = document.getElementById("repo");
	publicReposTag.innerHTML = public_repos;

	infoBox.classList.remove("hidden");

	
	setRepos(repos_url);
}

async function setRepos(repoUrl) {
	const repos = await fetch(repoUrl);
	const reposData = await repos.json();

	if (reposData.length !== 0) {
		const repoContainer = document.getElementById("repo-list-container");
		repoContainer.classList.remove("hidden");
	}

	const reposList = document.getElementById("repos-list");
	reposList.innerHTML = "";
	reposData.forEach((repo) => {
		const { full_name, html_url, description } = repo;
		const repoItem = document.createElement("div");
		repoItem.classList =
			"mt-2 border-4 border-lime-500 rounded-xs text-vilot-800 p-3 md:px-5";
		repoItem.innerHTML = `<h3 class="text-black text-md md:text-lg"><a href="${html_url}">${full_name}</a></h3>
        <p class="text-xs md:text-base mt-1 md:mt-2 font-mono">${
					description || "No description"
				}</p>`;
		reposList.appendChild(repoItem);
	});
}
