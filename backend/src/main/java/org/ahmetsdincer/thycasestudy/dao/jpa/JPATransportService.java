package org.ahmetsdincer.thycasestudy.dao.jpa;

import org.ahmetsdincer.thycasestudy.dao.entity.TransportEntity;
import org.ahmetsdincer.thycasestudy.dao.entity.mapper.TransportModelMapper;
import org.ahmetsdincer.thycasestudy.domain.model.Transport;
import org.ahmetsdincer.thycasestudy.domain.service.TransportService;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class JPATransportService implements TransportService {

    private final TransportJpaRepository transportJpaRepository;

    private final TransportModelMapper mapper;

    public JPATransportService(TransportJpaRepository transportJpaRepository,
                               TransportModelMapper mapper) {
        this.transportJpaRepository = transportJpaRepository;
        this.mapper = mapper;
    }

    @Override
    public List<Transport> findAll() {
        List<TransportEntity> allEntities = transportJpaRepository.findAll();
        return mapper.toModel(allEntities);
    }

    @Override
    public Optional<Transport> findById(long id) {
        Optional<TransportEntity> entity = transportJpaRepository.findById(id);
        return entity.map(mapper::toModel);
    }

    @Override
    public List<Transport> findAllByOrigin_Name(String originName) {
        List<TransportEntity> allByOriginName = transportJpaRepository.findAllByOrigin_Name(originName);
        return mapper.toModel(allByOriginName);
    }

    @Override
    public List<Transport> findAllByDestination_Name(String destinationName) {
        List<TransportEntity> allByDestinationName = transportJpaRepository.findAllByDestination_Name(destinationName);
        return mapper.toModel(allByDestinationName);
    }

    @Override
    public Transport findByOrigin_LocationCodeAndDestination_LocationCode(String originLocationCode,
                                                                          String destinationLocationCode) {
        TransportEntity transportEntities =
                transportJpaRepository.findFirstByOrigin_LocationCodeAndDestination_LocationCode(originLocationCode,
                destinationLocationCode);

        return mapper.toModel(transportEntities);
    }

    @Override
    public Transport save(Transport transport) throws Exception {
        TransportEntity entity = transportJpaRepository.findFirstByOrigin_LocationCodeAndDestination_LocationCode(
                transport.getOrigin().getLocationCode(), transport.getDestination().getLocationCode());
        if (entity != null) {
            transport.getTransportationType().addAll(entity.getTransportationType());
             return update(entity.getId(), transport);
        }
        try {
            TransportEntity saved = transportJpaRepository.save(mapper.toEntity(transport));
            return mapper.toModel(saved);
        } catch (Exception e) {
            throw new Exception("Origin or Destination is invalid!");
        }
    }

    @Override
    public Transport update(long id, Transport transport) {
        Optional<TransportEntity> byId = transportJpaRepository.findById(id);
        if (byId.isPresent()) {
            TransportEntity entity = mapper.toEntity(transport);
            entity.setId(id);
            transportJpaRepository.save(entity);
        }
        transport.setId(id);
        return transport;
    }

    @Override
    public void deleteById(long id) {
        transportJpaRepository.deleteById(id);
    }
}