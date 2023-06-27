package lt.techin.api.dto;

import lt.techin.model.Foreman;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public class CarServiceDto {

    private String title;

    private String address;

    private String manager;

    private List<Foreman> foremen;

    public CarServiceDto() {
    }

    public CarServiceDto(String title, String address, String manager) {
        this.title = title;
        this.address = address;
        this.manager = manager;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

    public List<Foreman> getForemen() {
        return foremen;
    }

    public void setForemen(List<Foreman> foremen) {
        this.foremen = foremen;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CarServiceDto that = (CarServiceDto) o;
        return Objects.equals(title, that.title) && Objects.equals(address, that.address) && Objects.equals(manager, that.manager) && Objects.equals(foremen, that.foremen);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, address, manager, foremen);
    }

    @Override
    public String toString() {
        return "CarServiceDto{" +
                "title='" + title + '\'' +
                ", address='" + address + '\'' +
                ", manager='" + manager + '\'' +
                ", foremen=" + foremen +
                '}';
    }
}
