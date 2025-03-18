package org.ahmetsdincer.thycasestudy.domain.service;

import org.ahmetsdincer.thycasestudy.domain.model.Route;

import java.util.List;

public interface RoutingService {

    List<Route> route(String origin, String destination) throws Exception;
}
