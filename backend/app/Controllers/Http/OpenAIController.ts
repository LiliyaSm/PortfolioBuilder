import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Configuration, OpenAIApi } from 'openai'

const promptText =
  `Proofread my writing. Fix grammar and spelling mistakes. And make suggestions that will improve the clarity of my writing. 
  Return only suggested version of the text without your summarizing:`

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

export default class OpenAIController {
  public async chat({ request }: HttpContextContract) {
    const { data } = request.body()
    const openai = new OpenAIApi(configuration)

    try {
      const chatCompletion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `${promptText} ${data}` }],
        temperature: 0.7,
        max_tokens: 512,
      })
      return { data: chatCompletion.data.choices[0]?.message?.content }
    } catch (e) {
      return { error: e.message }
    }
  }
}
