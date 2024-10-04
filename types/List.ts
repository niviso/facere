type ListItemProps = {
    // Value type for string keys
    id: string;
    text: string;
    timestamp: string;
    complete: boolean;
    hasBeenUpdated: boolean;
    isImportant: boolean;
};

interface List {
    id: string;
    name: string;
    timeStamp: string;
}
interface ListProps {
    [key: string]: ListItemProps;
}

export type { List, ListItemProps, ListProps }