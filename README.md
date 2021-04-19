# octoherd-script-watch-unwatch-or-ignore

> An octoherd script to watch, unwatch or ignore repositories

[![@latest](https://img.shields.io/npm/v/octoherd-script-watch-unwatch-or-ignore.svg)](https://www.npmjs.com/package/octoherd-script-watch-unwatch-or-ignore)
[![Build Status](https://github.com/oscard0m/octoherd-script-watch-unwatch-or-ignore/workflows/Test/badge.svg)](https://github.com/oscard0m/octoherd-script-watch-unwatch-or-ignore/actions?query=workflow%3ATest+branch%3Amain)

## Usage

Minimal usage

```js
npx octoherd-script-watch-unwatch-or-ignore
```

Pass all options as CLI flags to avoid user prompts

```
npx octoherd-script-watch-unwatch-or-ignore \
  -T ghp_0123456789abcdefghjklmnopqrstuvwxyzA \
  -R "oscard0m/*"
```

## Options

| option                       | type             | description                                                                                                                                                                                                                                 |
| ---------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--unwatch`                  | string           | Stop watching repository                                                                                                                                                                                                                    |
| `--ignore`                   | string           | Ignore all notifications                                                                                                                                                                                                                    |
| `--octoherd-token`, `-T`     | string           | A personal access token ([create](https://github.com/settings/tokens/new?scopes=repo)). Script will create one if option is not set                                                                                                         |
| `--octoherd-repos`, `-R`     | array of strings | One or multiple space-separated repositories in the form of `repo-owner/repo-name`. `repo-owner/*` will find all repositories for one owner. `*` will find all repositories the user has access to. Will prompt for repositories if not set |
| `--octoherd-bypass-confirms` | boolean          | Bypass prompts to confirm mutating requests                                                                                                                                                                                                 |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## About Octoherd

[@octoherd](https://github.com/octoherd/) is project to help you keep your GitHub repositories in line.

## License

[ISC](LICENSE.md)
