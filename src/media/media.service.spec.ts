import { Test, TestingModule } from '@nestjs/testing';
import { MediaService } from './media.service';
import { Media } from './media.model';
import { FilesService } from '../files/files.service';
import { getModelToken } from '@nestjs/sequelize';

describe('MediaService', () => {
  let service: MediaService;
  const mediaMock = {
    id:'b8ed5030-03a6-430a-ab9c-fe65ab3cc2c9',
    path:'/qwdafegferg.jpg',
    originalName:'avatar.jpg',
    type:'image',
    tweetRecordId:null,
    messageRecordId:null,
  }

  const mediaRepositoryStub= {
    create:jest.fn().mockResolvedValue(mediaMock)
  }

  const filesServiceStub= {
    createFile:jest.fn().mockResolvedValue(mediaMock.path),
    createMessageFile:jest.fn().mockResolvedValue(mediaMock.path)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaService,
      {
        provide:getModelToken(Media),
        useValue:mediaRepositoryStub
      },
      {
        provide:FilesService,
        useValue:mediaRepositoryStub
      }
    ],
    }).compile();

    service = module.get<MediaService>(MediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
