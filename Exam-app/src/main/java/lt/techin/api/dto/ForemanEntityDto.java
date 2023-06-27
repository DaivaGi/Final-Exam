package lt.techin.api.dto;

import java.util.Objects;

public class ForemanEntityDto extends ForemanDto {

    private Long id;

    public ForemanEntityDto(Long id, String name, String surname, int rating, String specialization, String city, Long id1) {
        super(id, name, surname, rating, specialization, city);
        this.id = id1;
    }

    public ForemanEntityDto() {

    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        ForemanEntityDto that = (ForemanEntityDto) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id);
    }
}
