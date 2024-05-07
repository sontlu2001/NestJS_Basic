import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoteService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async getNoteById(userId: number) {
    return await this.prismaService.note.findMany({
      where: {
        userId: userId,
      },
    })
  }
}
