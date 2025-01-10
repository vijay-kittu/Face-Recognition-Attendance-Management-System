package com.vijaykrishna.demo;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FaceService {

    private final FaceRepository faceRepository;

    @Autowired
    public FaceService(FaceRepository faceRepository) {
        this.faceRepository = faceRepository;
    }

    public Face saveFace(Face face) {
        return faceRepository.save(face);
    }

    public List<Face> getAllFaces() {
        return faceRepository.findAll();
    }

    public Optional<Face> getFaceById(Long id) {
        return faceRepository.findById(id);
    }

    public void deleteFace(Long id) {
        if (faceRepository.existsById(id)) {
            faceRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Face with ID " + id + " does not exist.");
        }
    }

    public Face updateFace(Long id, Face updatedFace) {
        return faceRepository.findById(id).map(face -> {
            face.setName(updatedFace.getName());
            face.setImagePath(updatedFace.getImagePath());
            return faceRepository.save(face);
        }).orElseThrow(() -> new IllegalArgumentException("Face with ID " + id + " does not exist."));
    }
}
