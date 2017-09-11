package br.com.orlandoburli.seguranca.resources.portaria;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.orlandoburli.seguranca.core.exceptions.BusinessException;
import br.com.orlandoburli.seguranca.core.services.AbstractResource;
import br.com.orlandoburli.seguranca.core.services.filters.annotations.AuthenticationRequired;
import br.com.orlandoburli.seguranca.model.cadastros.unidade.UnidadeService;
import br.com.orlandoburli.seguranca.model.portaria.liberacao.Liberacao;
import br.com.orlandoburli.seguranca.model.tabelasbasicas.areacomum.AreaComumService;
import br.com.orlandoburli.seguranca.model.tabelasbasicas.porta.PortaService;

@Path("/liberacao")
@Stateless
@Transactional
public class LiberacaoResource extends AbstractResource {

	@Inject
	private LiberacaoResource service;

	@Inject
	private UnidadeService unidadeService;

	@Inject
	private AreaComumService areaComumService;

	@Inject
	private PortaService portaService;

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@AuthenticationRequired
	public Response inserir(Liberacao vo) throws BusinessException {
		return this.json().status(Status.OK).entity(this.service.inserir(vo)).build();
	}

	@GET
	@Path("/unidades")
	@Produces(MediaType.APPLICATION_JSON)
	@AuthenticationRequired
	public Response listarUnidades() {
		return this.json().status(Status.OK).entity(this.unidadeService.ativas()).build();
	}

	@GET
	@Path("/areascomuns")
	@Produces(MediaType.APPLICATION_JSON)
	@AuthenticationRequired
	public Response listarAreasComuns() {
		return this.json().status(Status.OK).entity(this.areaComumService.ativas()).build();
	}

	@GET
	@Path("/portasentrada")
	@Produces(MediaType.APPLICATION_JSON)
	@AuthenticationRequired
	public Response listarPortasEntrada() {
		return this.json().status(Status.OK).entity(this.portaService.entradas()).build();
	}
}