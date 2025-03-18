package org.ahmetsdincer.thycasestudy.domain.strategy;

import lombok.Getter;
import org.ahmetsdincer.thycasestudy.domain.model.Location;

import java.util.*;

/**
 * DFS Algorithm Implementation.
 *
 * Transports are Edges.
 * Locations are Node.
 */
@Getter
class LocationGraph {
    private Map<Location, List<Location>> adjList = new HashMap<>();

    public void addEdge(Location u, Location v) {
        adjList.computeIfAbsent(u, k -> new ArrayList<>()).add(v);
        adjList.computeIfAbsent(v, k -> new ArrayList<>()).add(u);
    }

    public List<List<Location>> findAllPaths(Location start, Location end) {
        List<List<Location>> allPaths = new ArrayList<>();
        Set<Location> visited = new HashSet<>();
        List<Location> currentPath = new ArrayList<>();

        findAllPathsDFS(start, end, visited, currentPath, allPaths);

        return allPaths;
    }

    private void findAllPathsDFS(Location current, Location end, Set<Location> visited,
                                 List<Location> currentPath, List<List<Location>> allPaths) {
        visited.add(current);
        currentPath.add(current);

        if (current.equals(end)) {
            allPaths.add(new ArrayList<>(currentPath));
        } else {
            for (Location neighbor : adjList.getOrDefault(current, Collections.emptyList())) {
                if (!visited.contains(neighbor)) {
                    findAllPathsDFS(neighbor, end, visited, currentPath, allPaths);
                }
            }
        }

        visited.remove(current);
        currentPath.remove(currentPath.size() - 1);
    }
}