import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Todo extends BaseModel {
  // This column will auto-generate a unique id
  @column({ isPrimary: true })
  public id!: number;

  // This column will store the description of the todo (maps to 'text' on frontend)
  @column()
  public description: string="";

  // This column will store the completed status of the todo
  @column()
  public completed: boolean= false;

  // This column will automatically set the createdAt timestamp when a new todo is created
  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime;

  // This column will automatically update the updatedAt timestamp when the todo is updated
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime;
}
