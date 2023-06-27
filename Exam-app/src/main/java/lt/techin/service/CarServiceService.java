package lt.techin.service;

import lt.techin.dao.CarServiceRepository;
import lt.techin.exception.FoodServiceValidationException;
import lt.techin.model.CarService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import javax.validation.Validator;
import java.util.List;
import java.util.Optional;


@Service
public class CarServiceService {

    private final CarServiceRepository carServiceRepository;


    public CarServiceService(CarServiceRepository carServiceRepository, Validator validator) {
        this.carServiceRepository = carServiceRepository;

    }

    public boolean blogPostTitleIsUnique(CarService carService) {
        return carServiceRepository.findAll()
                .stream()
                .noneMatch(bp -> bp.getTitle().equals(carService.getTitle()));
    }

    public List<CarService> getAll() {
        return carServiceRepository.findAll();
    }

    public CarService getServiceByForemanId(long id){
        return carServiceRepository.findAllByForemen_Id(id);
    }
    public Optional<CarService> getById(Long id) {
        return carServiceRepository.findById(id);
    }

    public CarService create(CarService carService) {
        return carServiceRepository.save(carService);
    }

    public boolean deleteById(Long id) {
        try {
            carServiceRepository.deleteById(id);
            return true;
        } catch (EmptyResultDataAccessException exception) {
            return false;
        }
    }

    public CarService update(Long id, CarService carService) {
        var existingCarService = carServiceRepository.findById(id)
                .orElseThrow(() -> new FoodServiceValidationException("Car service does not exist",
                        "id", "Car service not found", id.toString()));

        existingCarService.setTitle(carService.getTitle());
        existingCarService.setAddress(carService.getAddress());
        existingCarService.setManager(carService.getManager());
        existingCarService.setForemen(carService.getForemen());

        return carServiceRepository.save(existingCarService);
    }

}


