package lt.techin.api;

import lt.techin.api.dto.ForemanDto;
import lt.techin.api.dto.ForemanEntityDto;
import lt.techin.api.dto.mapper.ForemanMapper;
import lt.techin.model.Foreman;
import lt.techin.service.ForemanService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.stream.Collectors.toList;

import static lt.techin.api.dto.mapper.ForemanMapper.toCommentDto;
import static lt.techin.api.dto.mapper.ForemanMapper.toForeman;
import static org.springframework.http.ResponseEntity.ok;

@Controller
@RequestMapping("/api/v1/foremen")
public class ForemanController {

    public static Logger logger = LoggerFactory.getLogger(ForemanController.class);

    private final ForemanService foremanService;

    public ForemanController(ForemanService foremanService) {
        this.foremanService = foremanService;
    }

    @GetMapping(value = "/all/{carServiceId}", produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public List<ForemanEntityDto> getForemenByService(@PathVariable Long carServiceId) {
        return foremanService.getAll(carServiceId).stream()
                .map(ForemanMapper::toCommentEntityDto)
                .collect(toList());
    }

    @GetMapping
    @ResponseBody
    public List<ForemanEntityDto> getForemen() {
        return foremanService.getForemen().stream()
                .map(ForemanMapper::toCommentEntityDto)
                .collect(toList());
    }

    @GetMapping(value = "/{foremanId}", produces = {MediaType.APPLICATION_JSON_VALUE})

    public ResponseEntity<Foreman> getForemanById(@PathVariable Long foremanId) {
        var foremanOptional = foremanService.getById(foremanId);

        return foremanOptional
                .map(comment -> ok(comment))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(value = "/{carServiceId}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ForemanDto> createForeman(@RequestBody ForemanDto foremanDto, @PathVariable Long carServiceId) {
        var createdForeman = foremanService.create(toForeman(foremanDto), carServiceId);

        return ok(toCommentDto(createdForeman));
    }

    @DeleteMapping("/delete/{foremanId}")
    public ResponseEntity<Void> deleteForeman(@PathVariable Long foremanId) {
        // logger.info("Attempt to delete Menu by id: {}", menuId);

        boolean deleted = foremanService.deleteById(foremanId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("update/{foremanId}")
    public ResponseEntity<ForemanDto> updateForeman(@PathVariable Long foremanId, @RequestBody ForemanDto foremanDto) {

        var updatedMeal = foremanService.update(foremanId, toForeman(foremanDto));
        return ok(toCommentDto(updatedMeal));
    }

}
