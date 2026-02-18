import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import type { ITask } from './tasks.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';
import { FindOneParams } from './find-one.params';
import { UpdateTaskStatusDto } from './update-task-status.dto';
import { UpdateTaskDto } from './update-task.dro';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    public findAll(): ITask[] {
        return this.tasksService.findAll();
    }

    @Get('/:id')
    public findOne(@Param() params: FindOneParams): ITask {
        return this.findOneOrFailt(params.id);
    }

    @Post()
    public createTasks(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.createTask(createTaskDto);
    }

    @Patch('/:id')
    public updateTaskStatus(
        @Param() params: FindOneParams,
        @Body() updateTaskDto: UpdateTaskDto
    ): ITask {
        const task = this.findOneOrFailt(params.id);
        this.tasksService.updateTask(task, updateTaskDto);

        return task;
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    public deleteTask(@Param() params: FindOneParams): void {
        const task = this.findOneOrFailt(params.id);
        this.tasksService.deleteTask(task);
    }

    private findOneOrFailt(id: string): ITask {
        const task = this.tasksService.findOne(id)

        if (!task) throw new NotFoundException();

        return task; 
    }
}


