import { Test, TestingModule } from '@nestjs/testing';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { getConnectionToken } from '@nestjs/sequelize';
import { Sequelize, Transaction } from 'sequelize';
import sequelize from 'sequelize';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import QueryParameters from 'src/requestFeatures/query.params';
import { CurrentUserArgs } from 'src/auth/decorators/currentUserArgs.decorator';

describe('PostController', () => {
  let controller: TweetController;

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
    
  const tweetServiceMock ={
    createTweet:jest.fn().mockResolvedValue(tweetMock),
    getComments:jest.fn().mockResolvedValue({rows:[commentMock],count:1}),
    getReplies:jest.fn().mockResolvedValue({rows:[replyMock],count:1}),
    getTopTweets:jest.fn().mockResolvedValue({rows:[tweetMock],count:1}),
    getMediaTweets:jest.fn().mockResolvedValue({rows:[tweetMock],count:1}),
    getTweetById:jest.fn().mockResolvedValue(tweetMock),
    getTweets:jest.fn().mockResolvedValue({rows:[tweetMock],count:1}),
    deleteTweetById:jest.fn().mockResolvedValue(1),
    restoreTweetById:jest.fn().mockResolvedValue(tweetMock),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

      controllers:[TweetController],
      providers:[TweetService,
        {
          provide: getConnectionToken(),
          useValue: Sequelize
        }]
    }).overrideProvider(TweetService).useValue(tweetServiceMock).compile();

    controller = module.get<TweetController>(TweetController);
  })

  it('should be defined',() => {
    expect(controller).toBeDefined();
  })

  describe('createPost',() =>
  {
    const tweetDto ={
      text: tweetMock.text,
      isComment: tweetMock.isComment,
      isPublic: tweetMock.isPublic,
      authorId: tweetMock.authorId,
      parentRecordAuthorId: tweetMock.parentRecordAuthorId,
      parentRecordId: tweetMock.parentRecordId,
    }

    it('should create post', async () => {
        const tweet =  await controller.createTweet([],tweetDto,null);

        expect(tweetServiceMock.createTweet).toHaveBeenCalledTimes(1);
        expect(tweetServiceMock.createTweet).toBeCalledWith([],tweetDto,null);
        expect(tweet).toEqual(tweetMock);
    });

    it('should throw bad request exception', async () => {

      jest.spyOn(tweetServiceMock, 'createTweet').mockImplementation(() => {
        throw new BadRequestException(`Example error`);
      });
      expect(() => controller.createTweet([],tweetDto,null)).toThrow(BadRequestException);
    });

    it('should throw internal server error exception', async () => {

      jest.spyOn(tweetServiceMock, 'createTweet').mockImplementation(() => {
        throw new InternalServerErrorException(`Example error`);
      });
      expect(() => controller.createTweet([],tweetDto,null)).toThrow(InternalServerErrorException);
    });
  })

  describe('getComments',() =>
  {
    const parentId = '123e4567-e89b-12d3-a456-426614174000';

    const filters:QueryParameters ={
      limit:10,
      createdAt:null,
      page:1,
      orderBy:'createdAt',
      orderDirection:'desc'
    }

    const currentUser:CurrentUserArgs={
      userId: userMock.id,
      email:userMock.email
    }

    it('should get post comments', async () => {
        const comments =  await controller.getComments(parentId,filters,currentUser);

        expect(tweetServiceMock.getComments).toHaveBeenCalledTimes(1);
        expect(tweetServiceMock.getComments).toBeCalledWith(parentId,filters,currentUser.userId);
        expect(comments).toEqual({rows:[commentMock],count:1});
    });

    it('should throw internal server error exception', async () => {

      jest.spyOn(tweetServiceMock, 'getComments').mockImplementation(() => {
        throw new InternalServerErrorException(`Example error`);
      });
      expect(() => controller.getComments(parentId,filters,currentUser)).toThrow(InternalServerErrorException);
    });
  })

  describe('getReplies',() =>
  {
    const parentId = '123e4567-e89b-12d3-a456-426614174000';

    const filters:QueryParameters ={
      limit:10,
      createdAt:null,
      page:1,
      orderBy:'createdAt',
      orderDirection:'desc'
    }

    const currentUser:CurrentUserArgs={
      userId: userMock.id,
      email:userMock.email
    }

    it('should get comments replies', async () => {
        const replies =  await controller.getReplies(parentId,filters,currentUser);

        expect(tweetServiceMock.getReplies).toHaveBeenCalledTimes(1);
        expect(tweetServiceMock.getReplies).toBeCalledWith(parentId,filters,currentUser.userId);
        expect(replies).toEqual({rows:[replyMock],count:1});
    });

    it('should throw internal server error exception', async () => {

      jest.spyOn(tweetServiceMock, 'getReplies').mockImplementation(() => {
        throw new InternalServerErrorException(`Example error`);
      });
      expect(() => controller.getReplies(parentId,filters,currentUser)).toThrow(InternalServerErrorException);
    });
  })

  describe('getTopPosts',() =>
  {

    const filters:QueryParameters ={
      limit:10,
      createdAt:null,
      page:1,
      orderBy:'createdAt',
      orderDirection:'desc'
    }

    const currentUser:CurrentUserArgs={
      userId: userMock.id,
      email:userMock.email
    }

    it('should get top posts', async () => {
        const topTweets =  await controller.getTopTweets(filters,currentUser);

        expect(tweetServiceMock.getTopTweets).toHaveBeenCalledTimes(1);
        expect(tweetServiceMock.getTopTweets).toBeCalledWith(filters,currentUser.userId);
        expect(topTweets).toEqual({rows:[tweetMock],count:1});
    });

    it('should throw internal server error exception', async () => {

      jest.spyOn(tweetServiceMock, 'getTopTweets').mockImplementation(() => {
        throw new InternalServerErrorException(`Example error`);
      });
      expect(() => controller.getTopTweets(filters,currentUser)).toThrow(InternalServerErrorException);
    });
  })

  describe('getMediaPosts',() =>
  {

    const filters:QueryParameters ={
      limit:10,
      createdAt:null,
      page:1,
      orderBy:'createdAt',
      orderDirection:'desc'
    }

    const currentUser:CurrentUserArgs={
      userId: userMock.id,
      email:userMock.email
    }

    it('should get media posts', async () => {
        const mediaTweets =  await controller.getMediatTweets(filters,currentUser);

        expect(tweetServiceMock.getMediaTweets).toHaveBeenCalledTimes(1);
        expect(tweetServiceMock.getMediaTweets).toBeCalledWith(filters,currentUser.userId);
        expect(mediaTweets).toEqual({rows:[tweetMock],count:1});
    });

    it('should throw internal server error exception', async () => {

      jest.spyOn(tweetServiceMock, 'getMediaTweets').mockImplementation(() => {
        throw new InternalServerErrorException(`Example error`);
      });
      expect(() => controller.getMediatTweets(filters,currentUser)).toThrow(InternalServerErrorException);
    });
  })

  describe('getPost',() =>
  {
    const id = '123e4567-e89b-12d3-a456-426614174000';

    const currentUser:CurrentUserArgs={
      userId: userMock.id,
      email:userMock.email
    }

    it('should get post by id', async () => {
        const tweet =  await controller.getTweet(id,currentUser);

        expect(tweetServiceMock.getTweetById).toHaveBeenCalledTimes(1);
        expect(tweetServiceMock.getTweetById).toBeCalledWith(id,currentUser.userId);
        expect(tweet).toEqual(tweetMock);
    });

    it('should throw internal server error exception', async () => {

      jest.spyOn(tweetServiceMock, 'getTweetById').mockImplementation(() => {
        throw new InternalServerErrorException(`Example error`);
      });
      expect(() => controller.getTweet(id,currentUser)).toThrow(InternalServerErrorException);
    });
  })

  describe('getPosts',() =>
  {
    const filters:QueryParameters ={
      limit:10,
      createdAt:null,
      page:1,
      orderBy:'createdAt',
      orderDirection:'desc'
    }


    const currentUser:CurrentUserArgs={
      userId: userMock.id,
      email:userMock.email
    }

    it('should get posts', async () => {
        const tweet =  await controller.getTweets(filters,currentUser);

        expect(tweetServiceMock.getTweets).toHaveBeenCalledTimes(1);
        expect(tweetServiceMock.getTweets).toBeCalledWith(filters,currentUser.userId);
        expect(tweet).toEqual({rows: [tweetMock],count: 1});
    });

    it('should throw internal server error exception', async () => {

      jest.spyOn(tweetServiceMock, 'getTweets').mockImplementation(() => {
        throw new InternalServerErrorException(`Example error`);
      });
      expect(() => controller.getTweets(filters,currentUser)).toThrow(InternalServerErrorException);
    });
  })

  describe('deletePost',() =>
  {
    const id = '123e4567-e89b-12d3-a456-426614174000';


    it('should delete post', async () => {
        const affectedRows =  await controller.deleteTweet(id);

        expect(tweetServiceMock.deleteTweetById).toHaveBeenCalledTimes(1);
        expect(tweetServiceMock.deleteTweetById).toBeCalledWith(id);
        expect(affectedRows).toEqual(1);
    });

  
  })

  describe('restorePOst',() =>
  {
    const id = '123e4567-e89b-12d3-a456-426614174000';


    it('should restore post', async () => {
        const restoredTweet =  await controller.restoreTweet(id);

        expect(tweetServiceMock.restoreTweetById).toHaveBeenCalledTimes(1);
        expect(tweetServiceMock.restoreTweetById).toBeCalledWith(id);
        expect(restoredTweet).toEqual(tweetMock);
    });

   
  })
});
