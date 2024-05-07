import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MyJWTGuard } from 'src/auth/guard';
import { NoteService } from './note.service';
import { GetUser } from 'src/auth/decorator';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService){}

  @UseGuards(MyJWTGuard)
  @Get('findByUser/:id')
  getNoteById(@Param('id') userId: string | number) {
    return this.noteService.getNoteById(Number(userId));
  }

}
