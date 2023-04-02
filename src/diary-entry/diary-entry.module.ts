import { Module } from '@nestjs/common';
import { DiaryEntryService } from './diary-entry.service';
import { DiaryEntryController } from './diary-entry.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiaryEntry } from './diary-entry.model';

@Module({
  providers: [DiaryEntryService],
  imports:[SequelizeModule.forFeature([DiaryEntry])],
  controllers: [DiaryEntryController]
})
export class DiaryEntryModule {}
