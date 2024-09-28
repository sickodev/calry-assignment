import { Test, TestingModule } from '@nestjs/testing';
import { RequestsService } from './requests.service';
import { BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { FileSystemService } from 'src/file-system/file-system.service';

describe('RequestsService', () => {
  let service: RequestsService;
  let fileSystemService: FileSystemService;

  const mockFileSystemService = {
    readData: jest.fn(),
    writeData: jest.fn(),
  };

  const mockRequestData = [
    { id: '1', guestName: 'Alex', roomNumber: 1, requestDetails: 'Clean', priority: 1, status: 'in progress' },
    { id: '2', guestName: 'Bob', roomNumber: 2, requestDetails: 'Towels', priority: 2, status: 'completed' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestsService,
        { provide: FileSystemService, useValue: mockFileSystemService },
      ],
    }).compile();

    service = module.get<RequestsService>(RequestsService);
    fileSystemService = module.get<FileSystemService>(FileSystemService);

    // Mock the initial data load from the file system
    mockFileSystemService.readData.mockResolvedValue(mockRequestData);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new request', async () => {
    const createRequestDto: CreateRequestDto = {
      id: '3',
      guestName: 'Charlie',
      roomNumber: 3,
      requestDetails: 'Extra pillows',
      priority: 3,
      status: 'in progress',
    };

    const result = await service.create(createRequestDto);

    expect(result).toEqual({
      message: 'Request added successfully',
      data: createRequestDto,
    });

    expect(mockFileSystemService.writeData).toHaveBeenCalledWith([
      ...mockRequestData,
      createRequestDto,
    ]);
  });

  it('should throw an error if request already exists on create', async () => {
    const createRequestDto: CreateRequestDto = {
      id: '1',
      guestName: 'Alex',
      roomNumber: 1,
      requestDetails: 'Clean',
      priority: 1,
      status: 'in progress',
    };

    await expect(service.create(createRequestDto)).rejects.toThrow(BadRequestException);
  });

  it('should find all requests', async () => {
    const result = service.findAll();
    expect(result).toEqual(mockRequestData);
  });

  it('should find one request by id', () => {
    const result = service.findOne('1');
    expect(result).toEqual(mockRequestData[0]);
  });

  it('should throw an error if request is not found', () => {
    expect(() => service.findOne('999')).toThrow(NotFoundException);
  });

  it('should update an existing request', async () => {
    const updateRequestDto: UpdateRequestDto = {
      guestName: 'Alexander',
      requestDetails: 'Clean and organize',
    };

    const result = await service.update('1', updateRequestDto);
    
    expect(result).toEqual({
      message: 'Request updated successfully',
      data: {
        id: '1',
        guestName: 'Alexander',
        roomNumber: 1,
        requestDetails: 'Clean and organize',
        priority: 1,
        status: 'in progress',
      },
    });

    expect(mockFileSystemService.writeData).toHaveBeenCalled();
  });

  it('should throw an error when updating a non-existing request', async () => {
    const updateRequestDto: UpdateRequestDto = {
      guestName: 'NotFound',
      requestDetails: 'Not found request',
    };

    await expect(service.update('999', updateRequestDto)).rejects.toThrow(NotFoundException);
  });

  it('should remove an existing request', async () => {
    const result = await service.remove('1');
    
    expect(result).toEqual({
      message: `Request with id 1 has been removed successfully`,
    });

    expect(mockFileSystemService.writeData).toHaveBeenCalled();
  });

  it('should throw an error when removing a non-existing request', async () => {
    await expect(service.remove('999')).rejects.toThrow(NotFoundException);
  });

  it('should complete a request', async () => {
    const result = await service.complete('1');
    
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

    expect(mockFileSystemService.writeData).toHaveBeenCalled();
  });

  it('should throw an error when completing a request that is already completed', async () => {
    await expect(service.complete('2')).rejects.toThrow(ConflictException);
  });

  it('should throw an error when completing a non-existing request', async () => {
    await expect(service.complete('999')).rejects.toThrow(NotFoundException);
  });
});
