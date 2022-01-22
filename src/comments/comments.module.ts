import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { ExternalModule } from '../external/external.module';
import { Content } from '../contents/entities/content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Content]), ExternalModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
