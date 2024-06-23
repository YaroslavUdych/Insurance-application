// Desc: object with methods for validating form fields, returns message string and isValid boolean

const validate = {
	// validate name
	name: (value) => {
		const regex = /^[a-zA-Zа-яА-Я0-9\s]*$/
		let message
		let isValid
		if (!value) {
			message = 'please fill in the field'
			isValid = false
		} else if (value.length < 3) {
			message = 'field must be 3 or more characters'
			isValid = false
		} else if (!regex.test(value)) {
			message = 'field can not contain symbols'
			isValid = false
		} else {
			isValid = true
		}

		return { message, isValid }
	},
	// validate email
	email: (value) => {
		let message
		let isValid

		if (!value) {
			message = 'please fill in the field'
			isValid = false
			isValid = false
		} else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
			message = 'email must be valid'
			isValid = false
		} else {
			isValid = true
		}
		return { message, isValid }
	},

	// validate if field is empty
	isEmpty: (value) => {
		let message
		let isValid

		if (!value) {
			message = 'please fill in the field'
			isValid = false
		} else {
			isValid = true
		}
		return { message, isValid }
	},
	// validate phone number
	phone: (value) => {
		let message
		let isValid

		if (!value) {
			message = 'please fill in the field'
			isValid = false
		} else if (!/^\+\d{3}\d{9}$/.test(value)) {
			message = 'phone number must be valid format +420123456789'
			isValid = false
		} else {
			isValid = true
		}
		return { message, isValid }
	},

	// validate select field
	select: (value) => {
		let message
		let isValid

		if (!value) {
			message = 'please select an option'
			isValid = false
		} else {
			isValid = true
		}
		return { message, isValid }
	},
	date: (value) => {
		let message
		let isValid

		if (!value) {
			message = 'please choose a date'
			isValid = false
		} else if (isNaN(value.$D)) {
			message = 'please choose a valid date'
			isValid = false
		} else {
			isValid = true
		}
		return { message, isValid }
	},
}

export default validate
