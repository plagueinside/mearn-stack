export default theme => ({
	layout: {
		width: 'auto',
		display: 'block', // Fix IE11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
			width: 500,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
	dialogTittle: {
		textAlign: 'center',
		paddingBottom: '0px'
	}
});