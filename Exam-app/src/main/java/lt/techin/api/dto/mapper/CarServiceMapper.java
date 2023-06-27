package lt.techin.api.dto.mapper;

import lt.techin.api.dto.CarServiceDto;
import lt.techin.api.dto.CarServiceEntityDto;
import lt.techin.model.CarService;

public class CarServiceMapper {

    public static CarServiceDto toCarServiceDto(CarService carService) {
        var carServiceDto = new CarServiceDto();

        carServiceDto.setTitle(carService.getTitle());
        carServiceDto.setAddress(carService.getAddress());
        carServiceDto.setManager(carService.getManager());
        carServiceDto.setForemen(carService.getForemen());


        return carServiceDto;
    }

    public static CarServiceEntityDto toCarServiceEntityDto(CarService carService) {
        var carServiceDto = new CarServiceEntityDto();

        carServiceDto.setId(carService.getId());
        carServiceDto.setTitle(carService.getTitle());
        carServiceDto.setAddress(carService.getAddress());
        carServiceDto.setManager(carService.getManager());
        carServiceDto.setForemen(carService.getForemen());


        return carServiceDto;
    }

    public static CarService toCarService(CarServiceDto carServiceDto) {
        var carService = new CarService();

        carService.setTitle(carServiceDto.getTitle());
        carService.setAddress(carServiceDto.getAddress());
        carService.setManager(carServiceDto.getManager());


        return carService;
    }

    public static CarService toCarServiceFromEntityDto(CarServiceEntityDto carServiceDto) {
        var carService = new CarService();

        carService.setId(carServiceDto.getId());
        carService.setTitle(carServiceDto.getTitle());
        carService.setAddress(carServiceDto.getAddress());
        carService.setManager(carServiceDto.getManager());


        return carService;
    }

}
