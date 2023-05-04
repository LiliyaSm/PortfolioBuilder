import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, afterCreate } from '@ioc:Adonis/Lucid/Orm'
import Project from 'App/Models/Project'

export default class Portfolio extends BaseModel {
  @hasMany(() => Project, {
    foreignKey: 'portfolio_id',
  })
  public projects: HasMany<typeof Project>

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'user_id', serializeAs: 'user_id' })
  public userId: number

  @column()
  public name?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @afterCreate()
  public static async createName(portfolio: Portfolio) {
    portfolio.name = `draft portfolio_${portfolio.id}`
    await portfolio.save()
  }
}
