package org.example.DTO;

import jakarta.validation.constraints.NotNull;

public class TaskDTO {
    @NotNull(message = "Task ID is required")
    private int idTask;
    private String denumire;
    private String descriere;
    private String status;

    @NotNull(message = "Task must have an assigned user")
    private UtilizatorDTO membru;

    public TaskDTO() {
    }

    // Getters și Setters
    public int getIdTask() {
        return idTask;
    }

    public void setIdTask(int idTask) {
        this.idTask = idTask;
    }

    public String getDenumire() {
        return denumire;
    }

    public void setDenumire(String denumire) {
        this.denumire = denumire;
    }

    public String getDescriere() {
        return descriere;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public UtilizatorDTO getMembru() {
        return membru;
    }

    public void setMembru(UtilizatorDTO membru) {
        this.membru = membru;
    }

    // toString
    @Override
    public String toString() {
        return "TaskDTO{" +
                "idTask=" + idTask +
                ", denumire='" + denumire + '\'' +
                ", descriere='" + descriere + '\'' +
                ", status='" + status + '\'' +
                ", membru=" + membru +
                '}';
    }
}
