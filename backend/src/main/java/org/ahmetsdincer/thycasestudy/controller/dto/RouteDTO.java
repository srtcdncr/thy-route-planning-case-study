package org.ahmetsdincer.thycasestudy.controller.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import org.ahmetsdincer.thycasestudy.domain.model.Route;
import org.ahmetsdincer.thycasestudy.domain.model.Transportation;
import org.ahmetsdincer.thycasestudy.domain.model.TransportationType;

import java.util.ArrayList;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@Data
public class RouteDTO {
    private String description;

    private TransportationDTO beforeFlightTransfer;

    private TransportationDTO flight;

    private TransportationDTO afterFlightTransfer;

    public static RouteDTO fromModel(Route route) throws Exception {
        List<Transportation> transportations = route.getTransportations();
        int flightIndex = -1;
        for (int i = 0; i < transportations.size(); i++) {
            if (transportations.get(i).getTransportationType() == TransportationType.FLIGHT) {
                flightIndex = i;
                break;
            }
        }
        RouteDTOBuilder builder = RouteDTO.builder();
        if (flightIndex != -1) {
            Transportation flight = transportations.get(flightIndex);
            TransportationDTO flightDto = new TransportationDTO(flight.getOrigin().getName(),
                    flight.getDestination().getName(), TransportationType.FLIGHT);
            builder.flight(flightDto);
            builder.description("via " + flight.getOrigin().getName());

            if (flightIndex - 1 >= 0) {
                Transportation beforeFlight = transportations.get(flightIndex - 1);
                TransportationDTO beforeFlightDto = new TransportationDTO(beforeFlight.getOrigin().getName(),
                        beforeFlight.getDestination().getName(), beforeFlight.getTransportationType());
                builder.beforeFlightTransfer(beforeFlightDto);
            }

            if (flightIndex + 1 < transportations.size()) {
                Transportation afterFlight = transportations.get(flightIndex + 1);
                TransportationDTO afterFlightDto = new TransportationDTO(afterFlight.getOrigin().getName(),
                        afterFlight.getDestination().getName(), afterFlight.getTransportationType());
                builder.afterFlightTransfer(afterFlightDto);
            }
            return builder.build();
        }
        throw new Exception("Route should contains a flight!");
    }

    public static List<RouteDTO> fromModel(List<Route> routes) throws Exception {
        List<RouteDTO> routeDTOs = new ArrayList<>();
        for (Route route : routes) {
            routeDTOs.add(fromModel(route));
        }
        return routeDTOs;
    }
}
