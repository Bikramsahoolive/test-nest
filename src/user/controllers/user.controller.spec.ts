import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from './user.controller';
import { UserServiceService } from '../services/user-service.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { createUserDto } from '../dtos/user.dto';
import { of, throwError } from 'rxjs';

describe('CreateUserController', () => {
  let controller: CreateUserController;
  let service: UserServiceService;

  beforeEach(async () => {
    const mockUserService = {
      getuserDataFromDB: jest.fn(),
      createUser: jest.fn(),
      deleteUserData: jest.fn(),
      updateuserData: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        {
          provide: UserServiceService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<CreateUserController>(CreateUserController);
    service = module.get<UserServiceService>(UserServiceService);
  });

  describe('fetchAllUserData', () => {
    it('should return all users', async () => {
      const result = [{id:1, name: 'John', email: 'john@test.com', password: 'password123',
        age: 0 }];
      jest.spyOn(service, 'getuserDataFromDB').mockResolvedValue(result);

      const response = await controller.fetchAllUserData();
      expect(response).toEqual(result);
      expect(service.getuserDataFromDB).toHaveBeenCalled();
    });
  });

  describe('fetchSingleUser', () => {
    it('should return a single user', async () => {
      const result = {id:1, name: 'John', email: 'john@test.com', password: 'password123',
        age: 0 };
      jest.spyOn(service, 'getuserDataFromDB').mockResolvedValue([result]);

      const response = await controller.fetchSingleUser(1);
      expect(response).toEqual(result);
      expect(service.getuserDataFromDB).toHaveBeenCalled();
    });

    it('should throw HttpException if user not found', async () => {
      jest.spyOn(service, 'getuserDataFromDB').mockResolvedValue([]);

      try {
        await controller.fetchSingleUser(999);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('createUser', () => {
    it('should successfully create a user', async () => {
      const userDto: createUserDto = {
        name: 'John', email: 'john@test.com', password: 'password123',
        age: 0
      };
      const mockResponse = { status: 'success', message: 'User Created.' };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      jest.spyOn(service, 'createUser').mockResolvedValue([]);

      await controller.createUser(res, userDto);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('should return error if user creation fails', async () => {
      const userDto: createUserDto = {
        name: 'John', email: 'john@test.com', password: 'password123',
        age: 0
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      jest.spyOn(service, 'createUser').mockRejectedValue(new Error('Error creating user'));

      await controller.createUser(res, userDto);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user and return success', async () => {
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      jest.spyOn(service, 'deleteUserData').mockResolvedValue({raw:1, affected: 1 });

      await controller.deleteUser(res, 1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'user data deleted.',
      });
    });

    it('should return failure if user does not exist', async () => {
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      jest.spyOn(service, 'deleteUserData').mockResolvedValue({raw:1, affected: 0 });

      await controller.deleteUser(res, 999);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'failure',
        message: 'user not exist!',
      });
    });

    it('should throw HttpException on error', async () => {
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      jest.spyOn(service, 'deleteUserData').mockRejectedValue(new Error('Error deleting user'));

      try {
        await controller.deleteUser(res, 1);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.FORBIDDEN);
      }
    });
  });

  describe('updateUser', () => {
    it('should update a user successfully', async () => {
      const userData = { name: 'John', email: 'john_updated@test.com' };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      jest.spyOn(service, 'updateuserData').mockResolvedValue({affected: 1,generatedMaps:[],raw:1});

      await controller.updateUser(1, { body: userData } as any, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'user data updated.',
      });
    });

    it('should return failure if user not found to update', async () => {
      const userData = { name: 'John', email: 'john_updated@test.com' };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      jest.spyOn(service, 'updateuserData').mockResolvedValue({ affected:1,raw:1,generatedMaps:[]});

      await controller.updateUser(999, { body: userData } as any, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith('User data not found to update!');
    });
  });
});
