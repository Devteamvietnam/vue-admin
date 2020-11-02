---
title: Use
lang: en
---
# Use
## Prepare
Your local environment needs to install yarn, node and git. Our technology stack is based on ES6+, Vue, Antd, learning these knowledge in advance will be very helpful.
## Installation
Clone this project to local
```bash
$ git clone https://github.com/Devteamvietnam/vue-admin.git
```
Installation dependencies
```bash
$ yarn install
or
$ npm install
```
:::tip
The master branch is the standard version of the Vue Admin code. This branch code is suitable for study and research. It is not recommended to do formal development in this branch.
We provide the basic version of Vue  Admin code in the dev branch. For official development, please switch to this branch to facilitate subsequent version updates.
:::
:::warning
If you are developing based on the `master branch`, please solve the problem of code conflicts encountered during the version update. We do not provide technical support for the problems encountered during the development based on the `master branch`.
Again, the `master branch` is only recommended for learning and reference. For official development, please switch to the `dev` branch! ! !
:::
## Directory Structure
We have generated a complete development framework for you, providing various functions and pits covering middle and back-end development. Below is the directory structure of the entire project.

```bash
├── docs # Use documentation
├── public
│ └── img
│   └──icons # images vuejs 
│ └── favicon.png # favicon
│ └── index.html # Entry HTML
│ └── robots.txt # robots
├── src
│ ├── assets # Local static resources
│ ├── components # Built-in common components
│ ├── config # System configuration
│ ├── layouts # General layout
│ ├── locales # local vue-i18n
│ ├── pages # Page components and general templates
│ ├── plugins # vue plugins
│ ├── router # routing configuration
│ ├── services # Data connect api service
│ ├── store # vuex state management configuration
│ ├── theme # Theme related
│ ├── utils # js tool
│ ├── App.vue # Application entry component
│ ├── bootstrap.js # Application startup guide js
│ └── main.js # Application entry js
├── package.json # package.json
├── README.md # README.md
└── vue.config.js # vue configuration file
└── webpack.config.js # webpack configuration file
```
## Local development
Start service
```bash
$ yarn serve
or
$ npm run serve
```
After successful startup, you will see a local preview address, usually http://localhost:8085. Then you can modify the code and preview the modification results in real time!