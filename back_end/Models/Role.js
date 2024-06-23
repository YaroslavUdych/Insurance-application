import { Schema, model } from 'mongoose'

const RoleSchema = new Schema({
	value: {
		type: String,
		unique: true,
		default: 'EMPLOYEE',
	},
})

export default model('Role', RoleSchema)
