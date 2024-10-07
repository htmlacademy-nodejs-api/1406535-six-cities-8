import { Container } from 'inversify';
import { Component } from '../../const.js';
import { FacilityService } from './facility-service.interface.js';
import { types } from '@typegoose/typegoose';
import { FacilityEntity, FacilityModel } from './facility.entity.js';
import { DefaultFacilityService } from './default-facility.service.js';


export function createFacilityContainer() {
  const facilityContainer = new Container();

  facilityContainer.bind<FacilityService>(Component.FacilityService).to(DefaultFacilityService);
  facilityContainer.bind<types.ModelType<FacilityEntity>>(Component.FacilityModel).toConstantValue(FacilityModel);

  return facilityContainer;
}
