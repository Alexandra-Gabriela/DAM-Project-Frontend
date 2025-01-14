package org.example.controllers;

import org.example.DTO.UtilizatorDTO;
import org.example.Services.UtilizatorService;

import java.util.List;

public class UtilizatorController {

    private final UtilizatorService utilizatorService = new UtilizatorService();

    public void afiseazaTotiUtilizatorii() {
        List<UtilizatorDTO> utilizatori = utilizatorService.getAllUtilizatori();
        utilizatori.forEach(System.out::println);
    }

    public void afiseazaUtilizatorDupaId(int id) {
        UtilizatorDTO utilizator = utilizatorService.getUtilizatorById(id);
        System.out.println(utilizator);
    }

    public void afiseazaLideri() {
        List<UtilizatorDTO> lideri = utilizatorService.getAllLideri();
        lideri.forEach(System.out::println);
    }

    public void afiseazaMembri() {
        List<UtilizatorDTO> membri = utilizatorService.getAllMembri();
        membri.forEach(System.out::println);
    }

    public void creeazaUtilizator(UtilizatorDTO utilizator) {
        try {
            UtilizatorDTO nouUtilizator = utilizatorService.createUtilizator(utilizator);
            System.out.println("Utilizator creat: " + nouUtilizator);
        } catch (Exception e) {
            System.err.println("Eroare la crearea utilizatorului: " + e.getMessage());
        }
    }

    public void actualizeazaUtilizator(int id, UtilizatorDTO utilizator) {
        try {
            UtilizatorDTO utilizatorActualizat = utilizatorService.updateUtilizator(id, utilizator);
            System.out.println("Utilizator actualizat: " + utilizatorActualizat);
        } catch (Exception e) {
            System.err.println("Eroare la actualizarea utilizatorului: " + e.getMessage());
        }
    }

    public void stergeUtilizator(int id) {
        try {
            utilizatorService.deleteUtilizator(id);
            System.out.println("Utilizator șters cu succes.");
        } catch (Exception e) {
            System.err.println("Eroare la ștergerea utilizatorului: " + e.getMessage());
        }
    }
}
