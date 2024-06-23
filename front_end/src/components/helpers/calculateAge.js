function calculateAge(dateString) {
	const today = new Date()
	const birthDate = new Date(dateString.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1'))

	let age = today.getFullYear() - birthDate.getFullYear()
	const monthDiff = today.getMonth() - birthDate.getMonth()
	const dayDiff = today.getDate() - birthDate.getDate()
	if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
		age--
	}

	return age.toString()
}

export default calculateAge
