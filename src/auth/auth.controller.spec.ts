import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';

describe('AuthController', () => {
  let controller: AuthController;

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

  const tokensMock = {
      accessToken: 'q934c8hfji3f3.q08f74hehqwgw04bbw79.q3fceqq34ffqf',
      refreshToken: 'q934c8hfji3f.q08f74hehqwgw04bbw79.q3fceqq34ffqf',
  }

  const sessionMock = {
    id:'0597bd40-5681-46ca-8ddf-6d6e735b20b5',
    refreshToken:'q934c8hfji3f.q08f74hehqwgw04bbw79.q3fceqq34ffqf',
    userAgent:'Google Chrome',
    fingerprint:'234234213rfqref34qf',
    ip:'127.0.0.2',
    userId:'0597bd40-5681-46ca-8ddf-6d6e735b20b5',
  }

  const userServiceStub = {
    getMe:jest.fn().mockResolvedValue(userMock),
  }

  const authServiceStub = {
    refreshTokens:jest.fn().mockResolvedValue(tokensMock),
    signUp:jest.fn(),
    updatePassword:jest.fn(),
    deleteAllSessions:jest.fn(),
    deleteSession:jest.fn(),
    getAllSessions:jest.fn().mockResolvedValue([sessionMock]),
    signIn:jest.fn().mockResolvedValue(tokensMock),
    signOut:jest.fn(),
    confirmEmail:jest.fn().mockResolvedValue(userMock),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers:[AuthService,UserService]
    }).overrideProvider(UserService).useValue(userServiceStub)
    .overrideProvider(AuthService).useValue(authServiceStub)
    .compile();
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
