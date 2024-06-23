// Desc: Loader component

import CircularProgress from '@mui/material/CircularProgress'

const Loader = () => {
	return (
		<CircularProgress
			color="primary"
			size={50}
			sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				zIndex: 9999,
			}}
		/>
	)
}

export default Loader
