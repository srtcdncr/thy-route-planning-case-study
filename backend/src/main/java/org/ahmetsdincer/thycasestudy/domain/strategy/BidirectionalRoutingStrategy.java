package org.ahmetsdincer.thycasestudy.domain.strategy;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ahmetsdincer.thycasestudy.domain.constraint.ConstraintChecker;
import org.ahmetsdincer.thycasestudy.domain.model.*;
import org.ahmetsdincer.thycasestudy.domain.service.TransportService;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Component
@ConditionalOnProperty(value = "transportation.type", havingValue = "bidirectional", matchIfMissing = true)
public class BidirectionalRoutingStrategy implements RoutingStrategy {

    private final TransportService transportService;

    private final ConstraintChecker constraintChecker;

    @Override
    public List<Route> listAllRoutes(Location origin, Location destination) {
        LocationGraph locationGraph = new LocationGraph();
        List<Transport> allTransports = transportService.findAll();
        for (Transport transport : allTransports) {
            locationGraph.addEdge(transport.getOrigin(), transport.getDestination());
        }

        List<Route> routes = new ArrayList<>();
        List<List<Location>> allPaths = locationGraph.findAllPaths(origin, destination);

        for (List<Location> path : allPaths) {
            List<List<Transportation>> transports = null;
            try {
                transports = pathToTransport(path);
                List<List<Transportation>> lists = cartesianProduct(transports);

                for (List<Transportation> list : lists) {
                    Route route = new Route(list);
                    if (constraintChecker.check(route)) {
                        routes.add(route);
                    }
                }
            } catch (Exception e) {
                log.debug("This route is not valid!");
            }
        }
        return routes;
    }

    private List<List<Transportation>> pathToTransport(List<Location> path) throws Exception {
        List<List<Transportation>> transportations = new ArrayList<>();
        for (int loc = 0; loc < path.size(); loc++) {
            int nextLoc = loc + 1;
            if (nextLoc < path.size()) {
                Transport transport =
                        transportService.findByOrigin_LocationCodeAndDestination_LocationCode(path.get(loc).getLocationCode(),
                                path.get(nextLoc).getLocationCode());
                if (transport == null) {
                    throw new Exception("There is no such transportations.");
                }
                List<Transportation> transportation = transportToTransportations(transport);
                transportations.add(transportation);
            }
        }
        return transportations;
    }

    private List<Transportation> transportToTransportations(Transport transport) {
        List<Transportation> transportationList = new ArrayList<>();

        for (TransportationType transportationType : transport.getTransportationType()) {
            transportationList.add(new Transportation(transport.getOrigin(), transport.getDestination(), transportationType));
        }
        return transportationList;
    }

    public static <T> List<List<T>> cartesianProduct(List<List<T>> lists) {
        List<List<T>> result = new ArrayList<>();

        if (lists == null || lists.isEmpty()) {
            return result;
        }

        backtrack(result, new ArrayList<>(), lists, 0);
        return result;
    }

    private static <T> void backtrack(List<List<T>> result, List<T> tempList, List<List<T>> lists, int depth) {
        if (depth == lists.size()) {
            result.add(new ArrayList<>(tempList));
            return;
        }

        for (T item : lists.get(depth)) {
            tempList.add(item);
            backtrack(result, tempList, lists, depth + 1);
            tempList.remove(tempList.size() - 1);
        }
    }
}
