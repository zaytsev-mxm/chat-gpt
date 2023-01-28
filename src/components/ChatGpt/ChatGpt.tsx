import {ChangeEventHandler, FC, FormEventHandler, useState, useRef, useEffect, useCallback} from 'react';
import { CreateCompletionResponse } from 'openai';
import { TextField, Button, Avatar, Grid, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { getSavedHistory, HISTORY_KEY, HistoryEntry } from '@/components/ChatGpt/utils';
import styles from '@/styles/ChatGpt.module.css';

type Props = {};

export const ChatGpt: FC<Props> = () => {
    const [isLoading, setIsLoading] = useState<boolean>();
    const [prompt, setPrompt] = useState<string>('');
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const textareaRef = useRef<HTMLInputElement>(null);
    const messagesWrapperRef = useRef<HTMLDivElement>(null);
    const messagesListRef = useRef<HTMLUListElement>(null);

    const setFocus = useCallback((time = 16) => {
        setTimeout(() => {
            textareaRef.current?.focus();
        }, time);
    }, [textareaRef]);

    const getData = async (prompt: string = ''): Promise<CreateCompletionResponse> => {
        const res = await fetch(`/api/chat?prompt=${prompt}`);
        return await res.json();
    };

    const updateHistory = (entry: HistoryEntry) => {
        setHistory((currentHistory) => {
            const updatedHistory = [
                ...currentHistory,
                entry,
            ];

            localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));

            return updatedHistory;
        });
    };

    const scrollToTheBottom = () => {
        requestAnimationFrame(() => {
            messagesWrapperRef.current?.scrollTo({
                top: (messagesListRef.current?.offsetHeight || 0) + 10000,
                left: 0,
                behavior: 'smooth',
            });
        });
    };

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        updateHistory({ author: 'me', text: prompt });
        setIsLoading(true);
        setPrompt('sending...');

        getData(prompt).then(data => {
            updateHistory({ author: 'robot', text: data.choices[0].text || '' });
            setPrompt('');
            setIsLoading(false);
            setFocus();
        });
    };

    const handlePromptChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setPrompt(event.target.value);
    };

    useEffect(() => {
        setFocus(100);
        setHistory(getSavedHistory());
    }, [setFocus, setHistory]);

    useEffect(() => {
        scrollToTheBottom();
    }, [history]);

    const renderAvatar = (entry: HistoryEntry) => {
        const sx = {
            bgcolor: entry.author === 'me' ? deepOrange[500] : deepPurple[500],
        };
        return <Avatar sx={sx}>{entry.author[0].toUpperCase()}</Avatar>;
    };

    const renderMessages = () => {
        return (
            <ul className={styles.list} ref={messagesListRef}>
                {history.map((entry, i) => {
                    const key = `entry_${i}`;
                    return (
                        <li key={key} className={styles.listItem}>
                            <Grid container flexWrap="nowrap">
                                <Grid item>
                                    {renderAvatar(entry)}
                                </Grid>
                                <Grid item>
                                    <div className={styles.item}>
                                        <Typography>
                                            {entry.text.trim()}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const renderForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <Grid container spacing={12} alignItems="center">
                    <Grid item md={9}>
                        <TextField
                            name="prompt"
                            id="prompt"
                            value={prompt}
                            onChange={handlePromptChange}
                            fullWidth={true}
                            disabled={isLoading}
                            inputRef={textareaRef}
                            autoFocus={true}
                        />
                    </Grid>
                    <Grid item md={3}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            size="large"
                            disabled={isLoading}
                        >
                            <SendIcon />
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    };

    return (
        <Grid container direction="column" justifyContent="space-between" height="100vh">
            <Grid item md={10} overflow="scroll" ref={messagesWrapperRef}>
                {renderMessages()}
            </Grid>
            <Grid item md={1}>
                {renderForm()}
            </Grid>
        </Grid>
    )
};