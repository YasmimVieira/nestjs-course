import { Injectable } from '@nestjs/common';
import { ITask, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './create-task.dto';
import { randomUUID } from 'crypto';
import { UpdateTaskDto } from './update-task.dro';
import { WrongTaskStatusException } from './exceptions/wrong-task-status.exceptions';

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
        if (
            updateTaskDto.status &&
            !this.isValidStatusTransation(task.status, updateTaskDto.status)
        ) {
            throw new WrongTaskStatusException();
        }
        Object.assign(task, updateTaskDto);

        return task;
    }

    private isValidStatusTransation(
        currentStatus: TaskStatus,
        newStatus: TaskStatus
    ): boolean {
        const statusOrder = [
            TaskStatus.OPEN,
            TaskStatus.IN_PROGRESS,
            TaskStatus.DONE
        ];

        return statusOrder.indexOf(currentStatus) <= statusOrder.indexOf(newStatus);
    }

}

