type ListItem = {
    // Value type for string keys
    id: string;
    text: string;
    timestamp: string;
    complete: boolean;
    hasBeenUpdated: boolean;
    isImportant: boolean;
};

interface SelectedListProps {
    id: string;
    name: string;
    timeStamp: string;
}
interface ListProps {
    [key: string]: ListItem;
}

interface ListViewProps {
    data: Object;
    list: ListItem[];
    setList: Function;
}

export type { SelectedListProps, ListItem, ListProps, ListViewProps }