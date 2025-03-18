package org.ahmetsdincer.thycasestudy.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Transportation {

    private Location origin;

    private Location destination;

    private TransportationType transportationType;

}