// Desc: full screen dialog component

import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
})

export default function FullScreenDialog({ handleClose, title, content, open }) {
	return (
		<React.Fragment>
			<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
				<AppBar sx={{ backgroundColor: '#704241' }}>
					<Toolbar sx={{ width: '100%' }}>
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2 }} variant="h6" component="div">
							{title}
						</Typography>
					</Toolbar>
				</AppBar>
				{content}
			</Dialog>
		</React.Fragment>
	)
}
