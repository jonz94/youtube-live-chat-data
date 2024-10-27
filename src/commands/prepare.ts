import { defineCommand } from 'citty'
import { isProduction } from '~/env'
import { createInnertubeClient, getChannelId, getVideoIdsOfAllPublicLiveStreams } from '~/utils'

export default defineCommand({
  meta: {
    name: 'prepare',
    description: 'Generate chat commands for later use.',
  },
  args: {
    cid: {
      description: 'YouTube Channel Id or YouTube Handler',
      required: true,
      type: 'string',
    },
    simple: {
      description: 'Just output channel id and then exit',
      type: 'boolean',
    },
    silent: {
      description: 'Add `--reporter=silent` option in the output commands',
      type: 'boolean',
    },
  },
  run: async ({ args }) => {
    const youtube = await createInnertubeClient()

    const channelId = await getChannelId(youtube, args.cid)

    if (args.simple) {
      console.log(`channel id is: "${channelId}"`)

      return
    }

    const allPublicLiveStreamIds = await getVideoIdsOfAllPublicLiveStreams(youtube, channelId, 'fromOldestToLatest')

    for (const videoId of allPublicLiveStreamIds) {
      if (isProduction()) {
        console.log(`pnpm${args.silent ? ' --reporter=silent' : ''} run start chat --vid="${videoId}"`)
      } else {
        console.log(`pnpm${args.silent ? ' --reporter=silent' : ''} run start-dev chat --vid="${videoId}"`)
      }
    }
  },
})
