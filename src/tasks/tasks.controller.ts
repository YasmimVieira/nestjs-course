import { Controller, Get, Param } from '@nestjs/common';

@Controller('tasks')
export class TasksController {

    @Get()
    public findAll(): string[] {
        return ['A', 'B']
    }

    @Get('/:id')
    public findOne(@Param('id') id: any): string {
        return `The numbers is ${id}`
    }
}


