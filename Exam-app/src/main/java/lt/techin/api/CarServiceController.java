package lt.techin.api;


import lt.techin.api.dto.CarServiceDto;
import lt.techin.api.dto.CarServiceEntityDto;
import lt.techin.api.dto.mapper.CarServiceMapper;
import lt.techin.dao.ForemanRepository;
import lt.techin.exception.FoodServiceValidationException;
import lt.techin.model.CarService;
import lt.techin.service.CarServiceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.stream.Collectors.toList;
import static lt.techin.api.dto.mapper.CarServiceMapper.*;
import static org.springframework.http.ResponseEntity.ok;

@Controller
@RequestMapping("/api/v1/carServices")
@Validated
public class CarServiceController {

    public static Logger logger = LoggerFactory.getLogger(CarServiceController.class);

    private final CarServiceService carServiceService;
    private final ForemanRepository foremanRepository;

    public CarServiceController(CarServiceService carServiceService,
                                ForemanRepository foremanRepository) {
        this.carServiceService = carServiceService;
        this.foremanRepository = foremanRepository;
    }

    @GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public List<CarServiceEntityDto> getCarServices() {
        return carServiceService.getAll().stream()
                .map(CarServiceMapper::toCarServiceEntityDto)
                .collect(toList());
    }

    @PutMapping("update/{carServiceId}")
    public ResponseEntity<CarServiceDto> updateCarService(@PathVariable Long carServiceId, @RequestBody CarServiceDto carServiceDto) {

        var updatedShift = carServiceService.update(carServiceId, toCarService(carServiceDto));
        return ok(toCarServiceDto(updatedShift));
    }

    @GetMapping(value = "/{carServiceId}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<CarService> getCarService(@PathVariable Long carServiceId) {
        var carServiceOptional = carServiceService.getById(carServiceId);

        return carServiceOptional
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<CarServiceDto> createCarService(@RequestBody CarServiceDto carServiceDto) {

        if (carServiceService.blogPostTitleIsUnique(toCarService(carServiceDto))) {
            var createdCarService = carServiceService.create(toCarService(carServiceDto));
            return ok(carServiceDto);
        } else {
            throw new FoodServiceValidationException("CarService already exists", "CarService title", "Already exists", carServiceDto.getTitle());
        }
    }

    @DeleteMapping("/delete/{carServiceId}")
    public ResponseEntity<Void> deleteCarService(@PathVariable Long carServiceId) {
       // logger.info("Attempt to delete Menu by id: {}", menuId);
        carServiceService.getById(carServiceId).get().getForemen().clear();
        boolean deleted = carServiceService.deleteById(carServiceId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
