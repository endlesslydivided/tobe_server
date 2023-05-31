import { Test, TestingModule } from '@nestjs/testing';
import { DialogController } from './dialog.controller';
import { DialogService } from './dialog.service';
import { Sequelize } from 'sequelize';
import { getConnectionToken } from '@nestjs/sequelize';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

describe('DialogController', () => {
  let controller: DialogController;

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

  const dialogServiceStub = {
    createDialog:jest.fn().mockResolvedValue(dialogMock),
    updateDialog:jest.fn().mockResolvedValue(dialogMock),
    deleteDialog:jest.fn().mockResolvedValue(dialogMock),
    getDialogById:jest.fn().mockResolvedValue(dialogMock),
    getMessagesByDialog:jest.fn().mockResolvedValue([messageMock])
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DialogController],
      providers:[DialogService,
        {
          provide: getConnectionToken(),
          useValue: Sequelize
        }]

    }).overrideProvider(DialogService).useValue(dialogServiceStub)
    .compile();

    controller = module.get<DialogController>(DialogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createDialog',() =>
  {
    const dialogDto ={
      name:dialogMock.name,
      isGroup:dialogMock.isGroup,
      creatorId:dialogMock.creatorId,
      companionId:'0597bd40-5681-46ca-8ddf-6d6e735b20b2',
    }

    it('should create dialog', async () => {
        const dialog =  await controller.createDialog(dialogDto,null);

        expect(dialogServiceStub.createDialog).toHaveBeenCalledTimes(1);
        expect(dialogServiceStub.createDialog).toBeCalledWith(dialogDto,null);
        expect(dialog).toEqual(dialogMock);
    });

    it('should throw bad request exception', async () => {

      jest.spyOn(dialogServiceStub, 'createDialog').mockImplementation(() => {
        throw new BadRequestException(`Example error`);
      });
      expect(() => controller.createDialog(dialogDto,null)).toThrow(BadRequestException);
    });

    it('should throw internal server error exception', async () => {

      jest.spyOn(dialogServiceStub, 'createDialog').mockImplementation(() => {
        throw new InternalServerErrorException(`Example error`);
      });
      expect(() => controller.createDialog(dialogDto,null)).toThrow(InternalServerErrorException);
    });
  })

});
