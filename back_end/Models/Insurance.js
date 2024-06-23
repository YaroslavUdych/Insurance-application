import { Schema, model } from 'mongoose'

const InsuranceSchema = new Schema(
	{
		insuranceType: {
			type: String,
			required: true,
		},

		amount: {
			type: String,
			required: true,
		},

		insuranceStartDate: {
			type: String,
			required: true,
		},

		insuranceEndDate: {
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
	},
	{
		timestamps: true,
	}
)

export default model('Insurance', InsuranceSchema)
