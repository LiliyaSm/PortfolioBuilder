import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Skill from 'App/Models/Skill'

export default class Project extends BaseModel {
  @hasMany(() => Skill, {
    foreignKey: 'projectId',
  })
  public skills: HasMany<typeof Skill>

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'portfolioId' })
  public portfolioId: number

  @column()
  public isDraft: boolean

  //
  @column({ columnName: 'clientName' })
  public clientName: string

  @column()
  public clientDescription: string

  @column()
  public clientIndustry: string

  @column()
  public projectName: string

  @column()
  public projectDescription: string

  @column()
  public size: string

  @column.dateTime({ columnName: 'startDate', autoCreate: true })
  public startDate: DateTime

  @column.dateTime({ columnName: 'endDate', autoCreate: true })
  public endDate: DateTime

  @column()
  public cloud: string

  @column()
  public actions: string

  @column()
  public outcome: string
  //

  @column.dateTime({ columnName: 'createdAt', autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ columnName: 'updatedAt', autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
