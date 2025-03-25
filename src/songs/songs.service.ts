import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from '../song.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {
    this.initializeSongs();
  }

  private async initializeSongs() {
    const count = await this.songsRepository.count();
    if (count === 0) {
      const songs = [
        {
          title: 'Tum Hi Ho',
          artist: 'Arijit Singh',
          album: 'Aashiqui 2',
          genre: 'Bollywood',
          audioUrl: '/assets/audio/tum-hi-ho.mp3',
          imageUrl: '/assets/images/aashiqui2.jpg',
          duration: 258,
        },
        {
          title: 'Channa Mereya',
          artist: 'Arijit Singh',
          album: 'Ae Dil Hai Mushkil',
          genre: 'Bollywood',
          audioUrl: '/assets/audio/channa-mereya.mp3',
          imageUrl: '/assets/images/adhm.jpg',
          duration: 211,
        }
      ];
      await this.songsRepository.save(songs);
    }
  }

  async findAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  async search(query: string): Promise<Song[]> {
    return this.songsRepository
      .createQueryBuilder('song')
      .where('song.title LIKE :query OR song.artist LIKE :query', {
        query: `%${query}%`,
      })
      .getMany();
  }

  async findById(id: number): Promise<Song | null> {
    return this.songsRepository.findOne({ where: { id } });
  }
}
