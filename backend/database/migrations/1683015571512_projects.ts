import BaseSchema from '@ioc:Adonis/Lucid/Schema'
// import { projectMethodologies } from 'Contracts/enums'

export default class extends BaseSchema {
  protected tableName = 'projects'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary
      table.integer('portfolioId').unsigned().references('portfolios.id').onDelete('CASCADE') // delete post when portfolio is deleted
      table.boolean('isDraft').defaultTo(true)
      //
      table.string('clientName').notNullable()
      table.text('clientDescription')
      table.text('clientIndustry')
      table.text('projectName')
      table.text('projectDescription')
      table.string('size').notNullable()
      table.timestamp('startDate', { useTz: true })
      table.timestamp('endDate', { useTz: true })
      table.string('cloud') //optional
      table.text('actions').notNullable() //optional
      table.text('outcome').notNullable() //optional
      //
      table.timestamp('createdAt', { useTz: true })
      table.timestamp('updatedAt', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
