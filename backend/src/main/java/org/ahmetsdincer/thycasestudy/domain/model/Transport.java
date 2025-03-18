package org.ahmetsdincer.thycasestudy.domain.model;

import lombok.Data;

import java.util.List;

@Data
public class Transport {

    private long id;

    private Location origin;

    private Location destination;

    private List<TransportationType> transportationType;

}