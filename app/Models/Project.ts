import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Skill from 'App/Models/Skill'

export default class Project extends BaseModel {
  @hasMany(() => Skill, {
    foreignKey: 'project_id',
  })
  public skills: HasMany<typeof Skill>

  @column({ isPrimary: true })
  public id: number

  @column()
  public portfolio_id: number

  @column()
  public is_draft: boolean

  //
  @column()
  public client_name: string

  @column()
  public client_description: string

  @column()
  public client_industry: string

  @column()
  public project_name: string

  @column()
  public project_description: string

  @column()
  public size: string

  @column.dateTime({ autoCreate: true })
  public start_date: DateTime

  @column.dateTime({ autoCreate: true })
  public end_date: DateTime

  @column()
  public cloud: string

  @column()
  public actions: string

  @column()
  public outcome: string
  //

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
