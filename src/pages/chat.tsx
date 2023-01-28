import { FC } from 'react';
import Head from 'next/head'
import { Grid, Box, Container } from '@mui/material';
import ChatGpt from '@/components/ChatGpt';

const ChatPage: FC = () => {
    return (
        <>
            <Head>
                <title>Chat GPT demo</title>
                <meta property="og:title" content="Chat GPT demo" key="title" />
            </Head>
            <Container maxWidth="md">
                <Box sx={{ flexGrow: 1 }} height="100vh">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ChatGpt/>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default ChatPage;