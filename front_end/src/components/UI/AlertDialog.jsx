// Desc: Alert Dialog component for confirmation of actions

import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const AlertDialog = function ({
	handleClose,
	title,
	content,
	open,
	handleAction,
	closeButtonText = 'Cancel',
	actionButtonText = 'Yes, delete',
}) {
	return (
		<React.Fragment>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">{content}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>{closeButtonText}</Button>
					<Button
						onClick={() => {
							handleAction()
							handleClose()
						}}
						autoFocus
					>
						{actionButtonText}
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	)
}

export default AlertDialog
