import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { MediaService } from '../media/media.service';
import { Tweet } from './tweet.model';
import { TweetService } from './tweet.service';

describe('TweetService', () => {
  let service: TweetService;

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

  const mediaMock = {
    id:'b8ed5030-03a6-430a-ab9c-fe65ab3cc2c9',
    path:'/qwdafegferg.jpg',
    originalName:'avatar.jpg',
    type:'image',
    tweetRecordId:null,
    messageRecordId:null,
  }

  const tweetMock ={
    id:'123e4567-e89b-12d3-a456-426614174000',
    text:'My first post content',
    isComment:false,
    isPublic:false,
    authorId:'0597bd40-5681-46ca-8ddf-6d6e735b20b5',
    parentRecordId: null,
    parentRecordAuthorId: null
  }

  const tweetRepositoryStub ={
    findByPk:jest.fn().mockResolvedValue(tweetMock),
    create:jest.fn().mockResolvedValue(tweetMock),
    findAndCountAll:jest.fn().mockResolvedValue({rows:tweetMock,count:1}),
    count:jest.fn().mockResolvedValue(1),
    findAll:jest.fn().mockResolvedValue([tweetMock]),
    destroy:jest.fn().mockResolvedValue(1),
    restore:jest.fn(),
  }

  const mediaServiceStub = {
    createTweetMedia:jest.fn().mockResolvedValue(mediaMock),
    createMessageMedia:jest.fn().mockResolvedValue(mediaMock),
    createUserPhotoMedia:jest.fn().mockResolvedValue(mediaMock),
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers:[
        TweetService,
        {
          provide: getModelToken(Tweet),
          useValue:tweetRepositoryStub
        },
        {
          provide:MediaService,
          useValue:mediaServiceStub
        }
      ]
    }).compile();

    service = module.get<TweetService>(TweetService);
    jest.clearAllMocks();
  })

  it('should be defined',() => {
    expect(service).toBeDefined();
  })

});
