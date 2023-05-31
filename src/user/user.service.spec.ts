import { Test, TestingModule } from '@nestjs/testing';
import { Dialog } from '../dialog/dialog.model';
import { MediaService } from '../media/media.service';
import { FavoriteMessage } from '../message/favoriteMessage.model';
import { Message } from '../message/message.model';
import { Subscription } from '../subscription/subscription.model';
import { LikedTweet } from '../tweet/likedTweet.model';
import { SavedTweet } from '../tweet/savedTweet.model';
import { Tweet } from '../tweet/tweet.model';
import { UserService } from './user.service';
import { User } from './user.model';
import { getModelToken } from '@nestjs/sequelize';

describe('UserService', () => {
  let service: UserService;

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

  const subMock ={
    id:'1597bd40-5681-46ca-8ddf-6d6e735b20b5',
    subscriberId:'2597bd40-5681-46ca-8ddf-6d6e735b20b5',
    subscribedUserId:'0597bd40-5681-46ca-8ddf-6d6e735b20b5',
    isRejected:false
  }

  const dialogMock ={
    id:'1597bd40-5681-46ca-8ddf-6d6e735b20b5',
    name:null,
    isGroup:false,
    creatorId:'0597bd40-5681-46ca-8ddf-6d6e735b20b5'
  }

  const messageMock = {
    id:'4321bd40-5681-46ca-8ddf-6d6e735b20b5',
    text:'Hello!',
    dialogId:'1597bd40-5681-46ca-8ddf-6d6e735b20b5',
    userId:'0597bd40-5681-46ca-8ddf-6d6e735b20b5',
    messageTweetId:null,
  }

  const likedTweetMock ={
    userId:'0597bd40-5681-46ca-8ddf-6d6e735b20b5',
    tweetId:'123e4567-e89b-12d3-a456-426614174000',
  }

  const savedTweetMock ={
    userId:'0597bd40-5681-46ca-8ddf-6d6e735b20b5',
    tweetId:'123e4567-e89b-12d3-a456-426614174000',
  }

  const favoriteMessageMock ={
    userId:'0597bd40-5681-46ca-8ddf-6d6e735b20b5',
    tweetId:'123e4567-e89b-12d3-a456-426614174000',
  }

  const subsRepositoryStub = {
    findOne:jest.fn().mockResolvedValue(subMock),
    findAll:jest.fn().mockResolvedValue([subMock]),
    findAndCountAll:jest.fn().mockResolvedValue({rows:[subMock], count:1}),
  }

  const userRepositoryStub = {
    create:jest.fn().mockResolvedValue(userMock),
    findOne:jest.fn().mockResolvedValue(userMock),
    sequelize:jest.fn(),
    findByPk:jest.fn().mockResolvedValue(userMock),
    findAndCountAll:jest.fn().mockResolvedValue({rows:[userMock], count:1}),
  }

  const botMessageRepositoryStub ={
    findAll:jest.fn(),
  }

  const dialogRepositoryStub ={
    findAndCountAll:jest.fn().mockResolvedValue({rows:[dialogMock], count:1})
  }

  const likedTweetRepositoryStub ={
    create:jest.fn().mockResolvedValue(likedTweetMock),
    destroy:jest.fn().mockResolvedValue(1),
  }

  const favoriteMessageRepositoryStub ={
    create:jest.fn().mockResolvedValue(favoriteMessageMock),
    destroy:jest.fn().mockResolvedValue(1),
  }

  const messageRepositoryStub ={
    findAndCountAll:jest.fn().mockResolvedValue({rows:[messageMock], count:1}),
  }

  const savedTweetRepositoryStub ={
    create:jest.fn().mockResolvedValue(savedTweetMock),
    destroy:jest.fn().mockResolvedValue(1),
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
        UserService,
        {
          provide: getModelToken(User),
          useValue:userRepositoryStub
        },
        {
          provide: getModelToken(Subscription),
          useValue:subsRepositoryStub
        },
        {
          provide: getModelToken(Tweet),
          useValue:tweetRepositoryStub
        },
        {
          provide: getModelToken(Dialog),
          useValue:dialogRepositoryStub
        },
        {
          provide: getModelToken(LikedTweet),
          useValue:likedTweetRepositoryStub
        },
        {
          provide: getModelToken(FavoriteMessage),
          useValue:favoriteMessageRepositoryStub
        },
        {
          provide: getModelToken(Message),
          useValue:messageRepositoryStub
        },
        {
          provide: getModelToken(SavedTweet),
          useValue:savedTweetRepositoryStub
        },
        {
          provide: MediaService,
          useValue:mediaServiceStub
        },

      ]
    }).compile();

    service = module.get<UserService>(UserService);
    jest.clearAllMocks();
  })

  it('should be defined',() => {
    expect(service).toBeDefined();
  })
});
