package org.ahmetsdincer.thycasestudy.dao.entity.mapper;

import org.ahmetsdincer.thycasestudy.dao.entity.TransportEntity;
import org.ahmetsdincer.thycasestudy.domain.model.Transport;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TransportModelMapper {
    Transport toModel(TransportEntity transportEntity);

    TransportEntity toEntity(Transport transport);

    List<TransportEntity> toEntity(List<Transport> transports);

    List<Transport> toModel(List<TransportEntity> transportEntities);
}