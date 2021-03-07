/**
 * An octoherd script to watch, unwatch or ignore repositories
 *
 * @param {import('@octoherd/cli').Octokit} octokit
 * @param {import('@octoherd/cli').Repository} repository
 * @param {{unwatch?: boolean, ignore?: boolean}} options Custom user options passed to the CLI
 */
export async function script(octokit, repository, { unwatch, ignore }) {
	if (unwatch && ignore) {
		octokit.log.error("Not possible tu unsubscribe and subscribe ignoring notifications")
		return;
	}
	
	const method = unwatch ? "DELETE" : "PUT";
	const id = repository.id;
	const owner = repository.owner.login;
	const repo = repository.name;
	// https://docs.github.com/en/rest/reference/activity#get-a-repository-subscription
	const { subscribed, ignored } = await octokit
		.request("GET /repos/{owner}/{repo}/subscription", {
			owner,
			repo,
		})
		.then(
			({ data: { subscribed, ignored } }) => ({ subscribed, ignored }),
			() => ({ subscribed: false, ignored: false })
	);
	
	octokit.log.debug(
		{
			change: 0,
			id,
			owner,
			repo,
		},
		"subscribed: %s, ignored: %s, unwatch: %s, ignore: %s",
		subscribed, ignored, unwatch, ignore
	);
	
	if ((unwatch && !subscribed) || (!unwatch && subscribed) || (ignored && ignore)) {
		octokit.log.debug(
		{
			change: 0,
			id,
			owner,
			repo,
		},
		"No change for %s",
		repository.html_url
		);
		return;
	}
  // https://docs.github.com/en/rest/reference/activity#set-a-repository-subscription
  // https://docs.github.com/en/rest/reference/activity#delete-a-repository-subscription
	let bodyReq
	if (!unwatch) {
		bodyReq = ignore ? { ignored: true } : { subscribed: true }
	}
	await octokit.request("/repos/{owner}/{repo}/subscription", {
		method,
		owner,
		repo,
		...bodyReq
	});
  octokit.log.info(
    {
      change: unwatch ? -1 : 1,
      id,
      owner,
      repo,
    },
    "Subscription %s %s",
    unwatch ? "removed from" : "added to",
    repository.html_url
  );
}
