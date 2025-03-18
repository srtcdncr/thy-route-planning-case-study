package org.ahmetsdincer.thycasestudy.domain.constraint;

import org.ahmetsdincer.thycasestudy.domain.model.Route;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MaxTransferConstraint implements Constraint {

    @Value("${transportation.max.transit}")
    private int maxTransportation;

    @Override
    public boolean isValid(Route route) {
        return route.getTransportations().size() <= maxTransportation;
    }
}
