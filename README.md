# 📫 Messenger Praktikum Yandex

![Build Status](https://img.shields.io/github/actions/workflow/status/kirei-io/middle.messenger.praktikum.yandex/tests.yml?style=flat-square&l&labelColor=24273a&color=b7bdf8 "Build status")
![node version](https://img.shields.io/static/v1?label=node&message=%3E=14&style=flat-square&logo=node.js&labelColor=24273a&color=8bd5ca&logoColor=cad3f5 "node version >= 14")

- [**Yandex Cloud Deploy**](https://bba52tvon8hled0tjkam.containers.yandexcloud.net/)

- [Netlify Deploy](https://kirei-study-messanger.netlify.app/)

- [Messenger layout in Figma](https://www.figma.com/file/6KYG6oVWJe0VvCROyIUhjy/chat-app?node-id=17%3A84&t=oi1Iqbcf4oqN3JGq-1)

## 🦥 Current work progress

- **sprint_1** creating a basic project layout
  - creating ui/ux layout in figma
  - initializing project (add parcel, handlebars, sass, express)
  - markup and styling of the pages
- **sprint_2** decomposition and added a component approach
  - added typescript
  - added linters
  - added components
  - form validation
- **sprint_3** connect to API
- **sprint_4** add tests and doker
  - Add **Webpack**
  - Add **Docker**
  - Deploy Yandex.cloud
  - Tests:
    1. Component `ButtonDefault class`,
    2. Page `ChatPage class`
    3. Util `trim fuction`
    4. Base `Block class`,
    5. `HTTPTransport class`
    6. `Router class`

## 💿 Install

Cloning from github:

```text
git clone https://github.com/kirei-io/middle.messenger.praktikum.yandex.git
```

```text
cd ./middle.messenger.praktikum.yandex
```

Docker

```text
  docker build -t chat-app -f Dockerfile
  docker run -p 3000:3000 chat-app
```

Installing packages:

```text
npm install
```

Starting development server:

```text
npm run webpack:start
```

Building project:

```text
npm run build
```

Test

```test
npm run test
```

Building project and start express server:

```text
npm run start
```

Linting:

```text
npm run lint:eslint
npm run link:stylelint
```

Types checks:

```text
npm run check-types
```

## 🎨 UI/UX Design

- [Messenger layout in Figma](https://www.figma.com/file/6KYG6oVWJe0VvCROyIUhjy/chat-app?node-id=17%3A84&t=oi1Iqbcf4oqN3JGq-1)

### See also

- [Catppuccin Color Palette](https://github.com/catppuccin/catppuccin)
- [Praktikum Yandex example chat layout in Figma](https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1)
