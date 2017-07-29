package com.lab03.lab03;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioRest {
	
	@Autowired
	private UsuarioDAO dao;
	
	@RequestMapping(value="/usuario", method=RequestMethod.POST)
	public Usuario postUsuario(@RequestBody Usuario usuario){
		if (!dao.usuarioExiste(usuario.getLogin()))
			return dao.persisteUsuario(usuario);
		else
			throw new RuntimeException("Ja existe esse usuario, tu tomou no butao");
	}
	
	@RequestMapping(value="/usuario/{id}", method=RequestMethod.GET)
	public Usuario getUsuario(@PathVariable Long id){
		return dao.consultaObjeto(id);
	}
	
	@RequestMapping(value="/usuarioLogar", method=RequestMethod.POST)
	public Usuario login(@RequestBody Usuario usuario){
		if (dao.usuarioExiste(usuario.getLogin())) {
			Usuario novo = dao.consultaLogin(usuario.getLogin());
			if(novo.getSenha().equals(usuario.getSenha()) && novo.getLogin().equals(usuario.getLogin()))
				return novo;
		}
			throw new RuntimeException("Usuario ou Senha invalidos");
	}
}
