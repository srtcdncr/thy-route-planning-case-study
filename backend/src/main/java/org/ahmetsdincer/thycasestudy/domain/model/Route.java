package org.ahmetsdincer.thycasestudy.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class Route {
    private List<Transportation> transportations;
}