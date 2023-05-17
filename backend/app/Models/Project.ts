import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Skill from 'App/Models/Skill'
import Portfolio from './Portfolio'

export default class Project extends BaseModel {
  @hasMany(() => Skill, {
    foreignKey: 'projectId',
  })
  public skills: HasMany<typeof Skill>

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'portfolioId', serializeAs: 'portfolioId' })
  public portfolioId: number

  @column({ columnName: 'isDraft', serializeAs: 'isDraft' })
  public isDraft: boolean

  //
  @column({ columnName: 'clientName', serializeAs: 'clientName' })
  public clientName: string

  @column({ columnName: 'clientDescription', serializeAs: 'clientDescription' })
  public clientDescription: string

  @column({ columnName: 'clientIndustry', serializeAs: 'clientIndustry' })
  public clientIndustry: string

  @column({ columnName: 'projectName', serializeAs: 'projectName' })
  public projectName: string

  @column({ columnName: 'projectDescription', serializeAs: 'projectDescription' })
  public projectDescription: string

  @column()
  public size: string

  @column.dateTime({ columnName: 'startDate', serializeAs: 'startDate' })
  public startDate: DateTime

  @column.dateTime({ columnName: 'endDate', serializeAs: 'endDate' })
  public endDate: DateTime | null

  @column()
  public cloud: string

  @column()
  public actions: string

  @column()
  public outcome: string

  @column({ columnName: 'teamSize', serializeAs: 'teamSize' })
  public teamSize: string

  @column()
  public role: string

  @column({ columnName: 'projectType', serializeAs: 'projectType' })
  public projectType: string
  //
  @column.dateTime({ columnName: 'createdAt', autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({
    columnName: 'updatedAt',
    autoCreate: true,
    autoUpdate: true,
    serializeAs: 'updatedAt',
  })
  public updatedAt: DateTime

  @belongsTo(() => Portfolio)
  public portfolio: BelongsTo<typeof Portfolio>
}
