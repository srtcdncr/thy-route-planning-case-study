package org.ahmetsdincer.thycasestudy.dao.jpa;

import org.ahmetsdincer.thycasestudy.dao.entity.LocationEntity;
import org.ahmetsdincer.thycasestudy.dao.entity.mapper.LocationModelMapper;
import org.ahmetsdincer.thycasestudy.domain.model.Location;
import org.ahmetsdincer.thycasestudy.domain.service.LocationService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JPALocationService implements LocationService {

    private final LocationJpaRepository locationJpaRepository;

    private final LocationModelMapper mapper;

    public JPALocationService(LocationJpaRepository locationJpaRepository,
                              LocationModelMapper mapper) {
        this.locationJpaRepository = locationJpaRepository;
        this.mapper = mapper;
    }

    @Override
    public List<Location> findAll() {
        List<LocationEntity> allEntities = locationJpaRepository.findAll();
        return mapper.toModel(allEntities);
    }

    @Override
    public Optional<Location> findById(long id) {
        Optional<LocationEntity> entity = locationJpaRepository.findById(id);
        return entity.map(mapper::toModel);
    }

    @Override
    public Location save(Location location) {
        LocationEntity entity = locationJpaRepository.save(mapper.toEntity(location));
        return mapper.toModel(entity);
    }

    @Override
    public Location findFirstByName(String location) {
        LocationEntity entity = locationJpaRepository.findFirstByName(location);
        return mapper.toModel(entity);
    }

    @Override
    public boolean existsByName(String locationName) {
        return locationJpaRepository.existsByName(locationName);
    }

    @Override
    public Location update(long id, Location location) throws Exception {
        Optional<LocationEntity> byId = locationJpaRepository.findById(id);
        if (byId.isEmpty()) {
            throw new Exception("Entity with given id does not exists.");
        }
        LocationEntity entity = mapper.toEntity(location);
        entity.setId(id);
        locationJpaRepository.save(entity);
        location.setId(id);
        return location;
    }

    @Override
    public void deleteById(long id) {
        locationJpaRepository.deleteById(id);
    }
}
