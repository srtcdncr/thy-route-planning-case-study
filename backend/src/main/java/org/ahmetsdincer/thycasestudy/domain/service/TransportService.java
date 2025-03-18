package org.ahmetsdincer.thycasestudy.domain.service;

import org.ahmetsdincer.thycasestudy.domain.model.Transport;

import java.util.List;
import java.util.Optional;

public interface TransportService {
    List<Transport> findAll();

    Optional<Transport> findById(long id);

    List<Transport> findAllByOrigin_Name(String originName);

    List<Transport> findAllByDestination_Name(String destinationName);

    Transport findByOrigin_LocationCodeAndDestination_LocationCode(String originLocationCode,
                                                                   String destinationLocationCode);

    Transport save(Transport transport) throws Exception;

    Transport update(long id, Transport transport);

    void deleteById(long id);
}
