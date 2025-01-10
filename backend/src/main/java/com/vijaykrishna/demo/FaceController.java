package com.vijaykrishna.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


/*@RestController
@RequestMapping("/api")
public class FaceController {

    @Autowired
    private FaceService faceService;

    @PostMapping("/register")
    public ResponseEntity<?> registerFace(@RequestParam("file") MultipartFile file, @RequestParam("name") String name) {
        try {
            String message = faceService.registerFace(file, name);
            return ResponseEntity.ok(Map.of("message", message));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/attendance")
    public ResponseEntity<?> markAttendance(@RequestParam("file") MultipartFile file) {
        try {
            boolean isRecognized = faceService.markAttendance(file);
            return ResponseEntity.ok(Map.of("recognized", isRecognized));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}*/

import com.vijaykrishna.demo.Face;
import com.vijaykrishna.demo.FaceRepository;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/faces")
public class FaceController {

    private final FaceService faceService;
    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    public FaceController(FaceService faceService) {
        this.faceService = faceService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerFace(@RequestParam("name") String name, @RequestParam("file") MultipartFile file) {
        try {
            // Save file to uploads directory
            Path filePath = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());

            // Save face information to the database
            Face face = new Face();
            face.setName(name);
            face.setImagePath(filePath.toString());
            faceService.saveFace(face);

            return ResponseEntity.ok("Face registered successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to register face: " + e.getMessage());
        }
    }


    @GetMapping
    public List<Face> getAllFaces() {
        return faceService.getAllFaces();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Face> getFaceById(@PathVariable Long id) {
        Optional<Face> face = faceService.getFaceById(id);
        return face.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFace(@PathVariable Long id) {
        try {
            faceService.deleteFace(id);
            return ResponseEntity.ok("Face deleted successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateFace(@PathVariable Long id, @RequestBody Face updatedFace) {
        try {
            faceService.updateFace(id, updatedFace);
            return ResponseEntity.ok("Face updated successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
