# Express Gateway Boilerplate - v1.0

> Express Gateway Boilerplate
> I created this repository to register an example of a gateway using Express + Mongo. I leave it open for those who want to contribute to future improvements
> 

## Table of contents

- [Express Gateway Boilerplate - v1.0](#express-gateway-boilerplate---v10)
	- [Table of contents](#table-of-contents)
	- [General info](#general-info)
	- [Screenshots](#screenshots)
	- [Technologies](#technologies)
	- [Setup](#setup)
	- [Commands](#commands)
	- [Features](#features)
	- [Status](#status)
	- [Contact](#contact)

## General info

Express Gateway Boilerplate

## Screenshots

![Coverage](./img/coverage.png)

## Technologies

- Node
- MongoDB

## Setup

> :warning: **Before install node packages**:
>
> - MongoDB must be installed, create a **"app_base"** DataBase and a **"user"** collection;
>
> - Check and configure the mongo access endpoint, editing the constants file, inside the config directory;
>
> - This project use node v14.4.0;

1 - Clone this repository

```console
~$ git clone <GIT_URL>
```

2 - Execute commands:

```console
~$ cd <project_name>
~$ npm install
~$ npm run serve
```

3 - Test access URL:

```console
~$ curl http://localhost:8080
```

## Commands

- **npm run clean** - Clean folder dist

```console
~$ npm run clean
```

- **npm run copy-deps** - Copy dependencies to dist folder

```console
~$ npm run copy-deps
```

- **npm run start** - Start server

```console
~$ npm run start
```

- **npm run serve.w** - Start server with watch mode

```console
~$ npm run serve.w
```

- **npm run build** - Prepare project to Cloud

```console
~$ npm run build
```

- **npm run test-dev** - Execute unit-test

```console
~$ npm run teste-dev
```

- **npm run test-dev-watch** - Execute unit-test with watch mode

```console
~$ npm run teste-dev-watch
```

## Features

List of features ready and TODOs for future development

- JWT

To-do list:

- Coverage test model mongoose
- Coverage test auth.controller
- Coverage test JWT

## Status

Project is: _continuous_

## Contact

Created by [@douglaslira](mailto:douglas.lira.web@gmail.com) - feel free to contact me!
