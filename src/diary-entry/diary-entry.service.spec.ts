import { getConnectionToken, getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize';
import { DiaryEntry } from './diary-entry.model';
import { DiaryEntryService } from './diary-entry.service';

describe('DiaryEntryService', () => {
  let service: DiaryEntryService;

  const userMock={
    id: '0597bd40-5681-46ca-8ddf-6d6e735b20b5',
    firstname: 'Александр',
    surname: 'Ковалев',
    description: 'Привет всем! Я люблю заниматься фотографией, программированием и ищу новых друзей!',
    email: 'sashakovalev2002@hotmail.com',
    emailConfirmed: true,
    password: '$2b$10$wOKqbWYVfqiRt3f9GrjgAOyixJ82B3k3iOV6I',
    salt: '$2b$10$wOKqbWYVfqiRt3f9GrjgAO',
    sex: 'man',
    country: 'Belarus',
    city: 'Minsk',
    accessFailedCount: 0,
    mainPhotoId: 'b8ed5030-03a6-430a-ab9c-fe65ab3cc2c9',
    profilePhotoId: '9bdbcda2-e3f8-46da-bd11-223a3c914868'
  };

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

  const diaryEntryRepositoryStub = {
    create:jest.fn().mockResolvedValue(diaryEntryMock),
    findAndCountAll:jest.fn().mockResolvedValue({rows:[diaryEntryMock],count:1}),
    destroy:jest.fn().mockResolvedValue(1),
  }

  const diaryEntryServiceStub = {
    createDiaryEntry:jest.fn().mockResolvedValue(diaryEntryMock),
    getDiaryEntries:jest.fn().mockResolvedValue({rows:[diaryEntryMock],count:1}),
    deleteDiaryEntry:jest.fn().mockResolvedValue(1),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiaryEntryService,
        {
          provide: getModelToken(DiaryEntry),
          useValue:diaryEntryRepositoryStub
        },
        {
          provide: getConnectionToken(),
          useValue: Sequelize
        }
      ],
    }).overrideProvider(DiaryEntryService).useValue(diaryEntryServiceStub)
    .compile();

    service = module.get<DiaryEntryService>(DiaryEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
