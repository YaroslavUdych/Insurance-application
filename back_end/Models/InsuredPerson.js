import { Schema, model } from 'mongoose'

const InsuredPersonSchema = new Schema(
	{
		profilePicture: {
			type: String,
		},

		firstName: {
			type: String,
			required: true,
		},

		lastName: {
			type: String,
			required: true,
		},

		dateOfBirth: {
			type: String,
			required: true,
		},

		gender: {
			type: String,
			required: true,
		},

		email: {
			type: String,
			required: true,
		},

		phone: {
			type: String,
			required: true,
		},

		city: {
			type: String,
			required: true,
		},

		address: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
		insurances: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Insurance',
				required: true,
			},
		],
	},
	{
		timestamps: true,
	}
)

export default model('InsuredPerson', InsuredPersonSchema)
