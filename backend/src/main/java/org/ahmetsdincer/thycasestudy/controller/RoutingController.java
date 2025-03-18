package org.ahmetsdincer.thycasestudy.controller;

import lombok.RequiredArgsConstructor;
import org.ahmetsdincer.thycasestudy.controller.dto.RouteDTO;
import org.ahmetsdincer.thycasestudy.domain.model.Route;
import org.ahmetsdincer.thycasestudy.domain.service.RoutingService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class RoutingController {

    private final RoutingService routingService;

    @GetMapping("/routes")
    public List<RouteDTO> route(@RequestParam String origin, @RequestParam String destination) throws Exception {
        List<Route> routes = routingService.route(origin, destination);
        return RouteDTO.fromModel(routes);
    }
}
