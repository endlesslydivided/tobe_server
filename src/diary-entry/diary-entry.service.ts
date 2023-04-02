import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import {  DiaryEntry } from './diary-entry.model';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { CreateDiaryEntryDto } from './dto/createDiaryEntry.dto';
@Injectable()
export class DiaryEntryService {

     private logger: Logger = new Logger('DiaryEntryService');

    constructor(@InjectModel(DiaryEntry) private diaryEntryRepository:typeof DiaryEntry,
    @InjectConnection() private readonly sequelizeInstance: Sequelize)
    {}

    async createDiaryEntry(dto: CreateDiaryEntryDto) 
    {   
        const transaction: Transaction = await this.sequelizeInstance.transaction();
        const diaryEntry = await this.diaryEntryRepository.create(dto)
        .catch((error) => {
            this.logger.error(`Diary entry is not created: ${error.message}`);
            transaction.rollback();
            throw new InternalServerErrorException("Diary entry is not created.Internal server error");
        });        
        transaction.commit();
        return diaryEntry;
    }
}
