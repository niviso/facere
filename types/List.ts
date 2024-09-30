type ListItemProps = {
    // Value type for string keys
    id: string;
    text: string;
    timestamp: string;
    complete: boolean;
    hasBeenUpdated: boolean;
    isImportant: boolean;


};

interface ListProps {
    [key: string]: ListItemProps;
}

export type { ListItemProps, ListProps }