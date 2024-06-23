import { Router } from 'express'
import appController from '../Controllers/appController.js'
import roleMiddleware from '../Middlewares/roleMiddleware.js'

const APP_ROUTER = Router()

APP_ROUTER.get('/get-insured-persons', [roleMiddleware('EMPLOYEE')], appController.getInsuredPersons)
APP_ROUTER.get('/get-insured-person/:id', [roleMiddleware('EMPLOYEE')], appController.getInsuredPerson)

APP_ROUTER.post('/create-insured-person', [roleMiddleware('EMPLOYEE')], appController.createInsuredPerson)
APP_ROUTER.post('/add-insurance-to-person/:id', [roleMiddleware('EMPLOYEE')], appController.addInsuranceToPerson)

APP_ROUTER.put('/update-insured-person/:id', [roleMiddleware('EMPLOYEE')], appController.updateInsuredPerson)
APP_ROUTER.put('/update-insurance/:id', [roleMiddleware('EMPLOYEE')], appController.updateInsurance)

APP_ROUTER.delete('/delete-insured-person/:id', [roleMiddleware('EMPLOYEE')], appController.deleteInsuredPerson)
APP_ROUTER.delete('/delete-insurance/:insuranceId/from/:personId', [roleMiddleware('EMPLOYEE')], appController.deleteInsuranceFromPerson)

export default APP_ROUTER
