import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Configuration, OpenAIApi } from 'openai'

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
        messages: [{ role: 'user', content: `enhance this text ${data}` }],
        temperature: 0.7,
        max_tokens: 512,
      })
      return chatCompletion.data.choices[0]?.message?.content
    } catch (e) {
      console.log(e)
      return { error: e.message }
    }
  }
}
