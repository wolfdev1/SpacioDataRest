// app.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { version } from './projectInfo';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });


  describe('root', () => {
    it(`should return "{ message: \'Spacio REST Service running correctly on version ${version}\', status: 200}"`, () => {
      expect(appController.getHello()).toEqual({ message: `Spacio REST Service running correctly on version ${version}`, status: 200});
    });
  });
});
