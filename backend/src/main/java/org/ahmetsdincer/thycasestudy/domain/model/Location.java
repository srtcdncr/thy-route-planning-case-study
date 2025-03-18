package org.ahmetsdincer.thycasestudy.domain.model;

import lombok.Data;

@Data
public class Location {

    private long id;

    private String name;

    private String country;

    private String city;

    private String locationCode;

}