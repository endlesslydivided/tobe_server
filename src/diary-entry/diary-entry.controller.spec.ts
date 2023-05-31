import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize';
import { getConnectionToken } from '@nestjs/sequelize';
import { DiaryEntryController } from './diary-entry.controller';
import { DiaryEntryService } from './diary-entry.service';
import { CreateDiaryEntryDto } from './dto/createDiaryEntry.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

describe('DiaryEntryController', () => {
  let controller: DiaryEntryController;

  const diaryEntryMock = {
    userId:'0597bd40-5681-46ca-8ddf-6d6e735b20b5',
    text:'Fellin` good',
    happy:4,
    angry:5,
    bored:3,
    sad:4,
    neutral:3,
    entryDate:'24.03.23',
  }

  const diaryEntryServiceStub = {
    createDiaryEntry:jest.fn().mockResolvedValue(diaryEntryMock),
    getDiaryEntries:jest.fn().mockResolvedValue({rows:[diaryEntryMock],count:1}),
    deleteDiaryEntry:jest.fn().mockResolvedValue(1),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiaryEntryController],
      providers:[DiaryEntryService]

    }).overrideProvider(DiaryEntryService).useValue(diaryEntryServiceStub)
    .compile();

    controller = module.get<DiaryEntryController>(DiaryEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createDiaryEntry',() =>
  {
    const diaryEntryDto:CreateDiaryEntryDto ={
      ...diaryEntryMock
    }

    it('should create diary entry', async () => {
        const diaryEntry =  await controller.createDiaryEntry(diaryEntryDto);

        expect(diaryEntryServiceStub.createDiaryEntry).toHaveBeenCalledTimes(1);
        expect(diaryEntryServiceStub.createDiaryEntry).toBeCalledWith(diaryEntryDto);
        expect(diaryEntry).toEqual(diaryEntryMock);
    });

    it('should throw bad request exception', async () => {

      jest.spyOn(diaryEntryServiceStub, 'createDiaryEntry').mockImplementation(() => {
        throw new BadRequestException(`Example error`);
      });
      expect(() => controller.createDiaryEntry(diaryEntryDto)).toThrow(BadRequestException);
    });

    it('should throw internal server error exception', async () => {

      jest.spyOn(diaryEntryServiceStub, 'createDiaryEntry').mockImplementation(() => {
        throw new InternalServerErrorException(`Example error`);
      });
      expect(() => controller.createDiaryEntry(diaryEntryDto)).toThrow(InternalServerErrorException);
    });
  })
});
