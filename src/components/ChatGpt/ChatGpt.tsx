import { ChangeEventHandler, FC, FormEventHandler, useState, useRef, useEffect, useCallback } from 'react';
import { CreateCompletionResponse } from 'openai';
import { Grid } from '@mui/material';
import MessagesList from '@/components/MessagesList';
import Form from '@/components/Form';
import { getSavedHistory, HISTORY_KEY } from './utils';

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

    const handleSubmit = () => {
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

    return (
        <Grid container direction="column" justifyContent="space-between" height="100vh">
            <Grid item md={10} overflow="scroll" ref={messagesWrapperRef}>
                <MessagesList history={history} ref={messagesListRef} />
            </Grid>
            <Grid item md={1}>
                <Form
                    onSubmit={handleSubmit}
                    onPromptChange={handlePromptChange}
                    ref={textareaRef}
                    isLoading={isLoading}
                    value={prompt}
                />
            </Grid>
        </Grid>
    )
};