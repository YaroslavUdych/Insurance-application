import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AuthContextProvider } from './AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter>
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<AuthContextProvider>
				<App />
			</AuthContextProvider>
		</LocalizationProvider>
	</BrowserRouter>
)

reportWebVitals()
