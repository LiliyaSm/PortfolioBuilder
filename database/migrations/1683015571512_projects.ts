import BaseSchema from '@ioc:Adonis/Lucid/Schema'
// import { projectMethodologies } from 'Contracts/enums'

export default class extends BaseSchema {
  protected tableName = 'projects'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary
      table.integer('portfolio_id').unsigned().references('portfolios.id').onDelete('CASCADE') // delete post when portfolio is deleted
      table.boolean('is_draft').defaultTo(true)
      //
      table.string('client_name').notNullable()
      table.string('client_description')
      table.string('client_industry')
      table.string('project_name')
      table.string('project_description')
      table.string('size').notNullable()
      table.timestamp('start_date', { useTz: true })
      table.timestamp('end_date', { useTz: true })
      table.string('cloud') //optional
      table.string('actions').notNullable() //optional
      table.string('outcome').notNullable() //optional
      //
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
