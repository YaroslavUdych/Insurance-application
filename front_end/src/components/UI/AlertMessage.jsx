// Desc: Alert message component

import Alert from '@mui/material/Alert'

const AlertMessage = function ({ message, severity, open, onClose }) {
	return (
		<Alert
			open={open}
			severity={severity}
			variant="filled"
			sx={{
				height: '60px',
				width: '600px',
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				zIndex: '100',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
			onClose={onClose}
		>
			{message}{' '}
		</Alert>
	)
}

export default AlertMessage
