package org.ahmetsdincer.thycasestudy.dao.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.ahmetsdincer.thycasestudy.domain.model.TransportationType;

import java.util.List;

@Entity
@Table(name = "transport")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransportEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "origin", referencedColumnName = "locationCode", nullable = false)
    private LocationEntity origin;

    @ManyToOne
    @JoinColumn(name = "destination", referencedColumnName = "locationCode", nullable = false)
    private LocationEntity destination;

    @Column(name = "transportationType", nullable = false)
    @ElementCollection(targetClass = TransportationType.class, fetch = FetchType.EAGER)
    @CollectionTable(
            name = "transport_transportationType",
            joinColumns = @JoinColumn(name = "id")
    )
    @Enumerated(EnumType.STRING)
    private List<TransportationType> transportationType;

}