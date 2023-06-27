package lt.techin.service;

import lt.techin.dao.CarServiceRepository;
import lt.techin.dao.ForemanRepository;
import lt.techin.exception.FoodServiceValidationException;
import lt.techin.model.Foreman;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ForemanService {

    private final CarServiceRepository carServiceRepository;
    private final ForemanRepository foremanRepository;

    public ForemanService(CarServiceRepository carServiceRepository, ForemanRepository foremanRepository) {
        this.carServiceRepository = carServiceRepository;
        this.foremanRepository = foremanRepository;
    }

    public List<Foreman> getForemen() {
        return foremanRepository.findAll();
    }
    public List<Foreman> getAll(Long menuId) {
        return foremanRepository.getAllByCarService_Id(menuId);
    }

    public Optional<Foreman> getById(Long id) {
        return foremanRepository.findById(id);
    }


    public Foreman create(Foreman foreman, Long menuId) {
        var existingMenu = carServiceRepository.findById(menuId)
                .orElseThrow(() -> new FoodServiceValidationException("CarService does not exist",
                        "id", "CarService not found", menuId.toString()));
        foreman.setCarService(existingMenu);

        return foremanRepository.save(foreman);
    }

    public Foreman update(Long id, Foreman foreman) {
        var existingForeman = foremanRepository.findById(id)
                .orElseThrow(() -> new FoodServiceValidationException("Meal does not exist",
                        "id", "Meal not found", id.toString()));

        existingForeman.setName(foreman.getName());
        existingForeman.setSurname(foreman.getSurname());
        existingForeman.setCity(foreman.getCity());
        existingForeman.setRating(foreman.getRating());
        existingForeman.setSpecialization(foreman.getSpecialization());

        return foremanRepository.save(existingForeman);
    }

    public boolean deleteById(Long id) {
        try {
            foremanRepository.deleteById(id);
            return true;
        } catch (EmptyResultDataAccessException exception) {
            return false;
        }
    }
}
