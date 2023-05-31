import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Sequelize } from 'sequelize';
import { TransactionInterceptor } from 'src/transactions/transaction.interceptor';
import { getConnectionToken } from '@nestjs/sequelize';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
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
    isPublic:true,
    authorId:'0597bd40-5681-46ca-8ddf-6d6e735b20b5',
    parentRecordId: null,
    parentRecordAuthorId: null
  }

  const commentMock ={
    ...tweetMock,
    id:'223e4567-e89b-12d3-a456-426614174000',
    text:'My first comment content',
    isComment:true,
    parentRecordId: '123e4567-e89b-12d3-a456-426614174000',
    parentRecordAuthorId: '0597bd40-5681-46ca-8ddf-6d6e735b20b5'
  }

  const replyMock ={
    ...commentMock,
    id:'323e4567-e89b-12d3-a456-426614174000',
    text:'My first reply content',
    isComment:true,
    parentRecordId: '223e4567-e89b-12d3-a456-426614174000',
    parentRecordAuthorId: '0597bd40-5681-46ca-8ddf-6d6e735b20b5'  
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


  const usersServiceStub ={
    updateUserById:jest.fn().mockResolvedValue(userMock),
    updateMainPhoto:jest.fn().mockResolvedValue(mediaMock),
    updateProfilePhoto:jest.fn().mockResolvedValue(mediaMock),
    getUsers:jest.fn().mockResolvedValue({rows:[userMock],count:1}),
    getUserById:jest.fn().mockResolvedValue(userMock),
    getUserSubscriptions:jest.fn().mockResolvedValue({rows:[subMock],count:1}),
    getUserFollowers:jest.fn().mockResolvedValue({rows:[subMock],count:1}),
    getUserLikedTweets:jest.fn().mockResolvedValue({rows:[likedTweetMock],count:1}),
    getUserSavedTweets:jest.fn().mockResolvedValue({rows:[savedTweetMock],count:1}),
    getUserTweets:jest.fn().mockResolvedValue({rows:[tweetMock],count:1}),
    getUserTweetsAndReplies:jest.fn().mockResolvedValue({rows:[tweetMock],count:1}),
    getUserFeed:jest.fn().mockResolvedValue({rows:[tweetMock],count:1}),
    getUserMedia:jest.fn().mockResolvedValue({rows:[tweetMock],count:1}),
    getFollowingRequests:jest.fn(),
    getFollowersRequests:jest.fn(),
    getDialogsByUser:jest.fn().mockResolvedValue({rows:[dialogMock],count:1}),
    createLikedTweet:jest.fn().mockResolvedValue(likedTweetMock),
    createSavedTweet:jest.fn().mockResolvedValue(savedTweetMock),
    deleteLikedTweetById:jest.fn().mockResolvedValue(1),
    deleteSavedTweetById:jest.fn().mockResolvedValue(1),
    createFavoriteMessage:jest.fn().mockResolvedValue(favoriteMessageMock),
    deleteFavoriteMessage:jest.fn().mockResolvedValue(1),
    getUserFavoriteMessages:jest.fn().mockResolvedValue({rows:[favoriteMessageMock],count:1}),
    getUsersTodayMental:jest.fn(),
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers:[UserService,
        {
          provide: getConnectionToken(),
          useValue: Sequelize
        }
      ]

    }).overrideProvider(UserService).useValue(usersServiceStub)

    .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('likeTweet',() =>
  {
    it('should create liked tweet', async () => {
        const likedTweet =  await controller.likeTweet(userMock.id,tweetMock.id);

        expect(usersServiceStub.createLikedTweet).toHaveBeenCalledTimes(1);
        expect(usersServiceStub.createLikedTweet).toBeCalledWith(userMock.id,tweetMock.id);
        expect(likedTweet).toEqual(likedTweetMock);
    });

    it('should throw bad request exception', async () => {

      jest.spyOn(usersServiceStub, 'createLikedTweet').mockImplementation(() => {
        throw new BadRequestException(`Example error`);
      });
      expect(() => controller.likeTweet(userMock.id,tweetMock.id)).toThrow(BadRequestException);
    });

    it('should throw internal server error exception', async () => {

      jest.spyOn(usersServiceStub, 'createLikedTweet').mockImplementation(() => {
        throw new InternalServerErrorException(`Example error`);
      });
      expect(() => controller.likeTweet(userMock.id,tweetMock.id)).toThrow(InternalServerErrorException);
    });
  })

  describe('saveTweet',() =>
  {
    it('should create saved tweet', async () => {
        const savedTweet =  await controller.saveTweet(userMock.id,tweetMock.id);

        expect(usersServiceStub.createSavedTweet).toHaveBeenCalledTimes(1);
        expect(usersServiceStub.createSavedTweet).toBeCalledWith(userMock.id,tweetMock.id);
        expect(savedTweet).toEqual(savedTweetMock);
    });

    it('should throw bad request exception', async () => {

      jest.spyOn(usersServiceStub, 'createSavedTweet').mockImplementation(() => {
        throw new BadRequestException(`Example error`);
      });
      expect(() => controller.saveTweet(userMock.id,tweetMock.id)).toThrow(BadRequestException);
    });

    it('should throw internal server error exception', async () => {

      jest.spyOn(usersServiceStub, 'createSavedTweet').mockImplementation(() => {
        throw new InternalServerErrorException(`Example error`);
      });
      expect(() => controller.saveTweet(userMock.id,tweetMock.id)).toThrow(InternalServerErrorException);
    });
  })

  describe('markFavoriteMessage',() =>
  {
    it('should create marked message', async () => {
        const favoriteMessage =  await controller.markFavoriteMessage(userMock.id,messageMock.id);

        expect(usersServiceStub.createFavoriteMessage).toHaveBeenCalledTimes(1);
        expect(usersServiceStub.createFavoriteMessage).toBeCalledWith(userMock.id,messageMock.id);
        expect(favoriteMessage).toEqual(favoriteMessageMock);
    });

    it('should throw bad request exception', async () => {

      jest.spyOn(usersServiceStub, 'createFavoriteMessage').mockImplementation(() => {
        throw new BadRequestException(`Example error`);
      });
      expect(() => controller.markFavoriteMessage(userMock.id,messageMock.id)).toThrow(BadRequestException);
    });

    it('should throw internal server error exception', async () => {

      jest.spyOn(usersServiceStub, 'createFavoriteMessage').mockImplementation(() => {
        throw new InternalServerErrorException(`Example error`);
      });
      expect(() => controller.markFavoriteMessage(userMock.id,messageMock.id)).toThrow(InternalServerErrorException);
    });
  })
});
