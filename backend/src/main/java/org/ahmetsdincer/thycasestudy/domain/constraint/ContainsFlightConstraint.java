package org.ahmetsdincer.thycasestudy.domain.constraint;

import lombok.extern.slf4j.Slf4j;
import org.ahmetsdincer.thycasestudy.domain.model.Route;
import org.ahmetsdincer.thycasestudy.domain.model.Transportation;
import org.ahmetsdincer.thycasestudy.domain.model.TransportationType;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ContainsFlightConstraint implements Constraint {

    @Override
    public boolean isValid(Route route) {
        log.info("Checking the route contains flight.");
        boolean result = false;
        for (Transportation transportation : route.getTransportations()) {
            if (transportation.getTransportationType().equals(TransportationType.FLIGHT)) {
                result = true;
                break;
            }
        }
        log.info("Route contains flight: {}", result);
        return result;
    }
}