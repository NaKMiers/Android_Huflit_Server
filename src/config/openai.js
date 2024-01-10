import OpenAI from 'openai'

const openai = new OpenAI({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_KEY,
})

export default openai
