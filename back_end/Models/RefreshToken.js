import { Schema, model } from 'mongoose'

const RefreshTokenSchema = new Schema({
	refreshToken: {
		type: String,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
})

export default model('RefreshToken', RefreshTokenSchema)
