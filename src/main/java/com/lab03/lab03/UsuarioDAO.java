package com.lab03.lab03;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

@Transactional
@Repository
public class UsuarioDAO {
	
	@PersistenceContext
	private EntityManager em;
	
	public Usuario persisteUsuario(Usuario usuario) {
		em.persist(usuario);
		return usuario;
	}
	
	public Usuario consultaObjeto(Long id) {
	    TypedQuery<Usuario> query = em.createQuery("select obj from Usuario obj where obj.id = :id", Usuario.class);
	    query.setParameter("id", id);
	    return query.getSingleResult();
	}
	
	public Usuario consultaLogin(String login) {
	    TypedQuery<Usuario> query = em.createQuery("select obj from Usuario obj where obj.login = :login", Usuario.class);
	    query.setParameter("login", login);
	    return query.getSingleResult();
	}
	
	public boolean usuarioExiste(String login) {
		TypedQuery<Long> query = 
				em.createQuery
				("select count(1) from Usuario obj where obj.login = :login", Long.class);
	    query.setParameter("login", login);
	    return query.getSingleResult() == 1L ? true:false;
	}
}
