# amazing-tv-maze

Welcome to the amazing-tv-maze!

The following versions of node and npm were used:

- Node - 20.14.0
- npm - 10.7.0

Below you will find the instructions to get up and running.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run Unit Tests

```sh
npm run test:unit
```

# Architectural decisions

## Packages

This project is made using Vue3 and Typescript. Aside from Vue it also uses three other dependencies:

- vue-router
- ofetch
- embla-carousel-vue

### Vue3 & Typescript:

I chose for Vue and Typescript because I enjoy the new Composition API syntax in Vue3 a lot. It's also the framework used at ABN AMRO so a win-win situation!

### vue-router:

vue-router is the de facto routing library for Vue. It can be scaffolded when using the `npm create vue@latest` command. It makes routing and passing query parameters a lot easier.

### ofetch:

ofetch is is build on top of the fetch API and provides some handy features like:

- Smartly parsing json and native values in the response
- Provides async interceptors to hook into lifecycle events

It makes data fetching a little easier and more ergonomic compared to the native fetch javascript has to offer. It’s a battle tested package with close to a million weekly downloads and used in frameworks like Nuxt3.

### embla-carousel-vue:

Considering the time I had available I thought it would be a good trade-off to use a package for the horizontal Sliders seen in the project. This would allow me to focus on other parts of the application and showcase how I would go about creating various features.

The embla-carousel package itself gets over half a million downloads a week and the specific Vue version over 15.000. It’s regularly updated so I’m confident it fits the current use case.

# Testing

For testing I chose to use the following packages:

- vitest
- @vue/test-utils
- jsdom
- msw (Mock Service Worker)

## vitest & @vue/test-utils

Both `vitest` and `@vue/test-utils` enabled me to create various component and composable tests. They are also the standard libraries for testing Vue3 with vite so I did not see a reason to stray away from these. `jsdom` was also the standard browser implementation installed, I could have chosen for `happy-dom` but I did not see a reason to change this.

(Unfortunately I did not have time to test every single component and composable. However, I tried to include various test cases in the tests that have been written to give a clear overview of how I would go about writing unit tests).

## msw

MSW is a wonderful library to mock api responses. It has great documentation and close to 3 million downloads a week.

Within the `src/test/mocks` folder various files can be found which setup a server with handlers that can be called from within the test suite run by vitest.

# Features

The main functionality to show horizontal lists of shows grouped by Genre and Rating is available on the homepage. The cards with images make use of the `useViewport` composable to not load every single image on page load.

The search bar in the navigation header can be used to search shows by title.

A detailed overview of a show is visible by clicking a card. The detail page has been enriched with extra data by embedding it in the query to the api `'embed[]': ['seasons', 'cast', 'images'`

# Extra feature

On top of the requirements mentioned in the assignment, I also created a way to favourite various Shows.

This is made possible by the `useLocalStorage` composable which as the name tells, handles creating and storing items inside localStorage.

The `useFavorites` composable which in turn uses the useLocalStorage composable keeps track of an array of shows.
