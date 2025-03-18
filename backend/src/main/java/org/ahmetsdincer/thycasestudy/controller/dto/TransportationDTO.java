package org.ahmetsdincer.thycasestudy.controller.dto;

import lombok.Data;
import org.ahmetsdincer.thycasestudy.domain.model.TransportationType;

@Data
public class TransportationDTO {

    private final String origin;

    private final String destination;

    private final TransportationType transportationType;
}
