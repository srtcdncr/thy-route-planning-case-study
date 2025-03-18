package org.ahmetsdincer.thycasestudy.domain.service;

import org.ahmetsdincer.thycasestudy.domain.model.Location;
import org.ahmetsdincer.thycasestudy.domain.model.Route;
import org.ahmetsdincer.thycasestudy.domain.strategy.RoutingStrategy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoutingServiceImpl implements RoutingService {

    private final LocationService locationService;

    private final RoutingStrategy routingStrategy;

    public RoutingServiceImpl(LocationService locationService,
                              RoutingStrategy routingStrategy) {
        this.locationService = locationService;
        this.routingStrategy = routingStrategy;
    }

    @Override
    public List<Route> route(String origin, String destination) throws Exception {
        isLocationExists(origin);
        isLocationExists(destination);

        Location from = locationService.findFirstByName(origin);
        Location to = locationService.findFirstByName(destination);

        return routingStrategy.listAllRoutes(from, to);
    }

    private void isLocationExists(String locationName) throws Exception {
        if (!locationService.existsByName(locationName)) {
            throw new Exception("Location with given name `" + locationName + "` does not exists.");
        }
    }
}
