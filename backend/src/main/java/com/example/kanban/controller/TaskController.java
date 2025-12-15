package com.example.kanban.controller;

import com.example.kanban.model.Task;
import com.example.kanban.repository.TaskRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskRepository repo;

    public TaskController(TaskRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Task> all() {
        return repo.findAllByOrderByPositionOrderAsc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> get(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Task> create(@RequestBody Task task) {
        if (task.getStatus() == null) task.setStatus("TODO");
        if (task.getPositionOrder() == null) task.setPositionOrder(0);
        Task saved = repo.save(task);
        return ResponseEntity.created(URI.create("/api/tasks/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable Long id, @RequestBody Task updated) {
        return repo.findById(id).map(t -> {
            t.setTitle(updated.getTitle());
            t.setDescription(updated.getDescription());
            t.setStatus(updated.getStatus());
            t.setPositionOrder(updated.getPositionOrder());
            repo.save(t);
            return ResponseEntity.ok(t);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
