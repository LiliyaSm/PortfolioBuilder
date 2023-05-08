import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  afterCreate,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import Project from 'App/Models/Project'
import User from 'App/Models/User'

export default class Portfolio extends BaseModel {
  @hasMany(() => Project, {
    foreignKey: 'portfolioId',
  })
  public projects: HasMany<typeof Project>

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'userId', serializeAs: 'userId' })
  public userId: number

  @column()
  public name?: string

  @column.dateTime({ columnName: 'createdAt', autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({
    columnName: 'updatedAt',
    autoUpdate: true,
    autoCreate: true,
    serializeAs: 'updatedAt',
  })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @afterCreate()
  public static async createName(portfolio: Portfolio) {
    portfolio.name = `draft portfolio_${portfolio.id}`
    await portfolio.save()
  }
}
