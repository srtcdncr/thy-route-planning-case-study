package org.ahmetsdincer.thycasestudy.domain.constraint;

import org.ahmetsdincer.thycasestudy.domain.model.Route;

public interface Constraint {
    boolean isValid(Route route);
}
