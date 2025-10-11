import { BasedEntity } from '@common/based.entity';
import { BasedModel } from '@common/based.orm';

export interface IMapper {
  toEntity(model: BasedModel): BasedEntity;
  toModel(entity: BasedEntity): BasedModel;
}
