package com.lab03.lab03;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

@Transactional
@Repository
public class SerieDAO {
	
	@PersistenceContext
	private EntityManager em;
	
	public Serie persisteSerie(Serie serie) {
		System.out.println("Persistindo: " + serie.getImdbID());
		em.persist(serie);
		return serie;
	}
	
	public List<Serie> getProfileSeries(Long id) {
	    TypedQuery<Serie> query = em.createQuery("select obj from Serie obj where obj.idUser = :id", Serie.class);
	    query.setParameter("id", id);
	    return query.getResultList();
	}
	
	public Serie getSerie(String imdbID){
		 TypedQuery<Serie> query = em.createQuery("select obj from Serie obj where obj.imdbID = :imdbID", Serie.class);
		 query.setParameter("imdbID", imdbID);
		 return query.getSingleResult();
	}
	
	public Serie atualizaSerie(Serie serie) {
		serie = em.merge(serie);
		em.flush();
		em.refresh(serie);
		return serie;
	}
	
	public void removerSerie(Serie serie) {
		em.remove(serie);
	}
}
