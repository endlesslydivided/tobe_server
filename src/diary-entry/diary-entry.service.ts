import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import {  DiaryEntry } from './diary-entry.model';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Op, Transaction } from 'sequelize';
import { CreateDiaryEntryDto } from './dto/createDiaryEntry.dto';
import DBQueryParameters from 'src/requestFeatures/dbquery.params';
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

    async getDiaryEntries(filters : DBQueryParameters,currentUserId:string)
    {   
        const result = await this.diaryEntryRepository.findAndCountAll(
        {
            where:{createdAt:{ [Op.lt]:filters.createdAt}},
            limit:filters.limit,
            order:[...filters.order],
        }).catch((error) => {
          this.logger.error(`Diary entries aren't found: ${error.message}`);
          throw new InternalServerErrorException("Diary entries aren't found. Internal server error.");
        });
  
        return result;
    }

    async deleteDiaryEntry(id: string) 
    {
        return await this.diaryEntryRepository.destroy({ where: { id } }).catch((error) => {
          this.logger.error(`Diary entry is not deleted: ${error.message}`);
          throw new InternalServerErrorException("Diary entry is not deleted.Internal server error");
        });;
    }

}
