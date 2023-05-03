import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Project from 'App/Models/Project'

const type = ['Framework', 'Method', 'Language', 'Tool']

export default class Portfolio extends BaseModel {
  @hasMany(() => Project)
  public projects: HasMany<typeof Project>

  @column({ isPrimary: true })
  public id: number

  @column()
  public Type: string

  @column()
  public Value: string
}
