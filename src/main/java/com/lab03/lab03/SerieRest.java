package com.lab03.lab03;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SerieRest {
	
	@Autowired
	private SerieDAO dao;
	
	@RequestMapping(value="/addSerie", method=RequestMethod.POST)
	public Serie postSerie(@RequestBody Serie serie){
		return dao.persisteSerie(serie);
	}
	
	@RequestMapping(value="/addSerie/{idUser}", method=RequestMethod.GET)
	public List<Serie> getSeries(@PathVariable Long idUser){
		return dao.getProfileSeries(idUser);
	}
	
	@RequestMapping(value="watchListToPerfil/{idUser}", method = RequestMethod.PUT)
	public void watchListToPerfil(@PathVariable Long idUser, @RequestBody String imdbID) {
		Serie serie = dao.getSerie(imdbID);
		serie.setOnWatchList(false);
		dao.atualizaSerie(serie);
	}
	
	@RequestMapping(value="removerSerie/{idUser}", method = RequestMethod.POST)
	public void removerSerie(@PathVariable Long idUser, @RequestBody String imdbID) {
		Serie serie = dao.getSerie(imdbID);
		dao.removerSerie(serie);
	}
	
	@RequestMapping(value="setNota/{idUser}/{imdbID}", method = RequestMethod.PUT)
	public void setNota(@PathVariable Long idUser, @PathVariable String imdbID, @RequestBody Long nota) {
		Serie serie = dao.getSerie(imdbID);
		serie.setNota(nota);
		dao.atualizaSerie(serie);
	}
	
	@RequestMapping(value="setEpisodio/{idUser}/{imdbID}", method = RequestMethod.PUT)
	public void setEpisodio(@PathVariable Long idUser, @PathVariable String imdbID, @RequestBody String episodio) {
		Serie serie = dao.getSerie(imdbID);
		serie.setEpisodio(episodio);
		dao.atualizaSerie(serie);
	}
}
