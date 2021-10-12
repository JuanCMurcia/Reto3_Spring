
package com.usa.Modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "reservation")
public class Reservation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idReservation;
    private String startDate;
    private String devolutionDate;
    private String status;

    @ManyToOne
    @JoinColumn(name = "clientId")
    @JsonIgnoreProperties({"reservations","messages"})
    private Client client;
    
    @ManyToOne
    @JoinColumn(name = "skateId")
    @JsonIgnoreProperties({"reservations","messages"})
    private Skate skate;

    public Integer getIdReservation() {
        return idReservation;
    }

    public void setIdReservation(Integer idReservation) {
        this.idReservation = idReservation;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getDevolutionDate() {
        return devolutionDate;
    }

    public void setDevolutionDate(String devolutionDate) {
        this.devolutionDate = devolutionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    
    
}
