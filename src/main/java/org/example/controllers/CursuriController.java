package org.example.controllers;

import org.example.DTO.CursDTO;
import org.example.Services.CursuriService;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class CursuriController {
    private final CursuriService cursuriService;

    // Constructor cu dependency injection
    public CursuriController(CursuriService cursuriService) {
        this.cursuriService = cursuriService;
    }

    public List<CursDTO> obtineToateCursurile() {
        return cursuriService.getAllCursuri();
    }

    public CursDTO obtineDetaliiCurs(Integer id, Integer utilizatorId) {
        return cursuriService.getCursById(id, utilizatorId);
    }

    public CursDTO adaugaCurs(CursDTO cursDTO) {
        return cursuriService.createCurs(cursDTO);
    }

    public void editeazaCurs(Integer id, CursDTO cursDTO) {
        cursuriService.updateCurs(id, cursDTO);
    }

    public void stergeCurs(Integer id) {
        cursuriService.deleteCurs(id);
    }

    public void saveCurs(CursDTO cursDTO) {
        if (cursDTO.getId() == null || cursDTO.getId() == 0) {
            cursuriService.createCurs(cursDTO);
        } else {
            cursuriService.updateCurs(cursDTO.getId(), cursDTO);
        }
    }
    public void asigneazaUtilizatoriLaCurs(Integer cursId, List<Integer> utilizatorIds) {
        cursuriService.asigneazaUtilizatoriLaCurs(cursId, utilizatorIds);
    }
    public List<Integer> obtineUtilizatoriAsignatiLaCurs(Integer cursId) {
        return cursuriService.getUtilizatoriAsignatiLaCurs(cursId);
    }

}
