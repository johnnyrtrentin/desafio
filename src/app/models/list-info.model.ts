export class ListModelInformation {
    id: string;
    archive: boolean;
    active: boolean;
    name: string;
    description: string;
    tasks: Array<object> = [];
    status: Array<object> = [];
}
