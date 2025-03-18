package org.ahmetsdincer.thycasestudy.domain.service;

import org.ahmetsdincer.thycasestudy.domain.model.Location;

import java.util.List;
import java.util.Optional;

public interface LocationService {
    List<Location> findAll();

    Optional<Location> findById(long id);

    Location findFirstByName(String origin);

    Location save(Location location);

    boolean existsByName(String locationName);

    Location update(long id, Location location) throws Exception;

    void deleteById(long id);
}
