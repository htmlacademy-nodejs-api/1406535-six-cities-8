import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { Logger } from '../../libs/logger/logger.interface.js';
import { FacilityService } from './facility-service.interface.js';
import { FacilityEntity } from './facility.entity.js';
import { CreateFacilityDto } from './dto/create-facility.dto.js';
import { Component } from '../../const.js';

@injectable()
export class DefaultFacilityService implements FacilityService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.FacilityModel) private readonly facilityModel: types.ModelType<FacilityEntity>
  ) { }

  public async create(dto: CreateFacilityDto): Promise<DocumentType<FacilityEntity>> {
    const result = await this.facilityModel.create(dto);
    this.logger.info(`New facility created: ${dto.name}`);
    return result;
  }

  public async findByFacilityId(facilityId: string): Promise<DocumentType<FacilityEntity> | null> {
    return this.facilityModel.findById(facilityId).exec();
  }

  public async findByFacilityName(facilityName: string): Promise<DocumentType<FacilityEntity> | null> {
    return this.facilityModel.findOne({ name: facilityName }).exec();
  }

  public async findByFacilityNameOrCreate(facilityName: string, dto: CreateFacilityDto): Promise<DocumentType<FacilityEntity>> {
    const existedFacility = await this.findByFacilityName(facilityName);

    if (existedFacility) {
      return existedFacility;
    }

    return this.create(dto);
  }
}
