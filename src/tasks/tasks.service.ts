import { Injectable } from '@nestjs/common';
import { ITask } from './tasks.model';
import { CreateTaskDto } from './create-task.dto';
import { randomUUID } from 'crypto';
import { UpdateTaskDto } from './update-task.dro';

@Injectable()
export class TasksService {
    private tasks: ITask[] = [];

    public findAll(): ITask[] {
        return this.tasks;
    }

    public findOne(id: string): ITask | undefined {
        return this.tasks.find((task) => task.id === id);
    }

    public createTask(createTaskDto: CreateTaskDto): ITask {
        const task: ITask = {
            id: randomUUID(),
            ...createTaskDto
        };

        this.tasks.push(task);

        return task;
    }

    public deleteTask(task: ITask): void {
        this.tasks = this.tasks.filter((filtered) => filtered.id !== task.id)
    }

    public updateTask(task: ITask, updateTaskDto: UpdateTaskDto): ITask {
        Object.assign(task, updateTaskDto);

        return task;
    }

}
