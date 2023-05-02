import { Test, TestingModule } from '@nestjs/testing';
import { DialogService } from './dialog.service';
import { Subscription } from '../subscription/subscription.model';
import { Dialog } from './dialog.model';
import { Message } from '../message/message.model';
import { UserDialog } from './userDialog.model';
import { getModelToken } from '@nestjs/sequelize';

describe('DialogService', () => {
  let service: DialogService;

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

  const userDialogMock = {
    userId:'4321bd40-5681-46ca-8ddf-6d6e735b20b5',
    dialogId:'1597bd40-5681-46ca-8ddf-6d6e735b20b5'
  }

  const subsRepositoryStub = {
    count:jest.fn().mockResolvedValue(1),
    findOne:jest.fn().mockResolvedValue(subMock),
    findAll:jest.fn().mockResolvedValue([subMock]),
    findAndCountAll:jest.fn().mockResolvedValue({rows:[subMock], count:1}),
  }

  const dialogRepositoryStub ={
    findOne:jest.fn().mockResolvedValue(dialogMock),
    create:jest.fn().mockResolvedValue(dialogMock),
    update:jest.fn().mockResolvedValue(dialogMock),
    findByPk:jest.fn().mockResolvedValue(dialogMock),
    destroy:jest.fn().mockResolvedValue(1),
    findAndCountAll:jest.fn().mockResolvedValue({rows:[dialogMock], count:1})
  }

  const userDialogRepositoryStub ={
    findAll:jest.fn().mockResolvedValue([userDialogMock])
  }

  const messageRepositoryStub ={
    findAndCountAll:jest.fn().mockResolvedValue({rows:[messageMock], count:1}),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DialogService,
        {
          provide: getModelToken(Subscription),
          useValue:subsRepositoryStub
        },
        {
          provide: getModelToken(Dialog),
          useValue:dialogRepositoryStub
        },
        {
          provide: getModelToken(Message),
          useValue:messageRepositoryStub
        },
        {
          provide: getModelToken(UserDialog),
          useValue:userDialogRepositoryStub
        },
      ],
    }).compile();

    service = module.get<DialogService>(DialogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
