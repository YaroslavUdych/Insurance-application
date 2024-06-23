import InsuredPerson from '../Models/InsuredPerson.js'
import Insurance from '../Models/Insurance.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const uploadPath = path.resolve(__dirname, '../uploads/')
		cb(null, uploadPath)
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	},
})

const upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		const mimeType = file.mimetype.split('/')[0]
		if (mimeType !== 'image') {
			cb(new Error('Uploaded file is not an image'), false)
		} else {
			cb(null, true)
		}
	},
}).single('profilePicture')

class appController {
	// GET:  get all insured persons
	static async getInsuredPersons(req, res) {
		try {
			const insuredPersons = await InsuredPerson.find().populate('insurances')
			res.status(200).json({ code: 200, ok: true, insuredPersons: insuredPersons })
		} catch (error) {
			res.status(400).json({ code: 400, ok: false, error: error, message: error.message })
		}
	}
	//GET:  get insured person by id
	static async getInsuredPerson(req, res) {
		try {
			const insuredPerson = await InsuredPerson.findById(req.params.id).populate('insurances')
			res.status(200).json({ code: 200, ok: true, insuredPerson: insuredPerson })
		} catch (error) {
			res.status(400).json({ code: 400, ok: false, error: error, message: error.message })
		}
	}
	//POST:  create insured person
	static async createInsuredPerson(req, res) {
		try {
			upload(req, res, async function (err) {
				if (err) {
					return res.status(400).json({
						code: 400,
						ok: false,
						message: 'Error uploading file: ' + err.message,
					})
				}

				const newInsurance = new Insurance({
					insuranceType: req.body.insuranceType,
					amount: req.body.amount,
					insuranceStartDate: req.body.insuranceStartDate,
					insuranceEndDate: req.body.insuranceEndDate,
				})

				const savedInsurance = await newInsurance.save()

				const newInsuredPerson = new InsuredPerson({
					profilePicture: '',
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					dateOfBirth: req.body.dateOfBirth,
					gender: req.body.gender,
					email: req.body.email,
					phone: req.body.phone,
					city: req.body.city,
					address: req.body.address,
					insurances: [savedInsurance._id],
				})

				await newInsuredPerson.save()
				if (req.file) {
					const personId = newInsuredPerson._id.toString()
					const folderPath = path.join('uploads/', personId)
					if (!fs.existsSync(folderPath)) {
						fs.mkdirSync(folderPath, { recursive: true })
					}

					const fileName = `${Date.now()}-${req.file.originalname}`
					const profilePicturePath = path.join(folderPath, fileName)
					fs.renameSync(req.file.path, profilePicturePath)

					newInsuredPerson.profilePicture = profilePicturePath.replace(/\\/g, '/')
					await newInsuredPerson.save()
				}
				res.status(200).json({
					code: 200,
					ok: true,
					message: 'Insured person created successfully',
					newInsuredPerson,
				})
			})
		} catch (error) {
			res.status(400).json({ code: 400, ok: false, error: error, message: error.message })
		}
	}
	//POST:  add insurance to person
	static async addInsuranceToPerson(req, res) {
		try {
			const newInsurance = new Insurance({
				insuranceType: req.body.insuranceType,
				amount: req.body.amount,
				insuranceStartDate: req.body.insuranceStartDate,
				insuranceEndDate: req.body.insuranceEndDate,
			})

			const newAddedInsurance = await newInsurance.save()

			const insuredPersonId = req.params.id
			const insuredPerson = await InsuredPerson.findById(insuredPersonId)

			if (!insuredPerson) {
				return res.status(404).json({ code: 404, ok: false, message: 'Insured person was not found' })
			}

			insuredPerson.insurances.push(newAddedInsurance._id)

			await insuredPerson.save()

			res.status(200).json({
				code: 200,
				ok: true,
				message: 'Insurance is added to the insured person',
				newAddedInsurance,
			})
		} catch (error) {
			res.status(400).json({ code: 400, ok: false, error: error, message: error.message })
		}
	}

	//PUT:  update insured person
	static async updateInsuredPerson(req, res) {
		try {
			upload(req, res, async function (err) {
				if (err) {
					return res.status(400).json({
						code: 400,
						ok: false,
						message: 'Error uploading file: ' + err.message,
					})
				}

				const insuredPersonId = req.params.id
				const updatedData = {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					dateOfBirth: req.body.dateOfBirth,
					gender: req.body.gender,
					email: req.body.email,
					phone: req.body.phone,
					city: req.body.city,
					address: req.body.address,
				}

				const updatedInsuredPerson = await InsuredPerson.findByIdAndUpdate(insuredPersonId, { $set: updatedData }, { new: true }).populate(
					'insurances'
				)

				if (!updatedInsuredPerson) {
					return res.status(404).json({ code: 404, ok: false, message: 'Insured person was not found' })
				}

				if (req.file) {
					const personId = updatedInsuredPerson._id.toString()
					const folderPath = path.join('uploads/', personId)
					fs.rmdirSync(folderPath, { recursive: true })
					if (!fs.existsSync(folderPath)) {
						fs.mkdirSync(folderPath, { recursive: true })
					}

					const fileName = `${Date.now()}-${req.file.originalname}`
					const profilePicturePath = path.join(folderPath, fileName)
					fs.renameSync(req.file.path, profilePicturePath)

					updatedInsuredPerson.profilePicture = profilePicturePath.replace(/\\/g, '/')
					await updatedInsuredPerson.save()
				}
				res.status(200).json({
					code: 200,
					ok: true,
					message: 'Insured person updated successfully',
				})
			})
		} catch (error) {
			res.status(400).json({ code: 400, ok: false, error: error, message: error.message })
		}
	}
	//PUT:  update insurance
	static async updateInsurance(req, res) {
		try {
			const insuranceId = req.params.id
			const updatedData = {
				insuranceType: req.body.insuranceType,
				amount: req.body.amount,
				insuranceStartDate: req.body.insuranceStartDate,
				insuranceEndDate: req.body.insuranceEndDate,
			}

			const updatedInsurance = await Insurance.findByIdAndUpdate(insuranceId, { $set: updatedData }, { new: true })

			if (!updatedInsurance) {
				return res.status(404).json({ code: 404, ok: false, message: 'Insurance was not found' })
			}

			res.status(200).json({
				code: 200,
				ok: true,
				message: 'Insurance updated successfully',
			})
		} catch (error) {
			res.status(400).json({ code: 400, ok: false, error: error, message: error.message })
		}
	}

	//DELETE:  delete insured person and his insurances
	static async deleteInsuredPerson(req, res) {
		try {
			const insuredPersonId = req.params.id

			const insuredPerson = await InsuredPerson.findById(insuredPersonId)

			if (!insuredPerson) {
				return res.status(404).json({ code: 404, ok: false, message: 'Insured person was not found' })
			}

			const insurancesToDelete = insuredPerson.insurances

			for (const insuranceId of insurancesToDelete) {
				await Insurance.findByIdAndDelete(insuranceId)
			}

			const folderPath = path.join('uploads', insuredPersonId.toString())
			if (fs.existsSync(folderPath)) {
				fs.rmdirSync(folderPath, { recursive: true })
			}
			await InsuredPerson.findByIdAndDelete(insuredPersonId)

			res.status(200).json({
				code: 200,
				ok: true,
				message: 'Insured person and their insurances deleted successfully',
			})
		} catch (error) {
			res.status(400).json({ code: 400, ok: false, error: error, message: error.message })
		}
	}

	//DELETE:  delete insurance
	static async deleteInsuranceFromPerson(req, res) {
		try {
			const insuranceId = req.params.insuranceId
			const insuredPersonId = req.params.personId

			const insuredPerson = await InsuredPerson.findById(insuredPersonId)

			if (!insuredPerson) {
				return res.status(404).json({ code: 404, ok: false, message: 'Insured person was not found' })
			}

			if (!insuredPerson.insurances.includes(insuranceId)) {
				return res.status(404).json({ code: 404, ok: false, message: 'Insurance does not belong to this insured person' })
			}

			await Insurance.findByIdAndDelete(insuranceId)

			insuredPerson.insurances = insuredPerson.insurances.filter((insurance) => insurance.toString() !== insuranceId)

			await insuredPerson.save()

			res.status(200).json({
				code: 200,
				ok: true,
				message: 'Insurance deleted from insured person and database successfully',
			})
		} catch (error) {
			res.status(400).json({ code: 400, ok: false, error: error, message: error.message })
		}
	}
}

export default appController
