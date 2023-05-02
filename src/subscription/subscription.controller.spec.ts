import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { getConnectionToken } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';

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
});
