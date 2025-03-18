package org.ahmetsdincer.thycasestudy.controller;

import lombok.RequiredArgsConstructor;
import org.ahmetsdincer.thycasestudy.domain.model.Transport;
import org.ahmetsdincer.thycasestudy.domain.service.TransportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/transportations")
public class TransportController {

    private final TransportService transportService;

    @GetMapping
    public List<Transport> getAll() {
        return transportService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transport> getById(@PathVariable int id) {
        Optional<Transport> entity = transportService.findById(id);
        return entity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Transport> create(@RequestBody Transport dto) {
        try {
            return ResponseEntity.ok(transportService.save(dto));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transport> update(@PathVariable Long id, @RequestBody Transport dto) {
        try {
            Transport updated  = transportService.update(id, dto);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        transportService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
