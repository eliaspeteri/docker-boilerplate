# Docker Boilerplate

## URL

This project is **live right now!** Go check it out at <https://eliaspeteri.github.io/docker-boilerplate/>.

## Motivation

It's tedious to build docker-compose files by hand. We've all been there. This app aims to simplify that by allowing the user to select which services they want and the app will come up with a configuration that serves as a good starting point for optioning out further to one's specific needs.

## Usage

The app is so simple to use it's not even funny. You check which services you want in your docker-compose.yml file and the app comes up with sensible defaults for options.

## Installation and running

With `pnpm`

```sh
pnpm i && pnpm run dev
```

With `npm`

```sh
npm i && npm run dev
```

## Deploying to GitHub Pages

```sh
npm run build
git add dist -f
git commit -m "New release"
git subtree push --prefix dist origin gh-pages
```

## What it should look like

![User interface](./src/assets/ui.png "user interface")

## Uninstallation

Remove the project folder.
