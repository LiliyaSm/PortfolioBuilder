import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'skills'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('project_id').unsigned().references('projects.id').onDelete('CASCADE') // delete post when user is deleted
      table.string('type').notNullable()
      table.string('value').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
