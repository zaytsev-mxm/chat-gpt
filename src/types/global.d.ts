export {};

declare global {
    declare type HistoryEntry = {
        author: 'me' | 'robot';
        text: string;
    };
}