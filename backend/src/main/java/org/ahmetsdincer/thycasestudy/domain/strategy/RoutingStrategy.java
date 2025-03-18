package org.ahmetsdincer.thycasestudy.domain.strategy;

import org.ahmetsdincer.thycasestudy.domain.model.Location;
import org.ahmetsdincer.thycasestudy.domain.model.Route;

import java.util.List;

public interface RoutingStrategy {
    List<Route> listAllRoutes(Location origin, Location destination);
}
