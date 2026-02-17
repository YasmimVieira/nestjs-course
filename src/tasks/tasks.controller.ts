import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import type { ITask } from './tasks.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    public findAll(): ITask[] {
        return this.tasksService.findAll();
    }

    @Get('/:id')
    public findOne(@Param('id') id: string): ITask {
        const task = this.tasksService.findOne(id)

        if (task) return task;

        throw new NotFoundException();
    }

    @Post()
    public createTasks(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.createTask(createTaskDto);
    }
}


