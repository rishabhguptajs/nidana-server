import {
  Controller,
  Get,
  Query,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from '../song.entity';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  findAll(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  @Get('search')
  search(@Query('q') query: string): Promise<Song[]> {
    return this.songsService.search(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Song> {
    const song = await this.songsService.findById(parseInt(id, 10));
    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
    return song;
  }
}
