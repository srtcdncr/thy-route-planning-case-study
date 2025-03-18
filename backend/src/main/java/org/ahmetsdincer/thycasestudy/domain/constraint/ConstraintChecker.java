package org.ahmetsdincer.thycasestudy.domain.constraint;

import lombok.RequiredArgsConstructor;
import org.ahmetsdincer.thycasestudy.domain.model.Route;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class ConstraintChecker {
    private final List<Constraint> constraints;

    public boolean check(Route route) {
        for (Constraint constraint : constraints) {
            if (!constraint.isValid(route)) {
                return false;
            }
        }
        return true;
    }
}
