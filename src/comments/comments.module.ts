import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import {
  AdminCommentsController,
  CommentsController,
} from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { ExternalModule } from '../external/external.module';
import { Content } from '../contents/entities/content.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Content]),
    ExternalModule,
    HttpModule,
  ],
  controllers: [CommentsController, AdminCommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
