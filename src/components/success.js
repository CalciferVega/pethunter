import { Box } from "@material-ui/core"

const Success = ({ message }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <h2>{message}</h2>
            </Box>
        </Box>
    )
}