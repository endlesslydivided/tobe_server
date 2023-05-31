import { getConnectionToken, getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Message } from './message.model';
import { MessageService } from './message.service';
import { MessageMood } from './messageMood.model';
import { MediaService } from '../media/media.service';
import { Sequelize } from 'sequelize';

describe('MessageService', () => {
  let service: MessageService;

    const mediaMock = {
    id:'b8ed5030-03a6-430a-ab9c-fe65ab3cc2c9',
    path:'/qwdafegferg.jpg',
    originalName:'avatar.jpg',
    type:'image',
    tweetRecordId:null,
    messageRecordId:null,
  }

  const messageMock = {
    id:'4321bd40-5681-46ca-8ddf-6d6e735b20b5',
    text:'Hello!',
    dialogId:'1597bd40-5681-46ca-8ddf-6d6e735b20b5',
    userId:'0597bd40-5681-46ca-8ddf-6d6e735b20b5',
    messageTweetId:null,
  }

  const messageMoodMock = {
    id:'4321bd40-5681-46ca-8ddf-6d6e735b20b5',
    userId: null,
    messageId: '4321bd40-5681-46ca-8ddf-6d6e735b20b5',
    isNeuralEstimated: true,
    isHappy: 1,
    isJoke: 1,
    isAngry: 0,
    isBored: 0,
    isSad: 0,
    isNeutral: 1
  }

  const messageRepositoryStub ={
    findAndCountAll:jest.fn().mockResolvedValue({rows:[messageMock], count:1}),
  }

  const mediaServiceStub= {
    createMessageMedia:jest.fn().mockResolvedValue(mediaMock.path)
  }

  const messageMoodRepositoryStub= {
    findOne:jest.fn().mockResolvedValue(messageMoodMock),
    create:jest.fn().mockResolvedValue(messageMoodMock)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: getModelToken(Message),
          useValue:messageRepositoryStub
        },
        {
          provide: getModelToken(MessageMood),
          useValue:messageMoodRepositoryStub
        },
        {
          provide:MediaService,
          useValue:mediaServiceStub
        },
        {
          provide: getModelToken(Message),
          useValue:messageRepositoryStub
        },
        {
          provide: getConnectionToken(),
          useValue: Sequelize
        },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
