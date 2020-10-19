import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ExecFileOptionsWithStringEncoding } from 'child_process';
import { title } from 'process';
import { CreateTasksDto } from './create-tasks.dto';
import { GetFilterTasksDto } from './get-tasks-filter-dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){}
    @Get()
    getTasks(@Query() filterDto:GetFilterTasksDto):Task[]{
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        }
        else{
            return this.tasksService.getAllTasks();
        }
        
    }

    @Post()
    createtask(
        @Body() creteTaskDto:CreateTasksDto
    ):Task{
  return this.tasksService.createTask(creteTaskDto);
    }
   @Get('/:id')
   getTaskById(@Param('id') id:string):Task{
       return this.tasksService.getTaskById(id);
   }
   @Delete('/:id')
   deleteTesk(@Param('id') id:string):void{
       this.tasksService.deleteTask(id);
   }

   @Put('/:id/status')
   updateTaslStatus(
       @Param('id') id:string,
       @Body('status')status:TaskStatus
       ):Task{
           return this.tasksService.updateTaskStatus(id,status);

   }
    
}
