package org.ahmetsdincer.thycasestudy.dao.jpa;

import org.ahmetsdincer.thycasestudy.dao.entity.LocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationJpaRepository extends JpaRepository<LocationEntity, Long>  {
    boolean existsByName(String name);

    LocationEntity findFirstByName(String name);
}
