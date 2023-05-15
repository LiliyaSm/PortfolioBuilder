import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

// const type = ['Framework', 'Method', 'Language', 'Tool']

export default class Skill extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'projectId', serializeAs: 'projectId' })
  public projectId: number

  @column()
  public type: string

  @column()
  public value: string
}
