package org.ahmetsdincer.thycasestudy.dao.jpa;

import org.ahmetsdincer.thycasestudy.dao.entity.TransportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransportJpaRepository extends JpaRepository<TransportEntity, Long>  {

    List<TransportEntity> findAllByOrigin_Name(String originName);

    List<TransportEntity> findAllByDestination_Name(String destinationName);

    TransportEntity findFirstByOrigin_LocationCodeAndDestination_LocationCode(String originLocationCode,
                                                                              String destinationLocationCode);
}
