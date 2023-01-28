import {ChangeEventHandler, FormEventHandler, forwardRef, ForwardedRef} from 'react';
import {Button, Grid, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

type Props = {
    onSubmit?: () => void;
    onPromptChange?: ChangeEventHandler<HTMLTextAreaElement>;
    isLoading?: boolean;
    value: string;
};

export const Form = forwardRef(function Form(props: Props, ref: ForwardedRef<HTMLElement>) {
    const { onSubmit, onPromptChange, isLoading, value } = props;

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        onSubmit?.();
    };

    const handlePromptChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        onPromptChange?.(event);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={12} alignItems="center">
                <Grid item md={9}>
                    <TextField
                        name="prompt"
                        id="prompt"
                        value={value}
                        onChange={handlePromptChange}
                        fullWidth={true}
                        disabled={isLoading}
                        inputRef={ref}
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
});