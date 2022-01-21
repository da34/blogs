import { CacheModule, Module } from '@nestjs/common';
import { ExternalService } from './external.service';
import { ExternalController } from './external.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [ExternalController],
  providers: [ExternalService],
})
export class ExternalModule {}
