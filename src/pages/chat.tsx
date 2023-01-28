import { FC, ReactNode } from 'react';
import { Grid, Box, Container } from '@mui/material';
import ChatGpt from '@/components/ChatGpt';

const ChatPage: FC = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ flexGrow: 1 }} height="100vh">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ChatGpt/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default ChatPage;