package org.ahmetsdincer.thycasestudy.domain.constraint;

import lombok.extern.slf4j.Slf4j;
import org.ahmetsdincer.thycasestudy.domain.model.Route;
import org.ahmetsdincer.thycasestudy.domain.model.Transportation;
import org.ahmetsdincer.thycasestudy.domain.model.TransportationType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class MultipleFlightConstraint implements Constraint {

    @Value("${transportation.max.flight}")
    private int maxTransitFlightNumber;

    @Override
    public boolean isValid(Route route) {
        log.info("Checking the number of flights included in the route. It should be max '" + maxTransitFlightNumber + "'.");
        int flightCount = 0;
        boolean result = true;
        for (Transportation transportation : route.getTransportations()) {
            if (transportation.getTransportationType().equals(TransportationType.FLIGHT)) {
                flightCount++;
                if (flightCount > maxTransitFlightNumber) {
                    result = false;
                }
            }
        }
        log.info("Flight count is " + flightCount + ". Result is " + result);
        return result;
    }
}
