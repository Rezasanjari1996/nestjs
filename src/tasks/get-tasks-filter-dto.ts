import { TaskStatus } from "./tasks.model";

export class GetFilterTasksDto{
    status:TaskStatus;
    search:string;
}