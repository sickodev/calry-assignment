import { Test, TestingModule } from '@nestjs/testing';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('RequestsController', () => {
  let controller: RequestsController;
  let service: RequestsService;

  const mockRequestsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    complete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestsController],
      providers: [
        {
          provide: RequestsService,
          useValue: mockRequestsService,
        },
      ],
    }).compile();

    controller = module.get<RequestsController>(RequestsController);
    service = module.get<RequestsService>(RequestsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a new request', async () => {
      const createRequestDto: CreateRequestDto = {
        id: '1',
        guestName: 'Alex',
        roomNumber: 1,
        requestDetails: 'Clean',
        priority: 1,
        status: 'in progress',
      };

      mockRequestsService.create.mockResolvedValue({
        message: 'Request added successfully',
        data: createRequestDto,
      });

      const result = await controller.create(createRequestDto);
      expect(result).toEqual({
        message: 'Request added successfully',
        data: createRequestDto,
      });
      expect(mockRequestsService.create).toHaveBeenCalledWith(createRequestDto);
    });

    it('should throw an error if the request cannot be created', async () => {
      const createRequestDto: CreateRequestDto = {
        id: '1',
        guestName: 'Alex',
        roomNumber: 1,
        requestDetails: 'Clean',
        priority: 1,
        status: 'in progress',
      };

      mockRequestsService.create.mockRejectedValue(new BadRequestException());

      await expect(controller.create(createRequestDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of requests', async () => {
      const result = [
        {
          id: '1',
          guestName: 'Alex',
          roomNumber: 1,
          requestDetails: 'Clean',
          priority: 1,
          status: 'in progress',
        },
      ];
      
      mockRequestsService.findAll.mockReturnValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(mockRequestsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a request by id', async () => {
      const result = {
        id: '1',
        guestName: 'Alex',
        roomNumber: 1,
        requestDetails: 'Clean',
        priority: 1,
        status: 'in progress',
      };

      mockRequestsService.findOne.mockReturnValue(result);

      expect(await controller.findOne('1')).toEqual(result);
      expect(mockRequestsService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw an error if the request is not found', async () => {
      mockRequestsService.findOne.mockImplementation(() => {
        throw new NotFoundException();
      });

      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a request', async () => {
      const updateRequestDto: UpdateRequestDto = {
        guestName: 'Updated Name',
        requestDetails: 'Updated details',
      };

      mockRequestsService.update.mockResolvedValue({
        message: 'Request updated successfully',
        data: {
          id: '1',
          guestName: 'Updated Name',
          roomNumber: 1,
          requestDetails: 'Updated details',
          priority: 1,
          status: 'in progress',
        },
      });

      const result = await controller.update('1', updateRequestDto);
      expect(result).toEqual({
        message: 'Request updated successfully',
        data: {
          id: '1',
          guestName: 'Updated Name',
          roomNumber: 1,
          requestDetails: 'Updated details',
          priority: 1,
          status: 'in progress',
        },
      });
      expect(mockRequestsService.update).toHaveBeenCalledWith('1', updateRequestDto);
    });

    it('should throw an error if the request cannot be updated', async () => {
      const updateRequestDto: UpdateRequestDto = {
        guestName: 'NotFound',
        requestDetails: 'Not found request',
      };

      mockRequestsService.update.mockRejectedValue(new NotFoundException());

      await expect(controller.update('999', updateRequestDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a request', async () => {
      mockRequestsService.remove.mockResolvedValue({
        message: 'Request with id 1 has been removed successfully',
      });

      const result = await controller.remove('1');
      expect(result).toEqual({
        message: 'Request with id 1 has been removed successfully',
      });
      expect(mockRequestsService.remove).toHaveBeenCalledWith('1');
    });

    it('should throw an error if the request cannot be removed', async () => {
      mockRequestsService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('complete', () => {
    it('should mark a request as complete', async () => {
      mockRequestsService.complete.mockResolvedValue({
        message: 'Request marked complete',
        data: {
          id: '1',
          guestName: 'Alex',
          roomNumber: 1,
          requestDetails: 'Clean',
          priority: 1,
          status: 'completed',
        },
      });

      const result = await controller.complete('1');
      expect(result).toEqual({
        message: 'Request marked complete',
        data: {
          id: '1',
          guestName: 'Alex',
          roomNumber: 1,
          requestDetails: 'Clean',
          priority: 1,
          status: 'completed',
        },
      });
      expect(mockRequestsService.complete).toHaveBeenCalledWith('1');
    });

    it('should throw an error if the request cannot be marked as complete', async () => {
      mockRequestsService.complete.mockRejectedValue(new NotFoundException());

      await expect(controller.complete('999')).rejects.toThrow(NotFoundException);
    });
  });
});
