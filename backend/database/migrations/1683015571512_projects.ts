import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary
      table.integer('portfolioId').unsigned().references('portfolios.id').onDelete('CASCADE') // delete post when portfolio is deleted
      table.boolean('isDraft').defaultTo(false)
      //
      table.string('clientName')
      table.text('clientDescription')
      table.text('clientIndustry')
      table.text('projectName')
      table.text('projectDescription')
      table.string('size')
      table.timestamp('startDate', { useTz: true })
      table.timestamp('endDate', { useTz: true })
      table.string('cloud')
      table.text('actions')
      table.text('outcome')
      table.text('teamSize')
      table.text('role')
      table.text('projectType')
      //
      table.timestamp('createdAt', { useTz: true })
      table.timestamp('updatedAt', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
