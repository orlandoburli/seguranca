package br.com.orlandoburli.seguranca.core.services;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class ConsultaRequest implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer pageSize;
	private Integer pageNumber;
	private HashMap<String, String> filtro;
	private Map<String, String> order;

	public Integer getPageSize() {
		return this.pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getPageNumber() {
		return this.pageNumber;
	}

	public void setPageNumber(Integer pageNumber) {
		this.pageNumber = pageNumber;
	}

	public HashMap<String, String> getFiltro() {
		return this.filtro;
	}

	public void setFiltro(HashMap<String, String> filtro) {
		this.filtro = filtro;
	}

	public Map<String, String> getOrder() {
		return this.order;
	}

	public void setOrder(Map<String, String> order) {
		this.order = order;
	}

}
