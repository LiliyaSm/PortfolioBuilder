import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

const type = ['Framework', 'Method', 'Language', 'Tool']

export default class Skill extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public project_id: number

  @column()
  public type: string

  @column()
  public value: string
}
