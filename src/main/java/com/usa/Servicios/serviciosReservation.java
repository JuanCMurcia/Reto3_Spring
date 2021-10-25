package com.usa.Servicios;

import com.usa.Modelo.Reservation;
import com.usa.Repositorio.ReservationRepositorio;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Clase Servicios Reservacion
 *
 * @author starp
 */
@Service
public class serviciosReservation {

    @Autowired
    private ReservationRepositorio metodosCrud;

    /**
     * Metodo Privado Lista Reservation
     *
     * @return
     */
    public List<Reservation> getAll() {
        return metodosCrud.getAll();
    }

    /**
     * Metodo Public Optional
     *
     * @param idReservation
     * @return
     */
    public Optional<Reservation> getReservation(int idReservation) {
        return metodosCrud.getReservation(idReservation);
    }

    /**
     * Metodo Guardar Datos de Reservation
     *
     * @param reservation
     * @return
     */
    public Reservation save(Reservation reservation) {
        if (reservation.getIdReservation() == null) {
            return metodosCrud.save(reservation);
        } else {
            Optional<Reservation> evt = metodosCrud.getReservation(reservation.getIdReservation());
            if (evt.isEmpty()) {
                return metodosCrud.save(reservation);
            } else {
                return reservation;
            }
        }
    }

    /**
     * Metodo Actualizar Datos de Reservation
     *
     * @param reservation
     * @return
     */
    public Reservation update(Reservation reservation) {
        if (reservation.getIdReservation() != null) {
            Optional<Reservation> evt = metodosCrud.getReservation(reservation.getIdReservation());
            if (!evt.isEmpty()) {
                if (reservation.getStartDate() != null) {
                    evt.get().setStartDate(reservation.getStartDate());
                }
                if (reservation.getDevolutionDate() != null) {
                    evt.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if (reservation.getStatus() != null) {
                    evt.get().setStatus(reservation.getStatus());
                }
                metodosCrud.save(evt.get());
                return evt.get();
            } else {
                return reservation;
            }
        } else {
            return reservation;
        }
    }

    /**
     * Metodo Borrar datos de la lista
     *
     * @param id
     * @return
     */
    public boolean deleteReservation(int id) {
        Boolean del = getReservation(id).map(reservation -> {
            metodosCrud.delete(reservation);
            return true;
        }).orElse(false);
        return del;
    }
}
