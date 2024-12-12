import '@total-typescript/ts-reset/filter-boolean'
import { defineCommand, runMain } from 'citty'
import Text from '~/misc/Text'
import { description, name, version } from '../package.json'

const main = defineCommand({
  meta: {
    name,
    version,
    description,
  },
  subCommands: {
    login: import('./commands/login').then((mod) => mod.default),
    logout: import('./commands/logout').then((mod) => mod.default),
    bot: import('./commands/bot').then((mod) => mod.default),
    detect: import('./commands/detect').then((mod) => mod.default),
    videos: import('./commands/videos').then((mod) => mod.default),
    prepare: import('./commands/prepare').then((mod) => mod.default),
    chat: import('./commands/chat').then((mod) => mod.default),
    count: import('./commands/count').then((mod) => mod.default),
    check: import('./commands/check').then((mod) => mod.default),
    json: import('./commands/json').then((mod) => mod.default),
    csv: import('./commands/csv').then((mod) => mod.default),
    channel: import('./commands/channel').then((mod) => mod.default),
    'check-is-live': import('./commands/check-is-live').then((mod) => mod.default),
    'check-is-premiere': import('./commands/check-is-premiere').then((mod) => mod.default),
  },
  run: () => {
    const data: any = {
      content: '@pbsspacetime',
      styleRuns: [
        {
          weightLabel: 'FONT_WEIGHT_MEDIUM',
          styleRunExtensions: {
            styleRunColorMapExtension: {
              colorMap: [
                {
                  key: 'USER_INTERFACE_THEME_LIGHT',
                  value: 4279440147,
                },
                {
                  key: 'USER_INTERFACE_THEME_DARK',
                  value: 4294967295,
                },
              ],
            },
          },
        },
      ],
    }

    const text = Text.fromAttributed(data)

    console.log(text)
  },
})

runMain(main)
