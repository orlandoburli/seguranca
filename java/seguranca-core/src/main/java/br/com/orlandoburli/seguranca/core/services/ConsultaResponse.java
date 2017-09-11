package br.com.orlandoburli.seguranca.core.services;

import java.util.List;

public class ConsultaResponse {

	private List<?> lista;
	private Integer total;

	public ConsultaResponse() {
	}

	public ConsultaResponse(List<?> lista, Integer total) {
		this.setLista(lista);
		this.setTotal(total);
	}

	public ConsultaResponse(List<?> lista) {
		this.setLista(lista);
	}

	public List<?> getLista() {
		return this.lista;
	}

	public void setLista(List<?> lista) {
		this.lista = lista;
	}

	public Integer getTotal() {
		return this.total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}
}