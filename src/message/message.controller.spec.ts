import { Test, TestingModule } from '@nestjs/testing';

import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { CreateMessageMoodDto } from './dto/createMessageMood.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

describe('MessageController', () => {
  let controller: MessageController;

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

  const messageServiceStub = {
    createMessage:jest.fn().mockResolvedValue(messageMock),
    createMessageMood:jest.fn().mockResolvedValue(messageMoodMock),
    getOneMessage:jest.fn().mockResolvedValue(messageMock),
    updateMessage:jest.fn().mockResolvedValue(messageMock),
    deleteMessage:jest.fn().mockResolvedValue(1),
    bulkDeleteMessages:jest.fn().mockResolvedValue(1),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers:[MessageService]

    }).overrideProvider(MessageService).useValue(messageServiceStub)
    .compile();

    controller = module.get<MessageController>(MessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createMessageMood',() =>
  {
    const messageMoodDto:CreateMessageMoodDto ={
      ...messageMoodMock
    }

    it('should create diary entry', async () => {
        const diaryEntry =  await controller.createMessageMood(messageMoodDto);

        expect(messageServiceStub.createMessageMood).toHaveBeenCalledTimes(1);
        expect(messageServiceStub.createMessageMood).toBeCalledWith(messageMoodDto);
        expect(diaryEntry).toEqual(messageMoodMock);
    });

    it('should throw bad request exception', async () => {

      jest.spyOn(messageServiceStub, 'createMessageMood').mockImplementation(() => {
        throw new BadRequestException(`Example error`);
      });
      expect(() => controller.createMessageMood(messageMoodDto)).toThrow(BadRequestException);
    });

    it('should throw internal server error exception', async () => {

      jest.spyOn(messageServiceStub, 'createMessageMood').mockImplementation(() => {
        throw new InternalServerErrorException(`Example error`);
      });
      expect(() => controller.createMessageMood(messageMoodDto)).toThrow(InternalServerErrorException);
    });
  })
});
