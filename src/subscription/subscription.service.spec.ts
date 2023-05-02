import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionService } from './subscription.service';
import { Subscription } from './subscription.model';
import { getModelToken } from '@nestjs/sequelize';

describe('SubscriptionService', () => {
  let service: SubscriptionService;



  const subMock ={
    id:'1597bd40-5681-46ca-8ddf-6d6e735b20b5',
    subscriberId:'2597bd40-5681-46ca-8ddf-6d6e735b20b5',
    subscribedUserId:'0597bd40-5681-46ca-8ddf-6d6e735b20b5',
    isRejected:false
  }

  

  const subsRepositoryStub = {    
    findOrCreate:jest.fn().mockResolvedValue([subMock,true]),
    findByPk:jest.fn().mockResolvedValue(subMock),
    destroy:jest.fn().mockResolvedValue(1),
    findOne:jest.fn().mockResolvedValue(subMock),
    findAll:jest.fn().mockResolvedValue([subMock]),
    findAndCountAll:jest.fn().mockResolvedValue({rows:[subMock], count:1}),
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionService,
        {
          provide:getModelToken(Subscription),
          useValue:subsRepositoryStub
        },
      
      ],
    }).compile();

    service = module.get<SubscriptionService>(SubscriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
