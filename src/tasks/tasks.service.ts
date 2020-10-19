import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTasksDto } from './create-tasks.dto';
import { Console } from 'console';
import { GetFilterTasksDto } from './get-tasks-filter-dto';
@Injectable()
export class TasksService {
    private tasks:Task[]=[];
    getAllTasks():Task[]{
        return this.tasks;
    }
    getTasksWithFilters(filterDto:GetFilterTasksDto):Task[]{
        const {search,status}=filterDto;
        let tasks=this.getAllTasks();
        if(status){
            tasks=tasks.filter(task=>task.status===status)
        }
        if(search){
            tasks=tasks.filter(task=>
                task.title.includes(search)||
                task.description.includes(search)
                )
        }
        return tasks;
    }
    createTask(createTaskDto:CreateTasksDto):Task{
        const {title,description}=createTaskDto;
        console.log('uuid',uuid);
        const task:Task={
            id:uuid(),
            title,
            description,
            status:TaskStatus.DONE
        }

        this.tasks.push(task);
        return task;
    }
    getTaskById(id:string):Task{
        return this.tasks.find(task=>task.id===id);
    }
    deleteTask(id:string):void{
        this.tasks= this.tasks.filter(task=>task.id!==id)
    }
    updateTaskStatus(id:string,status:TaskStatus):Task{
        const task=this.getTaskById(id);
        console.log('status',status);
        task.status=status;
        console.log('status',status);
        return task;
    }
}
