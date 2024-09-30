type StringIndexedType = {
    // Value type for string keys
    [key: string]: string;
};

export default interface RouteProps{
    setView: Function;
    data: StringIndexedType;
    view: StringIndexedType;
}