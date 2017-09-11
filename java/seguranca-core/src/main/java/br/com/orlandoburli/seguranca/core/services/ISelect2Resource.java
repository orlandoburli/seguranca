package br.com.orlandoburli.seguranca.core.services;

import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

public interface ISelect2Resource {

	Response buscarPorNome(@QueryParam("q") String nomeQuery, @QueryParam("id") Integer id, @QueryParam("pageSize") Integer pageSize, @QueryParam("page") Integer pageNumber);

}
