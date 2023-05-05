import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('firstName').notNullable()
      table.string('lastName').notNullable()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.timestamp('createdAt', { useTz: true }) //timestamptz
      table.timestamp('updatedAt', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
