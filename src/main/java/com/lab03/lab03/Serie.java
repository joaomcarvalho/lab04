package com.lab03.lab03;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TB_SERIE")
public class Serie {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "ID_USER")
	private long idUser;
	
	@Column(name = "ID_IMDB")
	private String imdbID;
	
	@Column(name = "ON_WATCHLIST")
	private boolean onWatchList;
	
	@Column(name = "NOTA_SERIE")
	private Long nota;
	
	@Column(name = "EPISODIO_SERIE")
	private String episodio;

	public Long getNota() {
		return nota;
	}

	public void setNota(Long nota) {
		this.nota = nota;
	}

	public String getEpisodio() {
		return episodio;
	}

	public void setEpisodio(String episodio) {
		this.episodio = episodio;
	}

	public boolean getOnWatchList() {
		return this.onWatchList;
	}
	
	public void setOnWatchList(boolean on) {
		this.onWatchList = on;
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getIdUser() {
		return idUser;
	}

	public void setIdUser(long idUser) {
		this.idUser = idUser;
	}

	public String getImdbID() {
		return imdbID;
	}

	public void setImdbID(String imdbId) {
		this.imdbID = imdbId;
	}

}
