package br.com.orlandoburli.seguranca.core.services;

import java.util.ArrayList;
import java.util.List;

import javax.enterprise.inject.Instance;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response.Status;

import br.com.orlandoburli.seguranca.core.be.AbstractService;
import br.com.orlandoburli.seguranca.core.dao.AbstractDao;
import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.core.exceptions.ErrorField;
import br.com.orlandoburli.seguranca.core.services.filters.annotations.AuthenticationRequired;
import br.com.orlandoburli.seguranca.core.vo.IEntity;

public abstract class AbstractCrudResource<K, V extends IEntity<K>, D extends AbstractDao<K, V>, S extends AbstractService<K, V, D>> extends AbstractResource {

	@Inject
	private Instance<S> service;

	protected S getService() {
		return this.service.get();
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@AuthenticationRequired
	public Response inserir(@Context HttpServletRequest request, V vo) throws BusinessException {
		try {
			V inserir = this.getService().inserir(vo);
			CadastroResponse<V> retorno = new CadastroResponse<>(inserir, true, "Registro inserido com sucesso!");

			return this.json().status(Status.OK).entity(retorno).build();
		} catch (Exception e) {

			e.printStackTrace();

			CadastroResponse<V> erro = new CadastroResponse<>(vo, false, e.getMessage());

			erro.setMessage(e.getMessage());

			if (e instanceof BusinessException) {
				erro.setErrors(((BusinessException) e).getErrors());
			} else {
				erro.setErrors(new ArrayList<>());
				erro.getErrors().add(new ErrorField(e.getMessage()));
			}
			return this.json().status(Status.OK).entity(erro).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@AuthenticationRequired
	public Response atualizar(V vo) throws BusinessException {
		try {
			V alterar = this.getService().atualizar(vo);
			CadastroResponse<V> retorno = new CadastroResponse<>(alterar, true, "Registro alterado com sucesso!");

			return this.json().status(Status.OK).entity(retorno).build();
		} catch (Exception e) {
			CadastroResponse<V> erro = new CadastroResponse<>(vo, false, e.getMessage());

			if (e instanceof BusinessException) {
				erro.setErrors(((BusinessException) e).getErrors());
			}
			return this.json().status(Status.OK).entity(erro).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@AuthenticationRequired
	public Response remover(@PathParam("id") K id) throws BusinessException {
		try {
			V excluir = this.getService().remover(id);
			CadastroResponse<V> retorno = new CadastroResponse<>(excluir, true, "Registro excluído com sucesso!");

			return this.json().status(Status.OK).entity(retorno).build();
		} catch (Throwable e) {
			CadastroResponse<V> erro = new CadastroResponse<>(null, false, e.getMessage());

			if (e instanceof BusinessException) {
				erro.setErrors(((BusinessException) e).getErrors());
			}
			return this.json().status(Status.OK).entity(erro).build();
		}
	}

	@POST
	@Path("pesquisar")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@AuthenticationRequired
	public Response pesquisar(ConsultaRequest request) {
		List<V> lista = this.getService().consultar(request.getFiltro(), request.getPageSize(), request.getPageNumber(), request.getOrder());
		Integer total = this.getService().total(request.getFiltro());

		// Devolve a lista desatachada
		if (lista != null) {
			this.detach(lista);
		}

		this.doBeforeWriteListaPesquisar(lista);

		return this.json().status(Status.OK).entity(new ConsultaResponse(lista, total)).build();
	}

	public void detach(List<V> lista) {
		for (V v : lista) {
			this.getService().detach(v);
		}
	}

	public void doBeforeWriteListaPesquisar(List<V> lista) {

	}

	@POST
	@Path("validar")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@AuthenticationRequired
	public Response validar(V vo) {
		try {
			this.getService().validate(vo);
			CadastroResponse<V> retorno = new CadastroResponse<>(vo, true, "Dados validados com sucesso!");

			return this.json().status(Status.OK).entity(retorno).build();
		} catch (Exception e) {
			CadastroResponse<V> erro = new CadastroResponse<>(null, false, e.getMessage());

			if (e instanceof BusinessException) {
				erro.setErrors(((BusinessException) e).getErrors());
			}
			return this.json().status(Status.OK).entity(erro).build();
		}
	}

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@AuthenticationRequired
	public Response buscar(@PathParam("id") K id) {
		return this.json().status(Status.OK).entity(this.getService().buscar(id)).build();
	}

	@OPTIONS
	@Path("pesquisar")
	public Response optionsPesquisar() {
		ResponseBuilder response = Response.noContent();
		response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		response.header("Access-Control-Allow-Origin", "*");
		response.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
		return response.status(Status.OK).build();
	}

	@OPTIONS
	@Path("{id}")
	public Response optionsComId() {
		return this.optionsPesquisar();
	}

	@OPTIONS
	public Response optionsSemId() {
		return this.optionsPesquisar();
	}
}