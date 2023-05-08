import { DateTime } from 'luxon'
import Portfolio from 'App/Models/Portfolio'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ columnName: 'lastName' })
  public lastName: string

  @column({ columnName: 'firstName' })
  public firstName: string

  @column({ columnName: 'password' })
  public password: string

  @column.dateTime({ columnName: 'createdAt', autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ columnName: 'updatedAt', autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
  @hasMany(() => Portfolio)
  public portfolios: HasMany<typeof Portfolio>
}
