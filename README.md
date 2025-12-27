## Project Launch

```
npm install - install dependencies
npm run start:dev or npm run start:dev:vite - launch server + frontend project in dev mode
```

----

## Scripts

- `npm run start` - Launch frontend project on webpack dev server
- `npm run start:vite` - Launch frontend project on vite
- `npm run start:dev` - Launch frontend project on webpack dev server + backend
- `npm run start:dev:vite` - Launch frontend project on vite + backend
- `npm run start:dev:server` - Launch backend server
- `npm run build:prod` - Build in prod mode
- `npm run build:dev` - Build in dev mode (not minified)
- `npm run lint:ts` - Check ts files with linter
- `npm run lint:ts:fix` - Fix ts files with linter
- `npm run lint:scss` - Check scss files with style linter
- `npm run lint:scss:fix` - Fix scss files with style linter
- `npm run test:unit` - Run unit tests with jest
- `npm run test:ui` - Run screenshot tests with loki
- `npm run test:ui:ok` - Approve new screenshots
- `npm run test:ui:ci` - Run screenshot tests in CI
- `npm run test:ui:report` - Generate full report for screenshot tests
- `npm run test:ui:json` - Generate json report for screenshot tests
- `npm run test:ui:html` - Generate HTML report for screenshot tests
- `npm run storybook` - launch Storybook
- `npm run storybook:build` - Build storybook build
- `npm run prepare` - precommit hooks
- `npm run generate:slice` - Script for generating FSD slices

----

## Project Architecture

The project is written in accordance with the Feature sliced design methodology

Link to documentation - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Working with Translations

The project uses the i18next library for working with translations.
Translation files are stored in public/locales.

For comfortable work, we recommend installing a plugin for webstorm/vscode

i18next documentation - [https://react.i18next.com/](https://react.i18next.com/)

----

## Tests

The project uses 4 types of tests:
1) Regular unit tests on jest - `npm run test:unit`
2) Component tests with React testing library -`npm run test:unit`
3) Screenshot testing with loki `npm run test:ui`
4) e2e testing with Cypress `npm run test:e2e`

More about tests - [testing documentation](/docs/tests.md)

----

## Linting

The project uses eslint for checking typescript code and stylelint for checking style files.

Also, for strict control of the main architectural principles
a custom eslint plugin *eslint-plugin-ulbi-tv-plugin* is used,
which contains 3 rules
1) path-checker - prohibits the use of absolute imports within one module
2) layer-imports - checks the correctness of layer usage from the FSD point of view
   (for example, widgets cannot be used in features and entities)
3) public-api-imports - allows import from other modules only from public api. Has auto fix

##### Running linters
- `npm run lint:ts` - Check ts files with linter
- `npm run lint:ts:fix` - Fix ts files with linter
- `npm run lint:scss` - Check scss files with style linter
- `npm run lint:scss:fix` - Fix scss files with style linter

----
## Storybook

In the project, story cases are described for each component.
Server requests are mocked using storybook-addon-mock.

The file with story cases is created next to the component with the extension .stories.tsx

You can run storybook with the command:
- `npm run storybook`

More about [Storybook](/docs/storybook.md)

Example:

```typescript jsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    theme: ButtonTheme.CLEAR,
};
```


----

## Project Configuration

For development, the project contains 2 configs:
1. Webpack - ./config/build
2. vite - vite.config.ts

Both builders are adapted for the main features of the application.

All configuration is stored in /config
- /config/babel - babel
- /config/build - webpack configuration
- /config/jest - test environment configuration
- /config/storybook - storybook configuration

In the `scripts` folder there are various scripts for refactoring\ simplifying code writing\generating reports, etc.

----

## CI pipeline and pre commit hooks

GitHub actions configuration is in /.github/workflows.
In ci, all types of tests, project and storybook build, linting are run.

In precommit hooks, we check the project with linters, config in /.husky

----

### Working with Data

Interaction with data is carried out using redux toolkit.
Where possible, reusable entities should be normalized using EntityAdapter

Requests to the server are sent using [RTK query](/src/shared/api/rtkApi.ts)

For asynchronous connection of reducers (to not pull them into the general bundle) used
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

----

### Working with feature-flag

The use of feature flags is allowed only with the toggleFeatures helper

it is passed an object with options

{
   name: feature flag name,
   on: function that will work after Enabling the feature
   off: function that will work after Disabling the feature
}

To automatically remove a feature, use the remove-feature.ts script,
which takes 2 arguments
1. Name of the feature flag to be removed
2. State (on\off)

----

## Entities (entities)

- [Article](/src/entities/Article)
- [Comment](/src/entities/Comment)
- [Counter](/src/entities/Counter)
- [Country](/src/entities/Country)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)

## Features (features)

- [addCommentForm](/src/features/addCommentForm)
- [articleEditForm](/src/features/articleEditForm)
- [articleRating](/src/features/articleRating)
- [articleRecommendationsList](/src/features/articleRecommendationsList)
- [AuthByUsername](/src/features/AuthByUsername)
- [avatarDropdown](/src/features/avatarDropdown)
- [editableProfileCard](/src/features/editableProfileCard)
- [LangSwitcher](/src/features/LangSwitcher)
- [notificationButton](/src/features/notificationButton)
- [profileRating](/src/features/profileRating)
- [ThemeSwitcher](/src/features/ThemeSwitcher)
- [UI](/src/features/UI)
