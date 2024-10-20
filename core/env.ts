import dotenv from 'dotenv'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: string
      DATABASE_URL: string
      DATABASE_AUTH_TOKEN: string
      BLACKLISTED_ACCOUNTS: string[]
    }
  }
}

function isProduction() {
  const currentEnv = process.env.NODE_ENV

  return currentEnv === undefined || currentEnv === 'production'
}

function parseJsonStringIntoArray(input: any) {
  try {
    const parsedInput = JSON.parse(input) as unknown

    if (!Array.isArray(parsedInput)) {
      throw new Error('BLACKLISTED_ACCOUNTS must a valid array')
    }

    if (!parsedInput.every((item) => typeof item === 'string')) {
      throw new Error('All items in BLACKLISTED_ACCOUNTS must be strings')
    }

    return parsedInput
  } catch (error) {
    throw new Error('Cannot parse input')
  }
}

// credits: https://github.com/motdotla/dotenv/issues/272#issuecomment-364677176
const envFile = isProduction() ? `.env` : process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
dotenv.config({ path: envFile })

const { DATABASE_URL, DATABASE_AUTH_TOKEN, BLACKLISTED_ACCOUNTS } = process.env

const env = {
  DATABASE_URL,
  DATABASE_AUTH_TOKEN,
  BLACKLISTED_ACCOUNTS,
}

for (const [key, value] of Object.entries(env) as [keyof typeof env, (typeof env)[keyof typeof env]][]) {
  if (key === 'BLACKLISTED_ACCOUNTS') {
    env.BLACKLISTED_ACCOUNTS = value ? parseJsonStringIntoArray(value) : []
    continue
  }

  if (value === undefined) {
    throw new Error(`Missing environment variables ${key}`)
  }
}

export { env, isProduction }
