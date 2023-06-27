package lt.techin.api.dto.mapper;

import lt.techin.api.dto.ForemanDto;
import lt.techin.api.dto.ForemanEntityDto;

import lt.techin.model.Foreman;

public class ForemanMapper {

    public static ForemanDto toCommentDto(Foreman foreman) {
        var foremanDto = new ForemanDto();

        foremanDto.setName(foreman.getName());
        foremanDto.setSurname(foreman.getSurname());
        foremanDto.setSpecialization(foreman.getSpecialization());
        foremanDto.setCity(foreman.getCity());
        foremanDto.setRating(foreman.getRating());

        return foremanDto;
    }

    public static ForemanEntityDto toCommentEntityDto(Foreman foreman) {
        var foremanDto = new ForemanEntityDto();

        foremanDto.setId(foreman.getId());
        foremanDto.setName(foreman.getName());
        foremanDto.setSurname(foreman.getSurname());
        foremanDto.setSpecialization(foreman.getSpecialization());
        foremanDto.setCity(foreman.getCity());
        foremanDto.setRating(foreman.getRating());

        return foremanDto;
    }

    public static Foreman toForeman(ForemanDto foremanDto) {
        var foreman = new Foreman();

        foreman.setName(foremanDto.getName());
        foreman.setSurname(foremanDto.getSurname());
        foreman.setSpecialization(foremanDto.getSpecialization());
        foreman.setCity(foremanDto.getCity());
        foreman.setRating(foremanDto.getRating());


        return foreman;
    }

    public static Foreman toCommentFromEntityDto(ForemanEntityDto foremanDto) {
        var foreman = new Foreman();

        foreman.setId(foremanDto.getId());
        foreman.setName(foremanDto.getName());
        foreman.setSurname(foremanDto.getSurname());
        foreman.setSpecialization(foremanDto.getSpecialization());
        foreman.setCity(foremanDto.getCity());
        foreman.setRating(foremanDto.getRating());


        return foreman;
    }

}
