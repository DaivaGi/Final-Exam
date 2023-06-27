package lt.techin.api.dto;

import lt.techin.model.Foreman;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public class CarServiceEntityDto extends CarServiceDto {

    private Long id;

    public CarServiceEntityDto() {
    }

    public CarServiceEntityDto(Long id) {
        this.id = id;
    }

    public CarServiceEntityDto(String title, String address, String manager, Long id) {
        super(title, address, manager);
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        CarServiceEntityDto that = (CarServiceEntityDto) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id);
    }

    @Override
    public String toString() {
        return "MenuEntityDto{" +
                "id=" + id +
                '}';
    }
}
