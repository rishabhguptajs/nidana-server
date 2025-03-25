import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column()
  album: string;

  @Column()
  genre: string;

  @Column({ nullable: true })
  audioUrl: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  duration: number;
}
