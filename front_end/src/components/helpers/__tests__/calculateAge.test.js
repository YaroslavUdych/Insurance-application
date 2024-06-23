import calculateAge from '../calculateAge'

describe('calculateAge function', () => {
	it('should return correct age for the past date', () => {
		expect(calculateAge('01.01.2000')).toEqual('24')
	})

	it('should return correct age for the future date', () => {
		expect(calculateAge('01.01.2040')).toEqual('-16')
	})

	it('should return correct age for the current date', () => {
		const today = new Date()
		const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`
		expect(calculateAge(formattedDate)).toEqual('0')
	})
})
