package org.example.controllers;

import org.example.DTO.CursDTO;
import org.example.Services.CursuriService;

import java.util.List;

public class CursuriController {
    private final CursuriService cursuriService;

    public CursuriController(String baseUrl) {
        this.cursuriService = new CursuriService(baseUrl);
    }

    public List<CursDTO> obtineToateCursurile() {
        return cursuriService.getAllCursuri();
    }

    public CursDTO obtineDetaliiCurs(Integer id, Integer utilizatorId) {
        return cursuriService.getCursById(id, utilizatorId);
    }

    public void adaugaCurs(CursDTO cursDTO) {
        cursuriService.createCurs(cursDTO);
    }

    public void editeazaCurs(Integer id, CursDTO cursDTO) {
        cursuriService.updateCurs(id, cursDTO);
    }

    public void stergeCurs(Integer id) {
        cursuriService.deleteCurs(id);
    }
}
