import { forwardRef } from 'react';
import styles from '@/styles/ChatGpt.module.css';
import {Avatar, Grid, Typography} from '@mui/material';
import {deepOrange, deepPurple} from "@mui/material/colors";

type Props = {
    history: HistoryEntry[];
};

export const MessagesList = forwardRef<HTMLUListElement, Props>(function MessagesList(props, ref) {
    const { history } = props;

    const renderAvatar = (entry: HistoryEntry) => {
        const sx = {
            bgcolor: entry.author === 'me' ? deepOrange[500] : deepPurple[500],
        };
        return <Avatar sx={sx}>{entry.author[0].toUpperCase()}</Avatar>;
    };

    return (
        <ul className={styles.list} ref={ref}>
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
});