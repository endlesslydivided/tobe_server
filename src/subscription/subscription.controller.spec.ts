import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { getConnectionToken } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { CreateSubsriptionDTO } from './dto/createSubscription.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

describe('SubscriptionController', () => {
  let controller: SubscriptionController;

  const subMock ={
    id:'1597bd40-5681-46ca-8ddf-6d6e735b20b5',
    subscriberId:'2597bd40-5681-46ca-8ddf-6d6e735b20b5',
    subscribedUserId:'0597bd40-5681-46ca-8ddf-6d6e735b20b5',
    isRejected:false
  }

  const subsServiceStub = {
    createSubscription:jest.fn().mockResolvedValue(subMock),
    updateSubscription:jest.fn().mockResolvedValue(subMock),
    deleteSubscriptionById:jest.fn().mockResolvedValue(1),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionController],
      providers:[SubscriptionService,
        {
          provide: getConnectionToken(),
          useValue: Sequelize
        }]
    }).overrideProvider(SubscriptionService).useValue(subsServiceStub).compile();

    controller = module.get<SubscriptionController>(SubscriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createSubscription',() =>
  {
    const subDto:CreateSubsriptionDTO ={
      ...subMock
    }

    it('should create subscription', async () => {
        const subscription =  await controller.createSubscription(subDto,null);

        expect(subsServiceStub.createSubscription).toHaveBeenCalledTimes(1);
        expect(subsServiceStub.createSubscription).toBeCalledWith(subDto,null);
        expect(subscription).toEqual(subMock);
    });

    it('should throw bad request exception', async () => {

      jest.spyOn(subsServiceStub, 'createSubscription').mockImplementation(() => {
        throw new BadRequestException(`Example error`);
      });
      expect(() => controller.createSubscription(subDto,null)).toThrow(BadRequestException);
    });

    it('should throw internal server error exception', async () => {

      jest.spyOn(subsServiceStub, 'createSubscription').mockImplementation(() => {
        throw new InternalServerErrorException(`Example error`);
      });
      expect(() => controller.createSubscription(subDto,null)).toThrow(InternalServerErrorException);
    });
  })
});
