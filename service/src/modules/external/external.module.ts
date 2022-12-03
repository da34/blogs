import { CacheModule, Module } from '@nestjs/common';
import { ExternalService } from './external.service';
import { ExternalController } from './external.controller';
import { HttpModule } from '@nestjs/axios';
// import { CommentsService } from '../comments/comments.service';

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [ExternalController],
  providers: [ExternalService],
  exports: [ExternalService],
})
export class ExternalModule {}
