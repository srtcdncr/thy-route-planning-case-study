package org.ahmetsdincer.thycasestudy.dao.entity.mapper;

import org.ahmetsdincer.thycasestudy.dao.entity.LocationEntity;
import org.ahmetsdincer.thycasestudy.domain.model.Location;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LocationModelMapper {
    Location toModel(LocationEntity locationEntity);

    @Mapping(target = "id", ignore = true)
    LocationEntity toEntity(Location location);

    @Mapping(target = "id", ignore = true)
    List<LocationEntity> toEntity(List<Location> locations);

    List<Location> toModel(List<LocationEntity> locationEntities);
}